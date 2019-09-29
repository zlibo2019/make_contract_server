'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
// const URL = require("url");
const path = require('path');
import { IResult } from '../extend/helper';

export default class ContractController extends Controller {
  async bulkMakeContract() {
    const { ctx } = this;
    let arrContract = ctx.request.body;


    // console.log('body' + JSON.stringify(ctx.request.body));
    let jResult = await ctx.service.serviceContract.bulkMakeContract(arrContract);
    // let filePath = jResult.data;
    // let file = fs.readFileSync(filePath);
    ctx.success(jResult);//jResult.data;   // file buf
  }

  async bulkMakeContractPhoto() {
    const { ctx } = this;
    let arrContract = ctx.request.body;


    // console.log('body' + JSON.stringify(ctx.request.body));
    let jResult = await ctx.service.serviceContract.bulkMakeContractPhoto(arrContract);
    // let filePath = jResult.data;
    // let file = fs.readFileSync(filePath);
    ctx.success(jResult);//jResult.data;   // file buf
  }


  async saveContractList() {
    const { ctx } = this;
    let jResult: IResult
      = {
      code: 600,
      msg: '',
      data: null
    };
    let body = ctx.request.body;
    let file;
    if (ctx.request.files.length > 0) {
      file = ctx.request.files[0];
    } else {
      jResult.code = 601;
      jResult.msg = 'file not found'
      ctx.failed(jResult);//jResult.data; 
    }
    // let stream = fs.readFileSync(file.filepath);
    // console.log('body' + JSON.stringify(ctx.request.body));
    jResult = await ctx.service.serviceContract.saveContractList(body.projectBh, file.filepath);
    // let filePath = jResult.data;
    // let file = fs.readFileSync(filePath);
    ctx.success(jResult);//jResult.data;   // file buf
  }


  async queryContractList() {
    const { ctx } = this;
    let body = ctx.request.body;
    // console.log('body' + JSON.stringify(ctx.request.body));
    // let condition = body.condition;
    let jResult = await ctx.service.serviceContract.queryContractList(body);
    // let filePath = jResult.data;
    // let file = fs.readFileSync(filePath);
    ctx.success(jResult);//jResult.data;   // file buf
  }

  async savePhoto() {
    const { ctx } = this;
    let body = ctx.request.body;
    // console.log('body' + JSON.stringify(ctx.request.body));
    let jResult = await ctx.service.serviceContract.savePhoto(body.projectBh, body.userId, body.contractNo, body.base64_1, body.base64_2, body.base64_3);
    // let filePath = jResult.data;
    // let file = fs.readFileSync(filePath);
    ctx.success(jResult);//jResult.data;   // file buf
  }

  async saveContractTemplate() {
    const { ctx } = this;
    let jResult: IResult
      = {
      code: 600,
      msg: '',
      data: null
    };
    let body = ctx.request.body;
    let file;
    if (ctx.request.files.length > 0) {
      file = ctx.request.files[0];
    } else {
      jResult.code = 601;
      jResult.msg = 'file not found'
      ctx.failed(jResult);//jResult.data; 
    }
    let stream = fs.readFileSync(file.filepath);
    jResult = await ctx.service.serviceContract.saveContractTemplate(body.projectBh, stream);
    // let filePath = jResult.data;
    // let file = fs.readFileSync(filePath);
    ctx.success(jResult);//jResult.data;   // file buf
  }

  async saveContractListTemplate() {
    const { ctx } = this;
    let jResult: IResult
      = {
      code: 600,
      msg: '',
      data: null
    };
    let body = ctx.request.body;
    let file;
    if (ctx.request.files.length > 0) {
      file = ctx.request.files[0];
    } else {
      jResult.code = 601;
      jResult.msg = 'file not found'
      ctx.failed(jResult);//jResult.data; 
    }

    // @ts-ignore
    //const file = ctx.request.files[0];
    //let filePath = file.filepath;
    let stream = fs.readFileSync(file.filepath);
    // console.log('body' + JSON.stringify(ctx.request.body));
    jResult = ctx.service.serviceContract.saveContractListTemplate(body.projectBh, stream);
    // let filePath = jResult.data;
    // let file = fs.readFileSync(filePath);
    ctx.success(jResult);//jResult.data;   // file buf
  }

  async listContractFileName() {
    const { ctx } = this;
    let body = ctx.request.body;

    // @ts-ignore
    //const file = ctx.request.files[0];

    //let filePath = file.filepath;

    // console.log('body' + JSON.stringify(ctx.request.body));
    let jResult = await ctx.service.serviceContract.listContractFileName(body.projectBh, body.userId);
    // let filePath = jResult.data;
    // let file = fs.readFileSync(filePath);
    ctx.success(jResult);//jResult.data;   // file buf
  }

  async listSfzFileName() {
    const { ctx } = this;
    let body = ctx.request.body;

    // @ts-ignore
    //const file = ctx.request.files[0];

    //let filePath = file.filepath;

    // console.log('body' + JSON.stringify(ctx.request.body));
    let jResult = await ctx.service.serviceContract.listSfzFileName(body.userId);
    // let filePath = jResult.data;
    // let file = fs.readFileSync(filePath);
    ctx.success(jResult);//jResult.data;   // file buf
  }

  async removeFile() {
    const { ctx } = this;
    let body = ctx.request.body;

    // @ts-ignore
    //const file = ctx.request.files[0];

    //let filePath = file.filepath;

    // console.log('body' + JSON.stringify(ctx.request.body));
    let filePath = body.filePath;
 let arrPath = filePath.split("/");
 arrPath = arrPath.splice(2);
 filePath = arrPath.join("/");
    // let url = URL.parse(filePath);
    // filePath = url.path;
    let file = path.resolve(__dirname, `../${filePath}`);
    let jResult = await ctx.service.serviceCommon.removeFile(file);
    // let filePath = jResult.data;
    // let file = fs.readFileSync(filePath);
    ctx.success(jResult);//jResult.data;   // file buf
  }
}
