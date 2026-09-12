---
name: 'CollegeDB'
repo: 'earth-app/CollegeDB'
url: 'https://github.com/earth-app/CollegeDB'
stars: 32
period: '2025-Present'
era: '2025'
languages: ['TypeScript']
category: 'Infrastructure'
categories: ['Library', 'Infrastructure']
featured: true
archived: false
order: 4
---

A database-sharding router with Durable-Object-coordinated sharding across six backends, extracted from The Earth App and published to npm. My second-most-starred project. It was too slow paired with the original TypeScript backend, which is part of why that backend moved to Drupal; I went back and fixed the component that caused it - batch mappings resolve in one round trip, batch groups run in one transaction, and a single-shard fast path skips the collision probe outright.
