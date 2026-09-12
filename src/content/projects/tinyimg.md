---
name: 'tinyimg'
repo: 'gmitch215/tinyimg'
url: 'https://github.com/gmitch215/tinyimg'
stars: 1
period: '2026-Present'
era: '2026'
languages: ['C', 'TypeScript']
category: 'Infrastructure'
categories: ['Infrastructure', 'Library']
featured: true
archived: false
order: 3
---

Image decoding, transformation and re-encoding inside a Cloudflare Worker, with no binding and no subrequest. workerd has no Canvas API at all, so this is freestanding C compiled to a single wasm32 module behind a TypeScript wrapper. The economics are the argument: $0.05 per million transformations against Cloudflare Images' $500 per million.
