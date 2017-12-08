const fs = require('fs')
const recursive = require("recursive-readdir")
const p = require("path")

const quote = `'`
const split = /\n/

// if (!module.parent) {
//   const filePath = process.argv[2]
//   console.assert(!!filePath, "Are you failing to provide a path?")
//   fixFile(filePath)
// }
if (!module.parent) {
  const dirPath = p.resolve(process.argv[2])
  console.assert(!!dirPath, "Are you failing to provide a path?")

  fixDir(dirPath).then(() => console.log(`Done.`),
      err => console.error(err.toString()))
}

function fixFile (filePath) {
  console.assert(filePath.indexOf('.js') > -1," should be js")
  const str = (fs.readFileSync(filePath)).toString()
  console.assert(!!str,"should have contents")
  const lines = str.split(split)

  const fixed = lines.map(line => {
    if (line.indexOf('import') >= 0 && line.indexOf('.js') === -1) {
      line = line.replace(`${quote};`, `.js${quote};`)
      console.log(`Fixed ${filePath}`)
    }
    return line
  })

  fs.writeFileSync(filePath, fixed.join(`\n`))
  return filePath
}

async function fixDir (path) {
  const files = await recursive(path)
  files
    .filter(file => (file.indexOf('.js') > -1))
    .forEach(file => fixFile(file))
}