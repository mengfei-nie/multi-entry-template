const path = require('path');
const fs = require('fs');

// 构建目标项目时必须新增--project=projectName项目参数
const projectReg = /^--project=(\w+)$/g;
const targetDirParams = process.argv.find((item) => projectReg.test(item));

if (!targetDirParams) {
  throw new Error('构建目标--project 参数缺失！');
}

const targetDir = targetDirParams.replace(projectReg, '$1');
const projects = fs.readdirSync(path.resolve(__dirname, 'src/project'));

if (projects.indexOf(targetDir) == -1) {
  throw new Error('构建项目不存在！');
}

// 项目构建配置文件
module.exports = {
  outputDir: path.resolve(__dirname, `dist/${targetDir}`),
  configureWebpack: (config) => {
    config.entry = {
      app: path.resolve(__dirname, `src/project/${targetDir}/main.js`),
    };
  },
};
