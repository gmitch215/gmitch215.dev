---
name: 'burrow'
repo: 'drupflare/burrow'
url: 'https://github.com/drupflare/burrow'
stars: 1
period: '2026-Present'
era: '2026'
languages: ['TypeScript']
category: 'Infrastructure'
categories: ['Infrastructure', 'Library']
featured: false
order: 6
---

Arbitrary WebAssembly supplied at request time, on a platform that forbids exactly that. workerd blocks WebAssembly code generation during a request, so burrow does not compile: an interpreter compiled to wasm ships in the bundle, and a guest module arriving with a request is data to that interpreter. The constraint that started Drupflare five weeks earlier, turned into a product.
