'use strict';

const Controller = require('egg').Controller;
// var fs = require('fs');

export default class ContractController extends Controller {
  async makeContract() {
    const { ctx } = this;
    let contract = ctx.request.body;


    // console.log('body' + JSON.stringify(ctx.request.body));
    let jResult = ctx.service.serviceContract.makeContract(contract);
    // let filePath = jResult.data;
    // let file = fs.readFileSync(filePath);
    ctx.success(jResult);//jResult.data;   // file buf
  }


  async saveContractList() {
    const { ctx } = this;
    let body = ctx.request.body;
    // console.log('body' + JSON.stringify(ctx.request.body));
    let jResult = await ctx.service.serviceContract.saveContractList(body.regId, body.arrData);
    // let filePath = jResult.data;
    // let file = fs.readFileSync(filePath);
    ctx.success(jResult);//jResult.data;   // file buf
  }


  async queryContractList() {
    const { ctx } = this;
    let condition = ctx.request.body;
    // console.log('body' + JSON.stringify(ctx.request.body));
    // let condition = body.condition;
    let jResult = await ctx.service.serviceContract.queryContractList(condition);
    // let filePath = jResult.data;
    // let file = fs.readFileSync(filePath);
    ctx.success(jResult);//jResult.data;   // file buf
  }

  async savePhoto() {
    const { ctx } = this;
    let body = ctx.request.body;
    // console.log('body' + JSON.stringify(ctx.request.body));
    let jResult = await ctx.service.serviceContract.savePhoto(body.userId, body.contractNo, body.base64_1, body.base64_2, body.base64_3);
    // let filePath = jResult.data;
    // let file = fs.readFileSync(filePath);
    ctx.success(jResult);//jResult.data;   // file buf
  }

  async saveContractTemplate() {
    const { ctx } = this;
    let body = ctx.request.body;

    // @ts-ignore
    //const file = ctx.request.files[0];

    //let filePath = file.filepath;

    // console.log('body' + JSON.stringify(ctx.request.body));
    let jResult = await ctx.service.serviceContract.saveContractTemplate(body.regId, body.base64_1);
    // let filePath = jResult.data;
    // let file = fs.readFileSync(filePath);
    ctx.success(jResult);//jResult.data;   // file buf
  }

  async saveContractListTemplate() {
    const { ctx } = this;
    let body = ctx.request.body;

    // @ts-ignore
    //const file = ctx.request.files[0];

    //let filePath = file.filepath;

    // console.log('body' + JSON.stringify(ctx.request.body));
    let jResult = await ctx.service.serviceContract.saveContractListTemplate(body.regId, body.base64_1);
    // let filePath = jResult.data;
    // let file = fs.readFileSync(filePath);
    ctx.success(jResult);//jResult.data;   // file buf
  }
}
