---
order: 7
year: '2026'
era: 'Force-Multiplier'
headline: 'The Ceiling Breaks'
tagline: 'Building the layer beneath AI'
commits: 3336
scene: 'curve'
image: '/pictures/gregory-dartmouth.jpg'
flagship:
  name: 'edgeport'
  url: 'https://github.com/gmitch215/edgeport'
  stars: 2
  description: 'A from-scratch TCP library for Cloudflare Workers'
---

For three years my curve sat near a plateau of about **1,800 commits a year**, roughly the ceiling of what a fast human can hand-type while also going to school. In 2026 the ceiling broke: **3,336 commits in seven months**, more than any prior full year, because the constraint stopped being my hands. I was _directing agents_, not typing.

And I spent that velocity building infrastructure for the AI era itself. **edgeport** is a from-scratch TCP library for Cloudflare Workers, with clients for SSH, SFTP, SMTP, IMAP, NATS, MQTT, and more, tested against real Dockerized servers, because the platform advertised the capability and no maintained library wrapped it. **MyLoRA** is a full MLOps control plane that fine-tunes LoRA adapters on my _own home RTX 4070_, driven from a Cloudflare Workers UI. **MyMCP** turns any OpenAPI spec into a Model Context Protocol server.

::callout{icon="i-lucide-layers" title="The Single Most Important Pattern"}
I do not consume AI tooling, I build the layer beneath it. Every one of these was born from a wall I hit in a real project, and my reflex was to build and publish the missing primitive.
::

I also got into **Dartmouth**, Class of 2030, my number-one school, and graduated high school. The way I describe my own use of AI is the tell: _you can outsource the typing, but you cannot outsource the understanding._ The architecture stays mine. Only the keystrokes are shared.
