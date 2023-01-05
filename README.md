# mm-lib

## Getting Started

Install dependencies,

```bash
yarn
```

Start the dev server,

```bash
npm run start
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

### Build

```bash
$ npm run build
$ npm run docs:build
# 建议用 npm version [版本号] 修改版本，会自动打上tag
$ npm version [版本号] 或 在package.json中手动修改version，再自己手动打tag
$ npm run cz
$ git push
```


