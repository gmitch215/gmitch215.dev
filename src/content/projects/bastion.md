---
name: 'bastion'
repo: 'drupflare/bastion'
url: 'https://github.com/drupflare/bastion'
stars: 1
period: '2026-Present'
era: '2026'
languages: ['TypeScript']
category: 'Infrastructure'
categories: ['Infrastructure', 'Tooling']
featured: false
order: 7
---

A hardened environment for self-hosted workerd, as a single binary. workerd on its own is not a multi-tenant sandbox and its own repository says so; Cloudflare Workers is workerd plus an operating environment, and this is that environment. One process per tenant under a cgroup, a TLS front door with SNI and rate limits, real stores behind every binding, encrypted backups with a scheduled restore drill, hash-chained audit and deny-by-default egress. It means the rest of the stack can run off Cloudflare's network entirely.
