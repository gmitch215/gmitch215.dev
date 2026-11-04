---
order: 9
year: 'Aug-Oct 2026'
era: 'Runtime'
headline: 'A Computer Nobody Has Finished Writing'
tagline: 'Drupflare, gmux, and a tool for why things pass here and fail there'
scene: 'none'
flagship:
  name: 'drupflare'
  url: 'https://github.com/drupflare/worker'
  stars: 1
  description: 'Drupal 11 on Cloudflare Workers, with PHP compiled to WebAssembly'
---

On **August 9** I started a spike to answer one question: can Drupal 11 run on Cloudflare Workers? **v1.0.0 shipped on September 13**: PHP 8.5 compiled to WebAssembly, running inside a Durable Object that uses its own SQLite as the database. No VPS, no container, no origin server. The same trick then ran Java (**bytebox**), images (**tinyimg**), arbitrary WebAssembly (**burrow**) and finally Linux itself (**gmux**). The claim underneath all of it: _a serverless platform is a general-purpose computer that nobody has finished writing the runtimes for._

::insight{icon="i-lucide-gauge" title="The Rule That Came Out of It"}
An absolute CPU figure comes only from `cpuTime` in `wrangler tail` on a deployed worker. In-PHP `microtime()` returns 0 on the edge, and `Date.now()` once reported 114 ms for a 1,374 ms invocation. Zero is obviously broken; 114 survives review.
::

::insight{icon="i-lucide-scale" title="The Accounting I Did Not Have To Publish"}
PHP in wasm costs the same energy per request as native PHP-FPM, to within 13%. My cost table prints the case I lose: one busy site is $5.15 on Workers against a $5.00 VPS. And on a per-tenant Cloudflare wattage: _"there is no counter being withheld; there is no counter."_
::

::insight{icon="i-lucide-scissors" title="The Rule Every Measurement Confirmed"}
_"Preserve the abstraction, remove everything the abstraction does not require."_ An interrupt in place of polling took idle host wakes from **13,588 a minute to under 300**.
::

:::more{title="Four Months, Three Fronts"}
**Drupflare.** The wall came on day two: every published php-wasm build links dynamically, and `workerd` forbids the runtime code generation that needs, so Drupal's required extensions could never load. I built a statically linked interpreter, **phasm**. v1.0.3 ran **27 pinned production Drupal codebases** through a 13-row capability lane and found 104 defects. v1.0.4 shipped on **November 2** with 94 of 95 compatibility rows verified and a state audit that found three PHP statics leaking one visitor into the next, one of them logging an anonymous request in as the previous user. Each is now cleared on every request. The organization holds fourteen repositories and **2,340 of my commits**.

**The technique.** bytebox is Java on Workers through TeaVM, and its paper (published September 19, citable, not yet refereed) found a regular expression that costs **14 ms on a real JVM and 11,010 ms on the host engine** for identical output. tinyimg does image transforms at **$0.05 per million against Cloudflare Images' $500**. burrow runs a guest module that arrives with the request, by treating the program as data. **spool** and **folio** followed in October, and folio's report publishes a flat negative: no PHP speedup on any backend, with the Drupal render dispatching zero workers.

**gmux** is a real Linux kernel in a single Worker, each machine a Durable Object. It boots to a BusyBox shell in a **476 ms** median, runs `fork` from unmodified C programs, and matches native Linux on 117 of 117 transcript lines for unchanged x86-64 binaries. It has 240 commits and no tag yet, and its v1 bar is twenty-eight named workloads at a speed ratio of at most 1.0 against native. **Drift**, released as v1.0.0 on November 1, asks why a build passes here and fails there. Its portability atlas found 32 of 38 small programs print different output on at least one Kotlin target. Its benchmark ranks the right cause first in 46 of 105 scenarios where random order expects 36.2, a modest result I published beside the strong ones.

Drupal is the one thing I was taught: late 2018, in my father's shop. **Every architectural decision here is mine.** What I was given was one framework and one suggestion.
:::
