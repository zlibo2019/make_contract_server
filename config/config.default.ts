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
    // domainWhiteList: ['http://10.1.0.16:8092']
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
        host: '10.18.0.5',
        port: 1433,
        username: 'sa',
        password: '123456',
        logging: true,
      },
    ],
  };

  config.program = {
    isConnectedPlat:true,
    platContractPhotoPath:'c://aa'
  }


  return {
    ...config,
  };
};
