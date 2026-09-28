---
order: 10
year: 'Sep 2026'
era: 'Magnum Opus'
headline: 'A Real Linux Kernel, Inside One Worker'
tagline: 'gmux, and the first paper'
commits: 43
scene: 'none'
flagship:
  name: 'gmux'
  url: 'https://github.com/gmitch215/gmux'
  stars: 1
  description: 'Linux on serverless, on the free plan'
---

Drupflare's savings were measured on small, mostly idle sites. The obvious next question is whether they survive on machines that are **busy**, and I put it to myself in those words: _"is this a strong product or a fever dream? and if it is the latter, what prevents it from being the former?"_ Then I bounded it so it could actually be answered. No Containers, no partial serverless; _"the testable primitive is one traditional cloudflare worker."_

**gmux** is a real Linux kernel - not a syscall shim over another kernel - running inside a single Worker deployment, each machine a Durable Object, on the free plan. A day and a half after the first experiment it was public and reproducible: a kernel boots to a BusyBox shell in a **476 ms** median, `fork` works from unmodified C programs, `dlopen` works, a 1 GiB pipeline finishes exactly across five free-plan events, and a whole booted machine checkpoints mid-job, survives a forced eviction, and restores exactly. Unchanged x86-64 binaries - BusyBox, coreutils, bash, sqlite3, curl - match native Linux on 117 of 117 transcript lines through my translator.

The design was decided by a deployment, not a theory. The ceiling on a running machine turned out to be **task count, not CPU**: the kernel fork gives every task its own instance of about 2.7 MiB, boot alone creates 48, and the machine died silently after roughly ten more processes while still reporting the event as `ok`. The kernel has five mutable globals, so now every task runs on one instance and I swap those five words at each context switch.

::insight{icon="i-lucide-scissors" title="The Rule Every Measurement Confirmed"}
_"Preserve the abstraction, remove everything the abstraction does not require."_ Every large win so far deleted work rather than speeding it up: an interrupt in place of polling took idle host wakes from **13,588 a minute to under 300**; exec stubs in place of whole executables in memory made `fork` plus `exec` **3.4x faster**; resumable frames in place of Asyncify took the checkpoint tax from **63% down to nothing measurable**.
::

I keep three claims apart, and I am strict about it, because this is exactly where a demo gets mistaken for a result: _compatibility_ (same observable output), _resource equivalence_ (comparable CPU, memory and energy), and _negative optimization_ (work that no longer happens and nothing notices). A shell prompt is none of the three. Booting is none of the three. Eliminated is also not the same as moved - Linux's TCP stack disappearing because Cloudflare terminated the connection lowers my CPU, but the network processing still happened, so it does not count. My own sensitivity table prints the rows where gmux **loses**: on a host already running at 50% with nothing eliminated, it costs 10% more.

On **September 19** I published my first paper, sole-authored, on the method underneath all of this: _Retargeting Managed Runtimes to Serverless WebAssembly_, on figshare and Zenodo under CC BY 4.0 with the artifact pinned to a specific commit. It is published and citable, not yet refereed; I am seeking an arXiv endorsement, and the Journal of Open Source Software asked for six months of public history first, so that resubmission waits until February 2027. Its least comfortable result is the one I like best: a correctly translated regular expression, semantically identical, cost **14 ms on a real JVM and 11,010 ms on the host engine.** Semantic agreement is not operational equivalence.
