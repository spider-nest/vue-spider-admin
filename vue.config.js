const { join } = require("path");
const webpack = require("webpack");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const GitRevisionPlugin = require("git-revision-webpack-plugin");
const APP_VERSION = `"${require("./package.json").version}"`;

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "",
  indexPath: "index.html",
  filenameHashing: true,
  lintOnSave: !isProd,
  runtimeCompiler: false,
  transpileDependencies: [],
  productionSourceMap: !isProd,
  integrity: false,
  configureWebpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        APP_VERSION,
        GIT_HASH: JSON.stringify(new GitRevisionPlugin().version()),
        BUILD_DATE: JSON.stringify(new Date().toLocaleString()),
      })
    );

    if (isProd) {
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: "gzip",
          test: /\.js$|\.html$|\.json$|\.css/,
          threshold: 10240,
          minRatio: 0.8,
        })
      );
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias.set("@$", join(__dirname, "src"));

    config
      .plugin("ignore")
      .use(
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/)
      );

    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .oneOf("inline")
      .resourceQuery(/inline/)
      .use("vue-svg-icon-loader")
      .loader("vue-svg-icon-loader")
      .end()
      .end()
      .oneOf("external")
      .use("file-loader")
      .loader("file-loader")
      .options({
        name: "assets/[name].[hash:8].[ext]",
      });
  },
  css: {
    requireModuleExtension: true,
    extract: isProd,
    sourceMap: false,
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  devServer: {
    https: false,
    host: "localhost",
    port: 9527,
    proxy: {
      // "/api": {
      //   target: "https://mock.ihx.me/mock/5baf3052f7da7e07e04a5116/antd-pro",
      //   ws: false,
      //   changeOrigin: true
      // },
      "/api": {
        target: `https://${process.env.VUE_APP_API_DOMAIN}`,
        ws: true,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  parallel: require("os").cpus().length > 1,
  pwa: {
    name: "Vue Spider Admin",
    themeColor: "#000000",
    msTileColor: "#000000",
    appleMobileWebAppStatusBarStyle: "black",
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      importScripts: "https://g.alicdn.com/kg/workbox/4.3.1/workbox-sw.js",
    },
  },
};
