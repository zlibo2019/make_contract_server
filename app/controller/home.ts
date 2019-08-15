'use strict';

const Controller = require('egg').Controller;
// var fs = require('fs');

export default class HomeController extends Controller {
  async makeDocx() {
    const { ctx } = this;
    let body = ctx.request.body;
    // console.log('body' + JSON.stringify(ctx.request.body));
    let jResult = ctx.service.serviceCommon.makeDocx(body.userId);
    // let filePath = jResult.data;
    // let file = fs.readFileSync(filePath);
    ctx.success(jResult);//jResult.data;   // file buf
  }


  async upXlsxData() {
    const { ctx } = this;
    let body = ctx.request.body;
    // console.log('body' + JSON.stringify(ctx.request.body));
    let jResult = await ctx.service.serviceCommon.upXlsxData(body.arrData);
    // let filePath = jResult.data;
    // let file = fs.readFileSync(filePath);
    ctx.success(jResult);//jResult.data;   // file buf
  }


  async queryUser() {
    const { ctx } = this;
    let body = ctx.request.body;
    // console.log('body' + JSON.stringify(ctx.request.body));
    let condition = body.condition;
    let jResult = await ctx.service.serviceCommon.queryUser(condition);
    // let filePath = jResult.data;
    // let file = fs.readFileSync(filePath);
    ctx.success(jResult);//jResult.data;   // file buf
  }

  async saveUserPhoto() {
    const { ctx } = this;
    let body = ctx.request.body;
    // console.log('body' + JSON.stringify(ctx.request.body));
    let jResult = await ctx.service.serviceCommon.saveUserPhoto(body.user_id, body.base64_1,body.base64_2,body.base64_3);
    // let filePath = jResult.data;
    // let file = fs.readFileSync(filePath);
    ctx.success(jResult);//jResult.data;   // file buf
  }
}
