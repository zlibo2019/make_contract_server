import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';


/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
export default (appInfo: EggAppInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {} as PowerPartial<EggAppConfig>;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1564730693617_4316';

  // add your middleware config here
  config.middleware = [];
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['http://10.1.0.16:8092']
  };
  config.bodyParser = {
    jsonLimit: '50mb',
    formLimit: '50mb',
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'scm_main',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '',
    logging: true,
  };

  return {
    ...config,
  };
};
