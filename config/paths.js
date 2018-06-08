const path = require("path");
const fs = require("fs");
const url = require("url");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const resolveAppEntry = entrys => {
  let entry = {};
  for (key in entrys) {
    Object.assign(entry, { [key]: resolveApp(entrys[key]) });
  }
  return entry;
};
//待添加
const resolveAppHtml = path => {};

const envPublicUrl = "./";
const jsFilename = "js/[name].[contenthash:8].js";
const cssFilename = "css/[name].[contenthash:8].css";
const chunkFilename = "js/[name].[contenthash:8].chunk.js";

function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith("/");
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${path}/`;
  } else {
    return path;
  }
}
const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;

function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : "/");
  return ensureSlash(servedUrl, true);
}

module.exports = {
  appRoot: appDirectory,
  appBuild: resolveApp("dist"),
  jsFilename,
  cssFilename,
  chunkFilename,
  appPublic: resolveApp("public"),
  appHtml: resolveApp("index.html"),
  appIndexJs: resolveApp("src/index.js"),
  appEntrys: resolveAppEntry({ app: "src/index.js", about: "src/about.js" }),
  appPackageJson: resolveApp("package.json"),
  appSrc: resolveApp("src"),
  yarnLockFile: resolveApp("yarn.lock"),
  appNodeModules: resolveApp("node_modules"),
  publicUrl: getPublicUrl(resolveApp("package.json")),
  servedPath: getServedPath(resolveApp("package.json"))
};
