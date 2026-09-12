---
name: 'bytebox'
repo: 'gmitch215/bytebox'
url: 'https://github.com/gmitch215/bytebox'
stars: 2
period: '2026-Present'
era: '2026'
languages: ['Java', 'TypeScript']
category: 'Infrastructure'
categories: ['Infrastructure', 'Tooling']
featured: true
archived: false
order: 3
---

Java on Cloudflare Workers. Apply a Gradle plugin to a Java workspace and it compiles into a Worker through TeaVM. It feeds `cartridge`, the wasm-interpreter host extracted from Drupflare, so the machinery built to run PHP on the edge now runs a second language. Ships a coverage lane that runs Java inside workerd by instrumenting before the compiler and reconstructing a real `jacoco.xml`.
