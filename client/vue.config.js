// base url sestting
// vue-cli 4版本解决打包后无法找到js/css问题
// https://blog.csdn.net/qq_27517377/article/details/120344269
// Vue项目打包部署后首页空白的问题
// https://blog.51cto.com/u_11378682/3662659
module.exports = {
  publicPath:"./",
  // configureWebpack: {
  //   devServer: {
  //     proxy: {
  //       "/api": {
  //         target: "https://api.glennou.cn",
  //         ws: true,
  //         changrigin: true,
  //         pathRewrite: {
  //           "^/api": "https://api.glennou.cn",
  //         },
  //       },
  //     },
  //   },
  // },
};
