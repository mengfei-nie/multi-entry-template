const path = require("path");

const targetDir = process.argv.length > 3 && process.argv.slice(-1)[0];

if (!targetDir) {
  throw new Error("npm run build 参数缺失！");
}
console.log(targetDir, "targetDir");
console.log("entry", path.resolve(__dirname, `src/${targetDir}/main.js`));
// 项目构建配置文件
module.exports = {
  outputDir: path.resolve(__dirname, `dist/${targetDir}`),
  configureWebpack: (config) => {
    config.entry = { app: path.resolve(__dirname, `src/${targetDir}/main.js`) };
  },
};
