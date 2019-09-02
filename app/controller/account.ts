'use strict';

const Controller = require('egg').Controller;
// var fs = require('fs');

export default class AccountController extends Controller {
  async loginCheck() {
    const { ctx } = this;
    let body = ctx.request.body;
    let jResult = await ctx.service.serviceAccount.loginCheck(body);
    ctx.success(jResult);
  }



}
