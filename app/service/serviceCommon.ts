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
  makeContract(base64_1, base64_2) {
    // const { ctx } = this;
    let jResult: IResult
      = {
      code: 600,
      msg: '',
      data: null
    };


    console.log('aaaaaaaaaaaa');
    try {

      //读取模板文件
      let dir = path.resolve(__dirname, '../public/docx');
      base64_1 = base64_1.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
      let dataBuffer = Buffer.from(base64_1); //把base64码转成buffer对象，


      fs.writeFileSync(path.join(dir, 'a.jpg'), dataBuffer);

      base64_2 = base64_2.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
      // dataBuffer = new Buffer(base64_2, 'base64'); //把base64码转成buffer对象，
      dataBuffer = Buffer.from(base64_2);
      fs.writeFileSync(path.join(dir, 'b.jpg'), dataBuffer);



      var content = fs.readFileSync(path.join(dir, 'template.docx'), 'binary');
      var zip = new Zip(content);
      var doc = new Docxtemplater();
      var opts = {
        centered: false,
        // @ts-ignore
        getImage: function (tagValue, tagName) {
          return fs.readFileSync(path.join(dir, tagValue));
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
        image1: "a.jpg",
        image2: "b.jpg"
      });
      doc.render();
      var buf = doc.getZip().generate({ type: 'nodebuffer' });
      fs.writeFileSync(path.join(dir, 'b.docx'), buf);
      console.log('aaaaaaaaaaaaaaa11111111');
      jResult.data = 'http://127.0.0.1:7002/docx/b.docx';
    } catch (error) {
      console.log('bbbbbbbbbbbbbbbb');
      jResult.code = 601;
      jResult.msg = error.stack;
      console.log(JSON.stringify(error.stack));
      jResult.data = null;
    }
    return jResult;
  }
}