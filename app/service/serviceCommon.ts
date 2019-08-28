import { Service } from 'egg';
import { IResult } from '../extend/helper';
const fs = require('fs');
const Zip = require('jszip');
const Docxtemplater = require('docxtemplater');
const ImageModule = require('open-docxtemplater-image-module');
const path = require('path');

export default class ExportService extends Service {
  /**
   * # 生成合同
   */
  makeDocx(user) {
    // const { ctx } = this;
    let jResult: IResult
      = {
      code: 600,
      msg: '',
      data: null
    };


    let userId = user.userId;
    // let userName = user.user_name;
    // let userAddress = user.user_address;

    try {
      let dirFrom = path.resolve(__dirname, `../public/photo/${userId}`);
      // 创建目录 
      if (!fs.existsSync(dirFrom)) {
        fs.mkdirSync(dirFrom, { recursive: true });
      };

      let dirTo = path.resolve(__dirname, `../public/docx/${userId}`);
      // 创建目录 
      if (!fs.existsSync(dirTo)) {
        fs.mkdirSync(dirTo, { recursive: true });
      };

      var content = fs.readFileSync(path.join(__dirname, '../public/docx/template_contract.docx'), 'binary');
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
      user.image1 = "sfz1.jpg";
      user.image2 = "sfz2.jpg"
      // doc.setData({
      //   userName: userName,
      //   userId: userId,
      //   userAddress: userAddress,
      //   image1: "sfz1.jpg",
      //   image2: "sfz2.jpg"
      // });
      doc.setData(user);
      doc.render();
      var buf = doc.getZip().generate({ type: 'nodebuffer' });
      fs.writeFileSync(path.join(dirTo, `contract.docx`), buf);
      jResult.data = `http://127.0.0.1:7001/public/docx/${userId}/contract.docx`;
    } catch (error) {
      console.log('bbbbbbbbbbbbbbbb');
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
  async upXlsxData(docxData) {
    const { ctx } = this;
    let jResult: IResult
      = {
      code: 600,
      msg: '',
      data: null
    };


    try {
      ctx.model.DtContract.removeAttribute('id');
      for (let i = 0; i < docxData.length; i++) {
        let curUser = docxData[i];
        await ctx.model.DtContract.upsert(curUser);
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
  async queryUser(condition) {
    const { ctx } = this;
    let jResult: IResult
      = {
      code: 600,
      msg: '',
      data: null
    };
    condition;

    try {

      let res = await ctx.model.DtContract.findAll();
      let arrUser = new Array();
      for (let i = 0; i < res.length; i++) {
        arrUser.push(res[i].dataValues);
      }
      jResult.data = arrUser;
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
  async saveUserPhoto(userId, base64_1, base64_2, base64_3) {
    // const { ctx } = this;
    let jResult: IResult
      = {
      code: 600,
      msg: '',
      data: null
    };
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
        fs.writeFileSync(path.join(dir, 'contract.jpg'), dataBuffer);
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
* #  保存模板文件
*/
  async saveContractTemplate(base64_1) {
    // const { ctx } = this;
    let jResult: IResult
      = {
      code: 600,
      msg: '',
      data: null
    };
    try {
      let dir = path.resolve(__dirname, `../public/docx`);
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
* #  保存模板文件
*/
async saveUserTemplate(base64_1) {
  // const { ctx } = this;
  let jResult: IResult
    = {
    code: 600,
    msg: '',
    data: null
  };
  try {
    let dir = path.resolve(__dirname, `../public/docx`);
    // 创建目录 
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    };

    // 文件复制
    if (base64_1 !== null) {
      let dataBuffer = new Buffer(base64_1, 'base64');
      fs.writeFileSync(path.join(dir, 'template_user.xlsx'), dataBuffer);
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