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
  async makeContract() {
    const { ctx } = this;
    let jResult: IResult
      = {
      code: 600,
      msg: '',
      data: null
    };

    let body = ctx.request.body;
    let base64 = body.photo;

    console.log('aaaaaaaaaaaa');
    try {

      //读取模板文件
      var content = fs.readFileSync(path.join(__dirname, 'template.docx'), 'binary');
      // var zip = new Zip();
      // zip.file("a.docx");

      var zip = new Zip(content);
      var doc = new Docxtemplater();
      var opts = {
        centered: false,
        // @ts-ignore
        getImage: base64,
        // function (tagValue, tagName) {
        //   console.log(__dirname);
        //   return fs.readFileSync(path.join(__dirname, tagValue));
        // },
        // @ts-ignore
        getSize: function (img, tagValue, tagName) {
          return [150, 150];
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
      fs.writeFileSync(path.join(__dirname, 'b.docx'), buf);

    } catch (error) {
      jResult.code = 601;
      jResult.msg = error.stack;
      console.log(JSON.stringify(error.stack));
      jResult.data = null;
    }
    return jResult;
  }
}