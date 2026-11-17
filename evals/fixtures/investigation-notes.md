# Working notes: checkout latency after release 4.2

Raw notes from the investigation, in the order things happened. Not a report.

## Timeline

- Mon 09:12. Release 4.2 deployed to production. No alerts.
- Mon 14:40. Support forwards three tickets: "checkout spins for a long time". All three accounts have more than 200 saved items.
- Mon 15:05. Dashboard check. p50 checkout latency is flat at 310 ms. p99 went from 1.4 s before the release to 6.8 s after. Error rate unchanged at 0.2%.
- Mon 15:30. First guess: the payment provider. Their status page is green. Their own latency graph for our account is flat at 180 ms. Ruled out.
- Mon 16:10. Second guess: the new address validator added in 4.2. Turned it off in staging with the flag `address_check_v2`. p99 in staging did not move. Ruled out.
- Mon 17:00. Stopped for the day. Left a note in the channel.
- Tue 09:20. Pulled 500 slow requests from the trace store. 487 of them spend most of their time in `session-cache`, in a call named `loadCart`.
- Tue 10:05. Read the 4.2 diff for `session-cache`. The release changed the cache key from the account id to the account id plus the cart version. A cart version bumps on every item edit.
- Tue 10:40. So every item edit makes the next `loadCart` miss the cache and rebuild the cart from the database. For a big cart the rebuild is slow. I started calling this "the rekey miss".
- Tue 11:15. Confirmed in staging with a 250-item cart: edit one item, then load the cart. 5.9 s. With the 4.1 build the same steps take 0.4 s.
- Tue 13:00. Wrote a fix on a branch: keep the old key and store the cart version inside the cached value. A stale version triggers a partial refresh of the edited item only. Calling this "the partial refresh fix".
- Tue 15:30. Fix deployed to staging. Same 250-item test: 0.5 s.
- Tue 16:00. Replayed Monday's traffic against staging at 40% of production peak, which is as much as staging can take. p99 was 1.5 s over 30 minutes. No errors.
- Tue 16:45. Wrote these notes.

## Numbers

| Measure | Before 4.2 | After 4.2 | Staging with fix |
|---|---|---|---|
| p50 checkout latency | 300 ms | 310 ms | 305 ms |
| p99 checkout latency | 1.4 s | 6.8 s | 1.5 s |
| Error rate | 0.2% | 0.2% | 0.0% |
| Share of slow requests in `loadCart` | not measured | 487 of 500 | 3 of 500 |

Accounts with more than 200 saved items are 1.8% of accounts and 11% of revenue over the last 30 days.

## Trace excerpt

```
trace 7f3a91  POST /checkout            total 6412 ms
  auth.verify                              18 ms
  session-cache.loadCart                 5980 ms   cache=MISS key=acct:88213:v417
    db.query carts                        212 ms
    db.query cart_items (x254)           5604 ms
  pricing.total                           201 ms
  payment.authorize                       179 ms
```

```
trace 2c84d0  POST /checkout            total 402 ms
  auth.verify                              17 ms
  session-cache.loadCart                   41 ms   cache=HIT key=acct:51907:v3
  pricing.total                           160 ms
  payment.authorize                       181 ms
```

## Things I looked at that turned out not to matter

- Payment provider latency. Flat.
- The address validator. No effect when off.
- Database CPU. It went from 35% to 41% on Monday afternoon, which fits the extra cart rebuilds and is not a cause.
- A deploy of the search service on Monday at 13:50. It does not sit on the checkout path.
- Memory on the cache nodes. Flat at 62%.

## What a rollback would do

Rolling back to 4.1 restores the old cache key, so the slow rebuilds stop. It also removes the two other changes in 4.2: the address validator and the new tax table for Quebec, which finance asked for by Friday. The rollback itself takes about 20 minutes and has been done twice this year without trouble.

## What shipping the fix would do

The partial refresh fix keeps everything in 4.2 and stops the slow rebuilds in staging. It is 84 changed lines in `session-cache` plus one migration-free config change. Two people have read it. It has unit tests for the stale-version path.

## What I have not checked

- The fix has only run in staging, at 40% of production peak. Staging cannot go higher. I do not know how the partial refresh behaves at full load.
- I did not test carts above 250 items. The largest production cart has 1,912 items.
- I did not test two edits to the same cart at the same moment. The partial refresh reads the version, then writes; two writers could in principle leave one edit out of the cache until the next refresh. I have not seen it happen and have not tried to make it happen.
- Mobile clients retry checkout after 8 s. I did not check whether Monday's slow requests caused double submissions. The error rate says probably not, but the order table would say for sure.

## Loose ends

- The dashboard has no panel for cache hit rate by cart size. Would have found this in ten minutes.
- The 4.2 change to the cache key was made to fix a stale-cart bug, ticket CART-2291, where a removed item could still show at checkout for up to 60 s. Rolling back brings that bug back. The fix branch keeps it fixed.
- Support wants a line they can send to the three customers.
