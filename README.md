# mm-lib

## Getting Started

Install dependencies,

```bash
npm i
```

Start the dev server,

```bash
npm start
```

Build documentation,

```bash
npm run docs:build
```

Build library via `father-build`,

```bash
npm run build
```

## Publish 步骤

全局安装 conventional-changelog-cli 用于自动生成 changeLog

```bash
npm i -g conventional-changelog-cli
```

### 再 dev 分支修改代码，改完以后切换到 master 分支以后执行

```bash
$ npm run build
$ npm run docs:build
# 建议用 npm version [版本号] 修改版本，会自动打上tag
$ npm version [版本号] 或 在package.json中手动修改version，再自己手动打tag
$ npm run cz
$ git push
```

### 发布

```bash
$ npm publish
# 发布成功以后，切换到dev，生成changelog日志再提交
$ npm run log
$ npm run cz
$ git push
```
