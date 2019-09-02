'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/makeContract', controller.contract.makeContract);                        // 生成合同
  router.post('/saveContractList', controller.contract.saveContractList);                        // 上传xlsx-data
  router.post('/queryContractList', controller.contract.queryContractList);   
  router.post('/savePhoto', controller.contract.savePhoto); 
  router.post('/saveContractTemplate', controller.contract.saveContractTemplate); 
  router.post('/saveContractListTemplate', controller.contract.saveContractListTemplate); 
  router.post('/account/loginCheck', controller.account.loginCheck); 
};
