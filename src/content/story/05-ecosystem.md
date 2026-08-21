---
order: 6
year: '2021-2024'
era: 'Ecosystem'
headline: "Other People's Repositories"
tagline: 'Patches upstream, and a support desk I never signed up for'
commits: 4345
scene: 'none'
flagship:
  name: 'CodeMC/API'
  url: 'https://github.com/CodeMC/API'
  stars: 1
  description: 'The backend API I wrote for a community that almost did not let me in'
---

The easy story about a teenager with a lot of commits is that he worked alone. Mine does not hold up to the record. Across four Minecraft years I shipped **29 pull requests into 19 organizations I do not own** and filed **91 issues into roughly 45 upstream projects**, the first one merged when I was _twelve_. Some of it is real infrastructure: a **SHA-1 bug in raylib** that broke on messages longer than 31 bytes, **JetBrains Runtime support in GitHub's own `setup-java` action**, Linux ARM added to Doxygen's CI.

It ran the other direction too, and that part is less glamorous and more convincing. Strangers filed **69 issues** on my projects and I answered them; **19 of 22 outside pull requests** got reviewed and merged. MobChip alone took 13 patches from other people at a **100% merge rate**, and I credited every contributor by name in the release notes, every time. One of them, `datatags`, spent two years pushing code into it. When I stopped maintaining it he forked it as **MobChipLite** and is _still shipping it in 2026_, two years after my last commit. Code I wrote at fourteen outlived my interest in it because somebody else had been made an owner of it.

I also lost, in public, repeatedly. Five Paper maintainers overruled me at once when I asked them to restore a method MobChip depended on; I conceded the technical point, wrote the reflection workaround, and shipped. The longer one is the one I would put on a resume if resumes had room. Over nine months in 2023, at _fifteen_, I took an idea my peers had already rejected, refined it anyway, submitted it as an API change to **Bukkit itself**, took review from three maintainers including the project lead, threw out my own design and rebuilt it on the API he pointed at, and then found out the objection was architectural rather than cosmetic.

::insight{icon="i-lucide-git-pull-request" title="How It Ended, in My Own Words"}
"It seems this approach is unpopular. I've decided to decline this PR and maybe make a new one overall in the future, perhaps with better implementation."
::

I withdrew my own patch rather than push something the maintainers did not want. That is the whole open-source loop, and I ran every stage of it before I could drive. One thing governs how all of this should be read: **every line of it is pre-AI.** I joined SpigotMC in _March 2021_ and wrote my last Minecraft code in _June 2024_, so the libraries, the version abstraction, the packet work, the upstream patches, and the arguments all predate the agentic tooling I picked up in 2026. It is the cleanest sample of what I produce unassisted, and it is **4,345 commits** across eighteen repositories. The platform got the last word, and I mean it: without SpigotMC I would not be the programmer I am, and it got me into Dartmouth.
