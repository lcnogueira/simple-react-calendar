/* eslint-disable no-console */

const chalk = require('chalk')
const fs = require('fs-extra')
const path = require('path')

// General logging
const log = function (text, color) {
  if (!color) color = 'blue'
  console.log(chalk[color](text))
}

const generatePackageJson = (sourceData, outDir, version = false) => {
  log(`Creating package.json in: ${outDir}/package.json`)
  fs.ensureDirSync(outDir)
  const out = path.resolve(outDir, './package.json')

  const data = {
    ...sourceData,
  }

  if (version) {
    data.version = version
  }

  fs.writeFileSync(out, JSON.stringify(data, null, 2))
}

module.exports = {
  log,
  generatePackageJson,
}
