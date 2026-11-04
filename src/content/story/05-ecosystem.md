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

The easy story about a teenager with a lot of commits is that he worked alone. The record disagrees. Across four Minecraft years I sent **29 pull requests into 19 organizations I do not own** and filed **91 issues into roughly 45 upstream projects**, the first merged when I was _twelve_. Strangers filed **69 issues** on my projects and I answered them, and **19 of 22 outside pull requests** got reviewed and merged.

::insight{icon="i-lucide-git-pull-request" title="How the Bukkit Patch Ended, in My Own Words"}
"It seems this approach is unpopular. I've decided to decline this PR and maybe make a new one overall in the future, perhaps with better implementation."
::

:::more{title="The Long Version"}
Some of the patches are real infrastructure: a **SHA-1 bug in raylib** that broke on messages longer than 31 bytes, **JetBrains Runtime support in GitHub's own `setup-java` action**, and Linux ARM in Doxygen's CI. MobChip took 13 outside patches at a **100% merge rate**, and I credited every contributor by name. When I stopped maintaining it, `datatags`, who had pushed code into it for two years, forked it as **MobChipLite** and is still shipping it.

I lost in public too. Over nine months in 2023, at _fifteen_, I submitted an API change to **Bukkit itself**, took review from three maintainers including the project lead, threw out my design and rebuilt it on the API he pointed at, then learned the objection was architectural. I withdrew my own patch rather than push something the maintainers did not want.

Every line of this is pre-AI. I joined SpigotMC in _March 2021_ and wrote my last Minecraft code in _August 2024_, so it is the cleanest sample of what I produce unassisted: **4,345 commits** across eighteen repositories. Without SpigotMC I would not be the programmer I am, and it got me into Dartmouth.
:::
