'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  
  router.post('/bulkMakeContract', controller.contract.bulkMakeContract);                        // 批量生成合同
  router.post('/bulkMakeContractPhoto', controller.contract.bulkMakeContractPhoto);                        // 批量生成合同照片
  router.post('/saveContractList', controller.contract.saveContractList);                        // 上传xlsx-data
  router.post('/queryContractList', controller.contract.queryContractList);   
  router.post('/savePhoto', controller.contract.savePhoto); 
  router.post('/saveContractTemplate', controller.contract.saveContractTemplate); 
  router.post('/saveContractListTemplate', controller.contract.saveContractListTemplate); 
  router.post('/account/loginCheck', controller.account.loginCheck); 
  router.post('/contract/listContractFileName', controller.contract.listContractFileName); 
  router.post('/contract/listSfzFileName', controller.contract.listSfzFileName); 
  router.post('/removeFile', controller.contract.removeFile);
};
