'use strict';

const fs = require('fs');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1599701967277_7859';

  // add your config here
  config.middleware = [];

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.html': 'nunjucks',
    },
  };

  config.cluster = {
    listen: {
      port: 7001,
      // hostname: '47.93.230.161'
      // hostname: '192.168.0.115'

    }
  }

  //修改默认图标
  // 方法一：以读取网络图片的方式修改
  // config.siteFile = {
  //   '/favicon.ico': 'https://www.mi.com/favicon.ico',
  // };
  // 方法二：以读取本地文件的方式修改
  config.siteFile = {
    '/favicon.ico': fs.readFileSync('favicon.ico'),
  };

  return config;
};
