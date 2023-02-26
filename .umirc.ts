import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'mai-lib@1.0.0',
  favicon: 'http://rqo66mzm0.hd-bkt.clouddn.com/icon.png',
  logo: 'http://rqo66mzm0.hd-bkt.clouddn.com/icon.png',
  outputPath: 'docs-dist',
  // more config: https://d.umijs.org/config
  // mfsu: {},
  proxy: {
    '/api': {
      target: 'https://inventory.scionetest.ilabservice.cloud/',
      pathRewrite: { '^/': '' },
      changeOrigin: true,
    },
  },
  // scripts: ['https://s9.cnzz.com/z_stat.php?id=1281181609&web_id=1281181609'],
  // externals: {
  //   react: {
  //       root: 'React',
  //       commonjs2: 'react',
  //       commonjs: 'react',
  //       amd: 'react'
  //   },
  //   'react-dom': {
  //       root: 'ReactDOM',
  //       commonjs2: 'react-dom',
  //       commonjs: 'react-dom',
  //       amd: 'react-dom'
  //   }
  // },
});
