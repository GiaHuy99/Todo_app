import { readFileSync, readdirSync, existsSync } from 'node:fs'

if (!existsSync('dist/index.html')) {
  console.error('ERROR: dist/index.html not found. Run npm run build first.')
  process.exit(1)
}

const indexHtml = readFileSync('dist/index.html', 'utf8')

if (indexHtml.includes('/src/')) {
  console.error(
    'ERROR: dist/index.html references /src/ — this is a dev build. Run npm run build.',
  )
  process.exit(1)
}

if (!indexHtml.includes('/assets/') || !indexHtml.includes('.js')) {
  console.error('ERROR: dist/index.html is missing bundled /assets/*.js references.')
  process.exit(1)
}

const assets = readdirSync('dist/assets')
const jsBundle = assets.find((file) => file.endsWith('.js'))
const cssBundle = assets.find((file) => file.endsWith('.css'))

if (!jsBundle || !cssBundle) {
  console.error('ERROR: dist/assets is missing JS or CSS bundles.')
  process.exit(1)
}

console.log(`dist/ OK — ${jsBundle}, ${cssBundle}`)
