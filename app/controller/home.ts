'use strict';

const Controller = require('egg').Controller;

export default class HomeController extends Controller {
  async make_contract() {
    const { ctx } = this;
    ctx.service.serviceCommon.makeContract();
    ctx.body = 'hi, egg';
  }
}
