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
    domainWhiteList: ['http://localhost:15007']
  };
  config.bodyParser = {
    jsonLimit: '50mb',
    formLimit: '50mb',
  };

  config.whitelist = [
    // images
    // '.jpg', '.jpeg', // image/jpeg
    // '.png', // image/png, image/x-png
    // '.gif', // image/gif
    // '.bmp', // image/bmp
    // '.wbmp', // image/vnd.wap.wbmp
    // '.webp',
    // '.tif',
    // '.psd',
    // // text
    // '.svg',
    // '.js', '.jsx',
    // '.json',
    // '.css', '.less',
    // '.html', '.htm',
    // '.xml',
    // // tar
    // '.zip',
    // '.gz', '.tgz', '.gzip',
    // // video
    // '.mp3',
    // '.mp4',
    // '.avi',
    '.xlsx',
    '.docx',
  ];

  config.multipart = {
    mode: 'file',
    fileExtensions: [
      '.xlsx',
      '.docx',
    ],
  };

  config.cluster = {
    listen: {
      port: 15007,
      // hostname: '127.0.0.1',
    }
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
  // config.sequelize = {
  //   dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
  //   database: 'scm_main_gd',
  //   host: '127.0.0.1',
  //   port: 3306,
  //   username: 'root',
  //   password: '123456',
  //   logging: true,
  // };


  config.sequelize = {
    datasources: [
      {
        delegate: 'model', // load all models to app.model and ctx.model
        baseDir: 'model', // load models from `app/model/*.js`
        database: 'scm_main_gd',
        dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: '123456',
        logging: true,
      },
      {
        delegate: 'platModel', // load all models to app.adminModel and ctx.adminModel
        baseDir: 'plat_model', // load models from `app/admin_model/*.js`
        database: 'scm_main_烟台',
        dialect: 'mssql', // support: mysql, mariadb, postgres, mssql
        host: '10.18.0.5',     // 服务器
        port: 1433,
        username: 'sa',        // 用户名
        password: '123456',       // 密码
        // dialectOptions: {
        //   options: {
        //     instanceName: 'sql2014',    // 实例名
        //     connectTimeout: 600000,      // 连接超时时间
        //     requestTimeout: 999999,     // 请求超时时间
        //   },
        // },
        logging: true,
      },
    ],
  };

  config.program = {
    isConnectedPlat: true,
    platContractPhotoPath: 'c://aa',
    webUrl:'127.0.0.1:15007',
  }


  return {
    ...config,
  };
};
