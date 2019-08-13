'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/a', controller.home.make_contract);                        // 查询教室课表
};
