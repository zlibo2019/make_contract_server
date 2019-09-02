import { Service } from 'egg';
import { IResult } from '../extend/helper';
const fs = require('fs');
const Zip = require('jszip');
const Docxtemplater = require('docxtemplater');
const ImageModule = require('open-docxtemplater-image-module');
const path = require('path');

export default class ContractService extends Service {
  /**
   * # 生成合同
   */
  makeContract(contract) {
    // const { ctx } = this;
    let jResult: IResult
      = {
      code: 600,
      msg: '',
      data: null
    };

    let regId = contract.regId;
    let userId = contract.userId;
    let contractNo = contract.contractNo;
    // let userName = user.user_name;
    // let userAddress = user.user_address;

    try {
      let dirFrom = path.resolve(__dirname, `../public/photo/${userId}`);
      // 创建目录 
      if (!fs.existsSync(dirFrom)) {
        fs.mkdirSync(dirFrom, { recursive: true });
      };

      let dirTo = path.resolve(__dirname, `../public/docx/contract/${userId}`);
      // 创建目录 
      if (!fs.existsSync(dirTo)) {
        fs.mkdirSync(dirTo, { recursive: true });
      };

      let templatePath = path.join(__dirname, `../public/docx/template/${regId}/template_contract.docx`);
      // 自定义模板不存在则取公共模板
      if (!fs.existsSync(templatePath)) {
        templatePath = path.join(__dirname, `../public/docx/template/template_contract.docx`);
      }

      var content = fs.readFileSync(templatePath, 'binary');
      var zip = new Zip(content);
      var doc = new Docxtemplater();
      var opts = {
        centered: false,
        // @ts-ignore
        getImage: function (tagValue, tagName) {
          return fs.readFileSync(path.join(dirFrom, tagValue));
          // return base64;
        },
        // @ts-ignore
        getSize: function (img, tagValue, tagName) {
          return [200, 120];
        }
      }
      doc.attachModule(new ImageModule(opts))
      doc.loadZip(zip);
      contract.image1 = "sfz1.jpg";
      contract.image2 = "sfz2.jpg"
      doc.setData(contract);
      doc.render();
      var buf = doc.getZip().generate({ type: 'nodebuffer' });
      fs.writeFileSync(path.join(dirTo, `${contractNo}.docx`), buf);
      jResult.data = `http://127.0.0.1:7001/public/docx/contract/${userId}/${contractNo}.docx`;
    } catch (error) {
      jResult.code = 601;
      jResult.msg = error.stack;
      console.log(JSON.stringify(error.stack));
      jResult.data = null;
    }
    return jResult;
  }


  /**
  * # 
  */
  async saveContractList(regId, contractList) {
    const { ctx } = this;
    let jResult: IResult
      = {
      code: 600,
      msg: '',
      data: null
    };


    try {
      ctx.model.DtContract.removeAttribute('id');
      for (let i = 0; i < contractList.length; i++) {
        let curContract = JSON.parse(JSON.stringify(contractList[i]));

        curContract.regId = regId;
        await ctx.model.DtContract.upsert(curContract);
      }
      // await ctx.model.DtContract.bulkCreate(docxData);
    } catch (error) {
      jResult.code = 601;
      jResult.msg = error.stack;
      console.log(JSON.stringify(error.stack));
      jResult.data = null;
    }
    return jResult;
  }

  /**
 * # 
 */
  async queryContractList(condition) {
    const { ctx } = this;
    let jResult: IResult
      = {
      code: 600,
      msg: '',
      data: null
    };
    condition;

    try {

      let res = await ctx.model.DtContract.findAll({ where: condition });
      let arrContract = new Array();
      for (let i = 0; i < res.length; i++) {
        arrContract.push(res[i].dataValues);
      }
      jResult.data = arrContract;
    } catch (error) {
      jResult.code = 601;
      jResult.msg = error.stack;
      console.log(JSON.stringify(error.stack));
      jResult.data = null;
    }
    return jResult;
  }

  /**
* # 
*/
  async savePhoto(userId, contractNo, base64_1, base64_2, base64_3) {
    // const { ctx } = this;
    let jResult: IResult
      = {
      code: 600,
      msg: '',
      data: null
    };
    console.log('aaaaaaaaaaaaaaaaaaaaa');
    try {
      let dir = path.resolve(__dirname, `../public/photo/${userId}`);
      // 创建目录 
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      };

      if (base64_1 !== null) {
        base64_1 = base64_1.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
        let dataBuffer = new Buffer(base64_1, 'base64');
        fs.writeFileSync(path.join(dir, 'sfz1.jpg'), dataBuffer);
      }

      if (base64_2 !== null) {
        base64_2 = base64_2.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
        let dataBuffer = new Buffer(base64_2, 'base64');
        fs.writeFileSync(path.join(dir, 'sfz2.jpg'), dataBuffer);
      }

      if (base64_3 !== null) {
        base64_3 = base64_3.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
        let dataBuffer = new Buffer(base64_3, 'base64');
        fs.writeFileSync(path.join(dir, `${contractNo}.contract.jpg`), dataBuffer);
      }
    } catch (error) {
      jResult.code = 601;
      jResult.msg = error.stack;
      console.log(JSON.stringify(error.stack));
      jResult.data = null;
    }
    return jResult;
  }

  /**
* #  保存合同模板（docx）
*/
  async saveContractTemplate(regId, base64_1) {
    // const { ctx } = this;
    let jResult: IResult
      = {
      code: 600,
      msg: '',
      data: null
    };
    try {
      let dir = path.resolve(__dirname, `../public/docx/template/${regId}`);
      // 创建目录 
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      };

      // 文件复制
      if (base64_1 !== null) {
        let dataBuffer = new Buffer(base64_1, 'base64');
        fs.writeFileSync(path.join(dir, 'template_contract.docx'), dataBuffer);
      }
    } catch (error) {
      jResult.code = 601;
      jResult.msg = error.stack;
      console.log(JSON.stringify(error.stack));
      jResult.data = null;
    }
    return jResult;
  }


  /**
* #  保存合同列表模板（xlsx）
*/
  async saveContractListTemplate(regId, base64_1) {
    // const { ctx } = this;
    let jResult: IResult
      = {
      code: 600,
      msg: '',
      data: null
    };
    try {
      let dir = path.resolve(__dirname, `../public/docx/template/${regId}`);
      // 创建目录 
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      };

      // 文件复制
      if (base64_1 !== null) {
        let dataBuffer = new Buffer(base64_1, 'base64');
        fs.writeFileSync(path.join(dir, 'template_contract_list.xlsx'), dataBuffer);
      }
    } catch (error) {
      jResult.code = 601;
      jResult.msg = error.stack;
      console.log(JSON.stringify(error.stack));
      jResult.data = null;
    }
    return jResult;
  }
}