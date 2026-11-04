---
order: 8
year: '2026'
era: 'Impact'
headline: 'It Was the Harness, Not the Model'
tagline: 'What actually moved, measured against my own logs'
commits: 8045
scene: 'curve'
image: '/pictures/gregory-dartmouth.jpg'
flagship:
  name: 'edgeport'
  url: 'https://github.com/gmitch215/edgeport'
  stars: 10
  description: 'A from-scratch TCP library for Cloudflare Workers'
---

For four years my curve sat near **2,000 commits a year**. In 2026 it broke: **8,045 commits in ten months**, more than 2024 and 2025 put together. My own stored prompts date the break, and the obvious answer is wrong. A year of Copilot Chat left my median month flat, **182 commits to 199**. The step came in **May 2026**, the month the first `CLAUDE.md` appeared in one of my repositories. It was the _harness_, an agent that can run the build, the tests and the deploy. It was not a better model.

::insight{icon="i-lucide-ruler" title="The Objection, and Why It Fails"}
Agents might just split work into smaller commits. My median commit went the other way, from **27 changed lines to 90**.
::

:::more{title="What I Spent the Velocity On"}
**edgeport** is a from-scratch TCP library for Cloudflare Workers: SSH, SFTP, SMTP, IMAP, POP3, NATS, MQTT, STOMP, FTP, LDAP, Syslog and Redis, tested against real Dockerized servers because the platform advertised the capability and nothing maintained wrapped it. It is the email library my support desk **smoke** imports, and where I fixed an SMTP header injection bug, the defect a from-scratch protocol library is most likely to ship.

That is also how I split work with an agent. I wrapped `connect` around `cloudflare:sockets` myself, had Claude design the protocols, then built the tests around real-world recipes. _You can outsource the typing. You cannot outsource the understanding._

I closed the old chapters this year as well: I graduated in **June**, got into **Dartmouth**, and archived every repository in Calculus Games, Team Inceptus and LevelZ-File, along with **MobChip**.
:::
