'use strict';

const Controller = require('egg').Controller;
var fs = require('fs');

export default class HomeController extends Controller {
  async make_contract() {
    const { ctx } = this;
    let body = ctx.request.body;
    // console.log('body' + JSON.stringify(ctx.request.body));
    let jResult = ctx.service.serviceCommon.makeContract(body.base64_1, body.base64_2);
    // let filePath = jResult.data;
    // let file = fs.readFileSync(filePath);
    ctx.body = jResult.data;   // file buf
  }
}
