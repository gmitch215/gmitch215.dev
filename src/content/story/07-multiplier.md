---
order: 8
year: '2026'
era: 'Impact'
headline: 'It Was the Harness, Not the Model'
tagline: 'What actually moved, measured against my own logs'
commits: 7122
scene: 'curve'
image: '/pictures/gregory-dartmouth.jpg'
flagship:
  name: 'edgeport'
  url: 'https://github.com/gmitch215/edgeport'
  stars: 9
  description: 'A from-scratch TCP library for Cloudflare Workers'
---

For four years my curve sat near **2,000 commits a year**, roughly what a fast human types while also going to school. In 2026 it broke: **7,122 commits in a little over nine months**, more than 2024 and 2025 put together. The interesting part is _when_, because my own stored prompts date it precisely and the obvious answer is wrong.

I had a conversational assistant for thirteen months before anything changed. Across the Copilot Chat era my median month went from **182 commits to 199** - flat. The step came in **May 2026**, the month the first `CLAUDE.md` appeared in one of my repositories: 585 commits that month, then 1,033, then 1,361, then 1,773. It was not a better model, and 92% of my prompts were already going to Anthropic. It was the _harness_: an agent that can run the build, the tests, and the deploy.

::insight{icon="i-lucide-ruler" title="The Objection, and Why It Fails"}
The obvious reading is that agents just split work into smaller commits. My median commit went the other way - from **27 changed lines to 90**. The work per commit got bigger, not smaller.
::

I spent the velocity building the layer underneath. **edgeport** is a from-scratch TCP library for Cloudflare Workers - SSH, SFTP, SMTP, IMAP, POP3, NATS, MQTT, STOMP, FTP, LDAP, Syslog, and since August Redis - tested against real Dockerized servers, because the platform advertised the capability and nothing maintained wrapped it. One burst put up _104 commits in a day_. It is the email library that **smoke**, my self-hostable support desk, imports, and where I fixed an SMTP MIME header injection bug, which is the defect a from-scratch protocol library is most likely to ship.

That is also how I split the work with an agent, in my own words from that project: I wrapped the `connect` function around `cloudflare:sockets` myself, had Claude design the wrappers and protocols, then oriented the tests around real-world recipes. _You can outsource the typing. You cannot outsource the understanding._ This was the year I closed the old chapters too: I graduated in **June**, got into **Dartmouth**, and archived every repository in Calculus Games, Team Inceptus, and LevelZ-File, along with **MobChip** itself.
