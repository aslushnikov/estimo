const chalk = require('chalk')
const { spawn } = require('child_process')
const { getTimelinesFilePath } = require('./utils')

const PATH_TO_PERF_TOOL = './node_modules/.bin/perf-timeline'

const spawnTool = (args = []) => new Promise((resolve, reject) => {
  const proc = spawn(PATH_TO_PERF_TOOL, args)
  proc.stdout.setEncoding('utf8')
  proc.on('close', (code) => {
    if (code === 0) resolve(getTimelinesFilePath(args))
    else {
      reject(new Error(`Can't execute ${PATH_TO_PERF_TOOL}\nArgs: ${JSON.stringify(args)}`))
    }
  })
})

const generateChromeTimelines = async (urlToHtmlFile, options) => {
  try {
    const timelinesFilePath = await spawnTool(['generate', urlToHtmlFile, ...options])
    return timelinesFilePath
  } catch (error) {
    console.error(chalk.red(error.stack))
    return process.exit(1)
  }
}

module.exports = { generateChromeTimelines }