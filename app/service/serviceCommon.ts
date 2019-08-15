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
  makeDocx(userId) {
    // const { ctx } = this;
    let jResult: IResult
      = {
      code: 600,
      msg: '',
      data: null
    };


    console.log('aaaaaaaaaaaa');
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

      // let dir = path.resolve(__dirname, `../public/docx`);

      // base64_1 = base64_1.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
      // let dataBuffer = new Buffer(base64_1, 'base64');
      // fs.writeFileSync(path.join(dirTo, 'a.jpg'), dataBuffer);

      // base64_2 = base64_2.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
      // dataBuffer = new Buffer(base64_2, 'base64'); //把base64码转成buffer对象，
      // fs.writeFileSync(path.join(dirTo, 'b.jpg'), dataBuffer);

      var content = fs.readFileSync(path.join(__dirname, '../public/docx/template.docx'), 'binary');
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
      doc.setData({
        name1: "内容已被替换1",
        name2: "内容已被替换2",
        value1: "新的值1",
        value2: "新的值2",
        image1: "sfz1.jpg",
        image2: "sfz2.jpg"
      });
      doc.render();
      var buf = doc.getZip().generate({ type: 'nodebuffer' });
      fs.writeFileSync(path.join(dirTo, `contract.docx`), buf);
      jResult.data =`http://127.0.0.1:7001/public/docx/${userId}/contract.docx`;
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
      // let arrUser = new Array();
      // for (let i = 0; i < docxData.length; i++) {
      //   let curUser = docxData[i];
      //   let user = {
      //     user_id: curUser.身份证,
      //     user_name: curUser.姓名,
      //     user_address: curUser.地址,
      //   }
      //   ctx.model.DtUser.removeAttribute('id');
      //   arrUser.push(user);
      // }
      ctx.model.DtUser.removeAttribute('id');
      await ctx.model.DtUser.bulkCreate(docxData);
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

      let res = await ctx.model.DtUser.findAll();
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

      base64_1 = base64_1.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
      let dataBuffer = new Buffer(base64_1, 'base64');
      fs.writeFileSync(path.join(dir, 'sfz1.jpg'), dataBuffer);

      base64_2 = base64_2.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
      dataBuffer = new Buffer(base64_2, 'base64');
      fs.writeFileSync(path.join(dir, 'sfz2.jpg'), dataBuffer);

      base64_3 = base64_3.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
      dataBuffer = new Buffer(base64_3, 'base64');
      fs.writeFileSync(path.join(dir, 'contract.jpg'), dataBuffer);
    } catch (error) {
      jResult.code = 601;
      jResult.msg = error.stack;
      console.log(JSON.stringify(error.stack));
      jResult.data = null;
    }
    return jResult;
  }
}