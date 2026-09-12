---
order: 9
year: 'Aug 2026'
era: 'Runtime'
headline: 'The One Thing I Was Taught, Rebuilt'
tagline: 'Drupal 11 and PHP 8.5, compiled to WebAssembly'
commits: 725
scene: 'none'
flagship:
  name: 'phasm'
  url: 'https://github.com/drupflare/phasm'
  stars: 1
  description: 'A statically linked PHP interpreter compiled to WebAssembly'
---

On **August 9** I started a feasibility spike in a scratch directory to answer one question: can Drupal 11 run on Cloudflare Workers? Eleven days later it is a **nine-repository organization**, and a month later **725 commits**, and a working answer. **Drupal 11, with PHP 8.5 compiled to WebAssembly, executing inside a Durable Object, using that object's own SQLite as the database.** No VPS, no container, no origin server.

What makes it a real result instead of a stunt is the wall I hit on day two. `workerd` forbids WebAssembly codegen at request time but permits it during module evaluation, and _every_ published php-wasm build in existence is a dynamic-linking build whose linker synthesizes trampolines at runtime. So extensions can never load, so Drupal's required `dom`, `xml`, `SimpleXML`, `mbstring` and `gd` are simply unavailable. A statically linked interpreter was not an optimization; it was a precondition. So I built one, and that is **phasm**.

Then I made it fit, and two sessions of compression engineering became history overnight. The free plan allowed a 3,145,728-byte compressed worker, so the interpreter travelled as a zstd frame inflated at module scope and I got the whole thing under the ceiling with no extensions dropped. On **September 4 Cloudflare deleted that limit**, replacing it with 64 MiB uncompressed. The same tree now sits at _20% of the meter_ - a configuration that was impossible three days earlier. The correct response is not to mourn the work: **any refusal whose reason was bundle size needs re-scoring, not re-refusing.** What binds now is the 1,000 ms startup budget and the 128 MB isolate, which is where I had already said the scarce resource was going. A cached page costs **1 ms** of Durable Object CPU, a full uncached render **34 ms** against 9.47 ms for native PHP, and cold boot is 1,398 ms. When it breaks at 3am there is a self-repair ladder, observe through rollback, behind _19 tripwires_.

::insight{icon="i-lucide-gauge" title="The Rule That Came Out of It"}
An absolute CPU figure comes only from `cpuTime` in `wrangler tail` on a deployed worker. In-PHP `microtime()` returns 0 on the edge, and `Date.now()` inside the isolate once reported 114 ms for a 1,374 ms invocation. Zero is obviously broken; 114 survives review. I reversed four free-tier verdicts in eleven days, and three of the four were the instrument being wrong, not the system.
::

Seven of the nine repositories stand on their own, including **durabledb**, which exists only because Durable Object SQLite's real limits are undocumented: **100 bound parameters** where local PDO allows 32,766, a **50-byte** ceiling on a `LIKE` pattern, and lossy integer reads above 2^53. Each broke something real before it got written down.

It turned out not to be a project at all. It was a technique, and within three weeks I had applied it twice more. **bytebox** is _Java_ on Cloudflare Workers: apply a Gradle plugin to a Java workspace and it compiles into a Worker through TeaVM. It did not start from scratch either - it feeds `cartridge`, the wasm-interpreter host I had already extracted from Drupflare, which is what an extracted abstraction is supposed to do and usually does not. **tinyimg** is the same instinct pointed at images: workerd has no Canvas API at all, so I wrote freestanding **C compiled to a single wasm32 module** that decodes, transforms and re-encodes inside the Worker's own CPU budget, with no binding and no subrequest. The economics are the argument: **$0.05 per million transformations against Cloudflare Images' $500 per million.** Hand-writing image codecs leaves scars, and mine are all instruments lying again - a broken hash in the LZ77 matcher made "chains do not help" look like a measurement, and benchmarking the no-LTO build overstated every timing threefold. What I think all three prove is one claim tested three times: _a serverless platform is a general-purpose computer that nobody has finished writing the runtimes for._

Drupal is the one thing I was actually taught: late 2018, in my father's shop, and nothing else directly after it. It came back at seventeen as his single recommendation, when my TypeScript backend proved too slow. Then at eighteen I took that one tool and did something with it that nobody in that shop asked for or advised on. **Every architectural decision here is mine** - my father has no commit in any of the nine repositories, and none anywhere in The Earth App. What I was given was one framework and one suggestion.
