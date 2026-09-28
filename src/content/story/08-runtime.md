---
order: 9
year: 'Aug-Sep 2026'
era: 'Runtime'
headline: 'The One Thing I Was Taught, Rebuilt'
tagline: 'Drupal 11 and PHP 8.5, compiled to WebAssembly'
commits: 1834
scene: 'none'
flagship:
  name: 'phasm'
  url: 'https://github.com/drupflare/phasm'
  stars: 1
  description: 'A statically linked PHP interpreter compiled to WebAssembly'
---

On **August 9** I started a feasibility spike in a scratch directory to answer one question: can Drupal 11 run on Cloudflare Workers? It shipped as **v1.0.0 on September 13**, and the organization now holds twelve repositories and **1,834 of my commits**. **Drupal 11, with PHP 8.5 compiled to WebAssembly, executing inside a Durable Object, using that object's own SQLite as the database.** No VPS, no container, no origin server.

What makes it a real result instead of a stunt is the wall I hit on day two. `workerd` forbids WebAssembly codegen at request time but permits it during module evaluation, and _every_ published php-wasm build in existence is a dynamic-linking build whose linker synthesizes trampolines at runtime. So extensions can never load, so Drupal's required `dom`, `xml`, `SimpleXML`, `mbstring` and `gd` are simply unavailable. A statically linked interpreter was not an optimization; it was a precondition. So I built one, and that is **phasm**.

Then I made it fit, and two sessions of compression engineering became history overnight. The free plan allowed a 3,145,728-byte compressed worker, so the interpreter travelled as a zstd frame inflated at module scope and I got the whole thing under the ceiling with no extensions dropped. On **September 4 Cloudflare deleted that limit**, replacing it with 64 MiB uncompressed. The same tree now sits at _20% of the meter_ - a configuration that was impossible three days earlier. The correct response is not to mourn the work: **any refusal whose reason was bundle size needs re-scoring, not re-refusing.** What binds now is the 1,000 ms startup budget and the 128 MB isolate, which is where I had already said the scarce resource was going. A cached page costs **1 ms** of Durable Object CPU, a full uncached render **34 ms** against 9.47 ms for native PHP, and cold boot is 1,398 ms. When it breaks at 3am there is a self-repair ladder, observe through rollback, behind _19 tripwires_.

::insight{icon="i-lucide-gauge" title="The Rule That Came Out of It"}
An absolute CPU figure comes only from `cpuTime` in `wrangler tail` on a deployed worker. In-PHP `microtime()` returns 0 on the edge, and `Date.now()` inside the isolate once reported 114 ms for a 1,374 ms invocation. Zero is obviously broken; 114 survives review. I reversed four free-tier verdicts in eleven days, and three of the four were the instrument being wrong, not the system.
::

Seven of the nine repositories stand on their own, including **durabledb**, which exists only because Durable Object SQLite's real limits are undocumented: **100 bound parameters** where local PDO allows 32,766, a **50-byte** ceiling on a `LIKE` pattern, and lossy integer reads above 2^53. Each broke something real before it got written down.

The roadmap argues against its own speed table, and that is the part I care about most: _"drupflare has to become more than a faster host, because as a faster host it is not worth building. A 1.21x re-render does not justify a runtime."_ What justifies it is one question - how much continuously provisioned hardware this makes unnecessary. I measured it on my own bare-metal machine through the processor's energy counter, and the first result cuts against the obvious pitch: **PHP in wasm costs the same energy per request as native PHP-FPM, to within 13%.** The saving is not in the interpreter. It is that small-site hosting is bound by memory rather than CPU, so a box packing a thousand sites spends its whole year idle while a Worker draws power only while a request runs, and that my page store expires on an _edit_ where a CDN expires on a _clock_. At twenty million views a month that is 186,371 renders a day against about 25.

::insight{icon="i-lucide-scale" title="The Accounting I Did Not Have To Publish"}
Every figure is labelled `measured`, `derived` or `derived (modelled)`, and _"a figure never moves up a tier by being repeated."_ I will not claim a per-tenant Cloudflare wattage, because I probed a deployed Container by all six routes a Linux process has and found nothing: _"there is no counter being withheld; there is no counter."_ I will not claim a thousand sites retire a thousand servers, because real hosts already consolidate. Water I report as local rather than fungible - aggregate litres are not equivalent ecological value across watersheds. And the cost table prints the case I lose: one busy site costs $5.15 on Workers against a $5.00 VPS.
::

It turned out not to be a project at all. It was a technique, and within three weeks I had applied it twice more. **bytebox** is _Java_ on Cloudflare Workers: apply a Gradle plugin to a Java workspace and it compiles into a Worker through TeaVM. It did not start from scratch either - it feeds `cartridge`, the wasm-interpreter host I had already extracted from Drupflare, which is what an extracted abstraction is supposed to do and usually does not. **tinyimg** is the same instinct pointed at images: workerd has no Canvas API at all, so I wrote freestanding **C compiled to a single wasm32 module** that decodes, transforms and re-encodes inside the Worker's own CPU budget, with no binding and no subrequest. The economics are the argument: **$0.05 per million transformations against Cloudflare Images' $500 per million.** Hand-writing image codecs leaves scars, and mine are all instruments lying again - a broken hash in the LZ77 matcher made "chains do not help" look like a measurement, and benchmarking the no-LTO build overstated every timing threefold. Then **burrow** removed the last requirement. Everything up to it got past the codegen wall by knowing its code at deploy time; burrow runs a guest module that arrives _with the request_, by not compiling it - an interpreter ships in the bundle and the program becomes data. The constraint that started all of this five weeks earlier turned into a product. **workforce** and **bastion** made it operable: a fleet library for deployed Workers, and a hardened single-binary environment that runs the whole stack on your own hardware, because workerd by itself _"is not a hardened multi-tenant sandbox, and its own repository says so."_

What all of it proves is one claim tested repeatedly: _a serverless platform is a general-purpose computer that nobody has finished writing the runtimes for._

Drupal is the one thing I was actually taught: late 2018, in my father's shop, and nothing else directly after it. It came back at seventeen as his single recommendation, when my TypeScript backend proved too slow. Then at eighteen I took that one tool and did something with it that nobody in that shop asked for or advised on. **Every architectural decision here is mine** - my father has no commit in any of the nine repositories, and none anywhere in The Earth App. What I was given was one framework and one suggestion.
