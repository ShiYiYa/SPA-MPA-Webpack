const path = require('path')
const fs = require('fs')
const url = require('url')
const glob = require('glob')

const envPublicUrl = './'
const jsFilename = 'js/[name].[contenthash:8].js'
const cssFilename = 'css/[name].[contenthash:8].css'
const chunkFilename = 'js/[name].[contenthash:8].chunk.js'
const shouldUseSourceMap = true
const minify = {
  removeComments: true,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  keepClosingSlash: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true
}

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith('/')
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1)
  } else if (!hasSlash && needsSlash) {
    return `${path}/`
  } else {
    return path
  }
}
const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage

function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson)
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/')
  return ensureSlash(servedUrl, true)
}

const resolveAppEntry = appEntry => {
  let entries = {}
  for (key in appEntry) {
    Object.assign(entries, { [key]: resolveApp(appEntry[key]) })
  }
  return entries
}

const chunk = {
  a: [],
  b: []
}

// 根据 /src/view/(*).html 确定入口对应 /src/js/(*).js
function getAppEntry(appHtmlEntry) {
  let tplEntries = [],
    jsEntries = {}
  glob.sync(appHtmlEntry).forEach(function(entry) {
    let basename = path.basename(entry, path.extname(entry)),
      pathname = path.dirname(entry)
    ;(fileDir = pathname
      .split('/')
      .splice(2)
      .join('')),
      (isMinify = process.env.NODE_ENV === 'production' ? minify : {})
    console.log(entry, basename, pathname, fileDir)
    tplEntries.push({
      filename: basename + '.html',
      template: entry,
      chunks: [basename, 'vendor', 'commons'], //// 如何按需引入 chunks
      minify: isMinify
    })
    Object.assign(jsEntries, {
      [basename]: resolveApp(`./src/js/${basename}.js`)
    })
  })
  return { tplEntries, jsEntries }
}

module.exports = {
  appRoot: appDirectory,
  appBuild: resolveApp('dist'),
  jsFilename,
  cssFilename,
  chunkFilename,
  entryAppHtml: getAppEntry('./src/view/*.html').tplEntries,
  appEntry: getAppEntry('./src/view/*.html').jsEntries,
  shouldUseSourceMap,
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  yarnLockFile: resolveApp('yarn.lock'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json'))
}

/* function getEntry(globPath) {
  let entries = {};
  glob.sync(globPath).forEach(function(entry) {
    let basename = path.basename(entry, path.extname(entry)),
      pathname = path.dirname(entry),
      fileDir = pathname
        .split("/")
        .splice(3)
        .join("/");

    // js/lib/*.js 
    if (!entry.match(/\/js\/(lib|commons)\//)) {
      entries[(fileDir ? fileDir + "/" : fileDir) + basename] =
        pathname + "/" + basename;
    }
  });
  return entries;
} */
