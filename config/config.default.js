/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1635228959984_9444';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    uploadDir: 'app/public/upload'
  };

  // add csrf
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: [ '*' ]
  }

  config.view = {
    mapping: { '.html': 'ejs' }
  }

  config.jwt = {
    secret: 'Nick'
  }

  config.mysql = {
    client: {
      host: '112.74.87.229',
      port: '3306',
      user: 'root',
      password: '123456',
      database: 'cost-record'
    },
    app: true,
    agent: false
  }

  config.multipart = {
    mode: 'file'
  }

  config.cors = {
    origin: '*',
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }

  return {
    ...config,
    ...userConfig,
  };
};

