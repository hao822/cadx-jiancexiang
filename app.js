'use strict';
var tcpserver = require('./app/server/tcpservice')
// import tcpserver from './app/server/tcpservice'
class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async didReady() {
    // 应用已经启动完毕
    // console.log('*********', this.app.mysql)
    // this.app.controller.home.index()
    // const ctx = await this.app.createAnonymousContext();
    // await ctx.service.Biz.request();

    // tcpserver.init()
    tcpserver()
    console.log('启动了')
  }

}

module.exports = AppBootHook;
