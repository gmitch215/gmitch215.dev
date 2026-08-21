---
order: 3
year: '2022'
era: 'Craftsman'
headline: 'The Craftsman Emerges'
tagline: 'Gradle, a 25-version abstraction, and real users'
commits: 1849
scene: 'none'
image: '/pictures/gregory-coding-2022.jpg'
flagship:
  name: 'MobChip'
  url: 'https://github.com/gmitch215/MobChip'
  stars: 88
  description: 'Entity AI Library for SpigotMC'
---

The gap between 2021 me and 2022 me is the largest single-year leap in the record. In one year I went from a kid pasting getters to a developer running open-source projects like an adult, and my commit count went up _fivefold_. Three things happened at once.

I learned real build engineering. My Maven plugins migrated to multi-module **Gradle Kotlin DSL**, and Novaconomy grew a **25-version NMS abstraction layer**: reflection-based adapters for every Minecraft server release from _1.8 to 1.20_. Minecraft's internals are obfuscated and change every version; abstracting across 25 of them is the kind of thing that defeats professional plugin developers.

Then I shipped my best work. **MobChip**, an Entity AI Library for SpigotMC, wraps Minecraft's native mob-AI internals behind a clean, fully documented public API across _17 versioned adapters_. It has **35 test files**, CI, a Discord community, and a real Maven repository other developers depended on. At **88 stars** it is still my most successful project by a wide margin, and after I stopped maintaining it another developer took it over, which is about the highest compliment an open-source library can get.

Then came the **Big 4**: Novaconomy, StarCosmetics, PlasmaEnchants, and BattleCards, alongside MobChip the library. By the end of the year a _fourteen-year-old_ was maintaining multiple published libraries, with tests, CI, and versioned releases, that real strangers used. That is not a normal hobby. It is an apprenticeship completing itself.
