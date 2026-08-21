---
name: 'phasm'
repo: 'drupflare/phasm'
url: 'https://github.com/drupflare/phasm'
stars: 1
period: '2026-Present'
era: '2026'
languages: ['C', 'TypeScript', 'PHP']
category: 'Infrastructure'
categories: ['Runtime', 'Infrastructure']
featured: true
archived: false
order: 3
---

A statically linked PHP 8.5 interpreter compiled to WebAssembly for the workerd runtime. Every published php-wasm build uses dynamic linking, whose linker synthesizes trampolines at request time, which workerd forbids; that makes extensions unloadable and Drupal impossible. A static build was the precondition, so it got built.
