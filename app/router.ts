'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/makeDocx', controller.home.makeDocx);                        // 下载xlsx
  router.post('/upXlsxData', controller.home.upXlsxData);                        // 上传xlsx-data
  router.post('/queryUser', controller.home.queryUser);   
  router.post('/saveUserPhoto', controller.home.saveUserPhoto); 
};
