---
order: 8
year: '2026'
era: 'Force-Multiplier'
headline: 'The Ceiling Breaks'
tagline: 'Building the layer beneath AI'
commits: 4810
scene: 'curve'
image: '/pictures/gregory-dartmouth.jpg'
flagship:
  name: 'edgeport'
  url: 'https://github.com/gmitch215/edgeport'
  stars: 3
  description: 'A from-scratch TCP library for Cloudflare Workers'
---

For four years my curve sat on a plateau near **2,000 commits a year**, roughly the ceiling of what a fast human can hand-type while also going to school. In 2026 the ceiling broke: **4,810 commits in not quite eight months**, more than 2024 and 2025 put together, because the constraint stopped being my hands. `crust` took 235 commits in a month. `smoke` took **113 in a single day**. That cadence is not typing. It is _directing agents_.

And I spent the velocity building infrastructure for the AI era itself. **edgeport** is a from-scratch TCP library for Cloudflare Workers, with clients for SSH, SFTP, SMTP, IMAP, POP3, NATS, MQTT, STOMP, FTP, LDAP, and Syslog, tested against real Dockerized servers, because the platform advertised the capability and no maintained library wrapped it. It went up in a documented burst of _104 commits in one day_, and it is the actual email library that **smoke**, my self-hostable support desk, imports. **MyLoRA** fine-tunes LoRA adapters on my _own home RTX 4070_ over an SSH tunnel, driven from a Cloudflare Workers UI. **MyMCP** turns any OpenAPI spec into a Model Context Protocol server.

::insight{icon="i-lucide-layers" title="The Single Most Important Pattern"}
I do not consume AI tooling, I build the layer beneath it. Every one of these was born from a wall I hit in a real project, and my reflex was to build and publish the missing primitive.
::

The way I use it is the tell: _you can outsource the typing, but you cannot outsource the understanding._ The architecture stays mine; only the keystrokes are shared. This was also the year I closed the old chapters for real. I graduated in **June**, got into **Dartmouth**, and archived every repository in Calculus Games, Team Inceptus, and LevelZ-File, along with **MobChip** itself, the 88-star library that was my best-known work.
