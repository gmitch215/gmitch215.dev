---
name: 'gmux'
repo: 'gmitch215/gmux'
url: 'https://github.com/gmitch215/gmux'
stars: 1
period: '2026-Present'
era: '2026'
languages: ['C', 'TypeScript']
category: 'Infrastructure'
categories: ['Infrastructure', 'Tooling']
featured: true
archived: false
order: 1
---

A real Linux kernel running inside one Cloudflare Worker deployment, each machine a Durable Object, on the free plan. Boots to a BusyBox shell in a 476 ms median; `fork`, `dlopen`, job control, signals, sockets and System V IPC all pass deployed. A 1 GiB pipeline finishes exactly across five free-plan events, and a booted machine checkpoints mid-job, survives eviction and restores exactly. Unchanged x86-64 binaries run through Katybug, matching native Linux on 117 of 117 transcript lines.
