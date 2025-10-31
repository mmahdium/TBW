import fs from 'fs'
import path from 'path'

const distDir = path.resolve('dist')
const manifestPath = path.join(distDir, '.vite/manifest.json')
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))

const indexPath = path.join(distDir, 'index.html')
let html = fs.readFileSync(indexPath, 'utf-8')

const filesToPreload = new Set()

function collectFiles(entryKey) {
  const chunk = manifest[entryKey]
  if (!chunk) return
  filesToPreload.add(chunk.file)
  for (const imp of chunk.imports || []) {
    if (imp === 'index.html') continue // skip entrypoint
    const dep = manifest[imp]
    if (dep) {
      filesToPreload.add(dep.file)
      collectFiles(imp) // recurse for transitive deps
    }
  }
}

// automatically find all .vue entries that are dynamic (lazy‑loaded)
for (const key of Object.keys(manifest)) {
  if (key.endsWith('.vue') && manifest[key].isDynamicEntry) {
    collectFiles(key)
  }
}

for (const f of filesToPreload) {
  const tag = `<link rel="modulepreload" href="/${f}">`
  if (!html.includes(tag)) {
    html = html.replace('</head>', `  ${tag}\n</head>`)
  }
}

fs.writeFileSync(indexPath, html)
console.log('Preload tags injected')
