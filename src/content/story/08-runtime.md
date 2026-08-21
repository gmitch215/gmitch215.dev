---
order: 9
year: 'Aug 2026'
era: 'Runtime'
headline: 'The One Thing I Was Taught, Rebuilt'
tagline: 'Drupal 11 and PHP 8.5, compiled to WebAssembly'
commits: 694
scene: 'none'
flagship:
  name: 'phasm'
  url: 'https://github.com/drupflare/phasm'
  stars: 1
  description: 'A statically linked PHP interpreter compiled to WebAssembly'
---

On **August 9** I started a feasibility spike in a scratch directory to answer one question: can Drupal 11 run on Cloudflare Workers? Eleven days later it is a **nine-repository organization**, **694 commits**, and a working answer. **Drupal 11, with PHP 8.5 compiled to WebAssembly, executing inside a Durable Object, using that object's own SQLite as the database.** No VPS, no container, no origin server.

What makes it a real result instead of a stunt is the wall I hit on day two. `workerd` forbids WebAssembly codegen at request time but permits it during module evaluation, and _every_ published php-wasm build in existence is a dynamic-linking build whose linker synthesizes trampolines at runtime. So extensions can never load, so Drupal's required `dom`, `xml`, `SimpleXML`, `mbstring` and `gd` are simply unavailable. A statically linked interpreter was not an optimization; it was a precondition. So I built one, and that is **phasm**.

Then I made it fit. The free plan allows a 3,145,728-byte compressed worker; the interpreter travels as a zstd frame inflated at module scope, and the shipping bundle measures **2,904,125 bytes, 241,603 under the ceiling, with no extensions dropped to get there.** A cached page costs **1 ms** of Durable Object CPU, a full uncached render **34 ms** against 9.47 ms for native PHP, and cold boot is 1,398 ms. When it breaks at 3am there is a self-repair ladder, observe through rollback, behind _19 tripwires_.

::callout{icon="i-lucide-gauge"}
**The Rule That Came Out of It**

An absolute CPU figure comes only from `cpuTime` in `wrangler tail` on a deployed worker. In-PHP `microtime()` returns 0 on the edge, and `Date.now()` inside the isolate once reported 114 ms for a 1,374 ms invocation. Zero is obviously broken; 114 survives review. I reversed four free-tier verdicts in eleven days, and three of the four were the instrument being wrong, not the system.
::

Seven of the nine repositories stand on their own, including **durabledb**, which exists only because Durable Object SQLite's real limits are undocumented: **100 bound parameters** where local PDO allows 32,766, a **50-byte** ceiling on a `LIKE` pattern, and lossy integer reads above 2^53. Each broke something real before it got written down.

Drupal is the one thing I was actually taught: late 2018, in my father's shop, and nothing else directly after it. It came back at seventeen as his single recommendation, when my TypeScript backend proved too slow. Then at eighteen I took that one tool and did something with it that nobody in that shop asked for or advised on. **Every architectural decision here is mine** - my father has no commit in any of the nine repositories, and none anywhere in The Earth App. What I was given was one framework and one suggestion.
