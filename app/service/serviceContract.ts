import { Service } from 'egg';
// import xlsx from 'node-xlsx';
import { IResult } from '../extend/helper';
const xlsx = require('xlsx');
const fs = require('fs');
const Zip = require('jszip');
const Docxtemplater = require('docxtemplater');
const ImageModule = require('open-docxtemplater-image-module');
const path = require('path');
const compressing = require('compressing');
const moment = require('moment');
const Sequelize = require('sequelize');

export default class ContractService extends Service {
  /**
   * # 生成合同
   */
  makeContract(contract, tmpDirName) {
    // const { ctx } = this;
    let jResult: IResult
      = {
      code: 600,
      msg: '',
      data: null
    };

    let projectBh = contract.projectBh;
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

      let templatePath = path.join(__dirname, `../public/docx/template/${projectBh}/template_contract.docx`);
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
      // jResult.data = buf;
      fs.writeFileSync(path.join(tmpDirName, `${contractNo}.docx`), buf);
      // jResult.data = `http://10.18.0.2:15007/public/docx/contract/${userId}/${contractNo}.docx`;
    } catch (error) {
      jResult.code = 601;
      jResult.msg = error.stack;
      console.log(JSON.stringify(error.stack));
      jResult.data = null;
    }
    return jResult;
  }





  async bulkMakeContract(arrContract) {
    let jResult: IResult
      = {
      code: 600,
      msg: '',
      data: null
    };

    try {
      let dirTo = path.resolve(__dirname, `../public/docx/contract/tmp`);
      let sj = moment().format('YYYYMMDDHHmmss');
      let tmpDirName = path.join(dirTo, sj);
      // 创建目录 
      if (!fs.existsSync(tmpDirName)) {
        fs.mkdirSync(tmpDirName, { recursive: true });
      };
      for (let i = 0; i < arrContract.length; i++) {
        const contract = arrContract[i];
        let jResult = this.makeContract(contract, tmpDirName);
        if (jResult.code !== 600) {

        }
      }

      return new Promise((resolve, reject) => {
        compressing.zip.compressDir(tmpDirName, `${tmpDirName}.zip`)
          .then(() => {
            jResult.data = `http://${this.config.program.webUrl}/public/docx/contract/tmp/${sj}.zip`;
            resolve(jResult);
          })
          .catch(err => {
            jResult.code = 601;
            jResult.msg = err;
            reject(jResult);
          });
      })

    } catch (error) {
      jResult.code = 601;
      jResult.msg = error.stack;
      return jResult;
    }
  }



  // async makeContractPhoto(userId, tmpDirName) {
  //   const { ctx } = this;
  //   let jResult: IResult
  //     = {
  //     code: 600,
  //     msg: '',
  //     data: null
  //   };

  //   // let fromDir = `http://${this.config.program.webUrl}/public/photo/${userId}`;
  //   let fromDir = path.resolve(__dirname, `../public/photo/${userId}`);
  //   try {


  //     // await ctx.service.serviceCommon.exists(fromDir, `${tmpDirName}/${userId}`, ctx.service.serviceCommon.copy);
  //     await ctx.service.serviceCommon.checkDirectory(fromDir, `${tmpDirName}/${userId}`, ctx.service.serviceCommon.copy);
  //     return jResult;
  //   } catch (error) {
  //     jResult.code = 601;
  //     jResult.msg = error.stack;
  //     return jResult;
  //   }
  // }

  async bulkMakeContractPhoto(arrContract) {
    const { ctx } = this;
    let jResult: IResult
      = {
      code: 600,
      msg: '',
      data: null
    };

    try {
      let dirTo = path.resolve(__dirname, `../public/photo/tmp`);
      let sj = moment().format('YYYYMMDDHHmmss');
      let tmpDirName = path.join(dirTo, sj);
      // 创建目录 
      if (!fs.existsSync(tmpDirName)) {
        fs.mkdirSync(tmpDirName, { recursive: true });
      };
      for (let i = 0; i < arrContract.length; i++) {
        const contract = arrContract[i];
        let userId = contract.userId;

        let fromDir = path.resolve(__dirname, `../public/photo/${userId}`);
        ctx.service.serviceCommon.copyFolder(fromDir, `${tmpDirName}/${userId}`);


        // jResult = await this.makeContractPhoto(userId, tmpDirName);
        // if (jResult.code !== 600) {

        // }
      }

      return new Promise((resolve, reject) => {
        compressing.zip.compressDir(tmpDirName, `${tmpDirName}.zip`)
          .then(() => {
            jResult.data = `http://${this.config.program.webUrl}/public/photo/tmp/${sj}.zip`;
            resolve(jResult);
          })
          .catch(err => {
            jResult.code = 601;
            jResult.msg = err;
            reject(jResult);
          });
      })

    } catch (error) {
      jResult.code = 601;
      jResult.msg = error.stack;
      return jResult;
    }
  }



  /**
   * # 将电子表格数据放到数组，并翻译班级名称为班级id
   */
  async getArrExcel(filePath: string) {
    let jResult: IResult
      = {
      code: 600,
      msg: '',
      data: null
    };

    try {
      let data = {};
      let workbook = xlsx.readFile(filePath); //workbook就是xls文档对象
      let sheetNames = workbook.SheetNames; //获取表明
      let sheet = workbook.Sheets[sheetNames[0]]; //通过表明得到表对象
      let arrContent = xlsx.utils.sheet_to_json(sheet); //通过工具将表对象的数据读出来并转成json
      sheet = workbook.Sheets[sheetNames[1]]; //通过表明得到表对象
      let arrField = xlsx.utils.sheet_to_json(sheet); //通过工具将表对象的数据读出来并转成json
      // @ts-ignore
      data.arrContent = arrContent;
      // @ts-ignore
      data.arrField = arrField;
      jResult.data = data;
      return jResult;
    } catch (err) {
      jResult.code = 601;
      jResult.msg = err.stack;
      jResult.data = null;
      return jResult;
    } finally {
      await this.ctx.service.serviceCommon.removeFile(filePath);
    }
  };




  /**
  * # 导入合同
  */
  async saveContractList(projectBh, filePath) {
    const { ctx } = this;
    let jResult: IResult
      = {
      code: 600,
      msg: '',
      data: null
    };

    try {
      ctx.model.DtContract.removeAttribute('id');
      jResult = await this.getArrExcel(filePath);
      if (jResult.code !== 600) {
        return jResult;
      }
      let data = jResult.data;

      // 解析字段配置
      let arrField = data.arrField;
      let arrContract = data.arrContent;
      // let arrContract = new Array();
      for (let i = 0; i < arrContract.length; i++) {
        let curXlsxContract = arrContract[i];
        let curTableContract = {};

        for (let j = 0; j < arrField.length; j++) {
          let curTableField = arrField[j].数据库字段名.replace(
            /^\s*|\s*$/g,
            ""
          ); // 去除两边空格
          let curXlsxField = arrField[j].合同导入字段名.replace(
            /^\s*|\s*$/g,
            ""
          ); // 去除两边空格
          // if (curTableField === '') {
          //   continue;
          // } else if (curXlsxField === '') {
          //   curTableContract[curTableField] = '';
          // }
          curTableContract[curTableField] = curXlsxContract[curXlsxField];
        }
        curTableContract["projectBh"] = projectBh;
        await ctx.model.DtContract.upsert(curTableContract);
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
  * # 
  */
  async queryContractList(body) {
    const { ctx } = this;
    // @ts-ignore
    const Op = Sequelize.Op;
    let jResult: IResult
      = {
      code: 600,
      msg: '',
      data: null
    };
    body;
    let projectBh = body.projectBh;
    let fuzzyCondition = body.fuzzyCondition;
    let condition;
    if (fuzzyCondition === '') {
      condition = {
        projectBh: projectBh
      };
    } else {
      condition = {
        projectBh: projectBh,
        [Op.or]:
          [{
            userId: {
              [Op.like]: `%${fuzzyCondition}%`
            }
          },
          {
            userName: {
              [Op.like]: `%${fuzzyCondition}%`
            }
          },
          {
            contractNo: {
              [Op.like]: `%${fuzzyCondition}%`
            }
          }]
      }
    }
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
  async savePhoto(projectBh, userId, contractNo, base64_1, base64_2, base64_3) {
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

      if (base64_1 !== null && undefined !== base64_1) {
        base64_1 = base64_1.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
        let dataBuffer = new Buffer(base64_1, 'base64');
        fs.writeFileSync(path.join(dir, 'sfz1.jpg'), dataBuffer);
      }

      if (base64_2 !== null && undefined !== base64_2) {
        base64_2 = base64_2.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
        let dataBuffer = new Buffer(base64_2, 'base64');
        fs.writeFileSync(path.join(dir, 'sfz2.jpg'), dataBuffer);
      }



      if (base64_3 !== null && undefined !== base64_3) {
        let time = moment().format('YYYYMMDDHHmmss');
        base64_3 = base64_3.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
        let dataBuffer = new Buffer(base64_3, 'base64');
        let fileName = path.join(dir, `${contractNo}_${time}.contract.jpg`);
        fs.writeFileSync(fileName, dataBuffer);
        // console.log('projectBh'+projectBh);
        await this.syncContractPhoto(userId, projectBh.toString(), contractNo, fileName);

      }
    } catch (error) {
      jResult.code = 601;
      jResult.msg = error.stack;
      console.log(JSON.stringify(error.stack));
      jResult.data = null;
    }
    return jResult;
  }

  async getUserSerialByUserId(userId) {
    const { ctx } = this;
    let jResult: IResult
      = {
      code: 600,
      msg: '',
      data: null
    };
    try {
      let res = await ctx.platModel.DtUser.findOne({
        attributes: ['user_serial'],
        where: {
          user_id: userId,
        }
      })
      if (undefined !== res && null !== res) {
        jResult.code = 600;
        jResult.data = res.user_serial;
      } else {
        jResult.code = 601;
        jResult.data = 0;
        jResult.msg = 'user not find';
      }
    } catch (error) {
      jResult.code = 601;
      jResult.msg = error.stack;
      console.log(JSON.stringify(error.stack));
      jResult.data = null;
    }
    return jResult;
  }

  async getProjectNoByGlyNo(glyNo) {
    const { ctx } = this;
    let jResult: IResult
      = {
      code: 600,
      msg: '',
      data: null
    };
    try {
      let res = await ctx.platModel.DtPro.findOne({
        attributes: ['bh'],
        where: {
          pro_mj: glyNo,
        }
      })
      if (undefined !== res && null !== res) {
        jResult.code = 600;
        jResult.data = res.bh;
      }else{
        jResult.code = 601;
        jResult.data = 0;
        jResult.msg = 'not found';
      }
    } catch (error) {
      jResult.code = 601;
      jResult.msg = error.stack;
      console.log(JSON.stringify(error.stack));
      jResult.data = null;
    }
    return jResult;
  }

  async getMaxContractNameByUserSerial(userSerial) {
    const { ctx } = this;
    let jResult: IResult
      = {
      code: 601,
      msg: '',
      data: null
    };
    try {
      let res = await ctx.platModel.DtContract.findOne({
        attributes: ['contract_name'],
        where: {
          user_serial: userSerial,
        },
        order: [['contract_name', 'DESC'],],
      })
      if (undefined !== res && null !== res) {
        jResult.code = 600;
        let contractName = res.contract_name;
        let rightStr = contractName.split("_")[1];
        let newNum = Number(rightStr.split(".")[0]) + 1;
        let newName = `${contractName.split("_")[0]}_${newNum}`;
        jResult.data = newName;
      }
    } catch (error) {
      jResult.code = 601;
      jResult.msg = error.stack;
      console.log(JSON.stringify(error.stack));
      jResult.data = null;
    }
    return jResult;
  }


  async syncContractPhoto(userId, glyNo, contractNo, fromFilePath) {
    const { ctx } = this;
    let jResult: IResult
      = {
      code: 600,
      msg: '',
      data: null
    };
    try {
      jResult = await this.getUserSerialByUserId(userId);
      if (jResult.code !== 600) {
        return jResult;
      }
      let userSerial = jResult.data;

      jResult = await this.getProjectNoByGlyNo(glyNo);
      if (jResult.code !== 600) {
        return jResult;
      }
      let projectNo = jResult.data;

      let maxProjectName;
      jResult = await this.getMaxContractNameByUserSerial(userSerial);
      if (jResult.code !== 600) {
        maxProjectName = `${userId}_1`;
      } else {
        maxProjectName = jResult.data;
      }

      await ctx.platModel.DtContract.create({
        lx: 0,
        user_serial: userSerial,
        reg_serial: projectNo,
        contract_name: `${maxProjectName}.jpg`,
        contract_path: `../contract/${projectNo}/${userSerial}/`,
        contract_bh: contractNo,
      })
      // 文件复制
      let dir = path.join(this.config.program.platContractPhotoPath, `/contract/${projectNo}/${userSerial}/`);
      let fromFile = fs.readFileSync(fromFilePath);
      // 创建目录 
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      };
      fs.writeFileSync(path.join(dir, `${maxProjectName}.jpg`), fromFile);
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
  async saveContractTemplate(projectBh, fromFile) {
    // const { ctx } = this;
    let jResult: IResult
      = {
      code: 600,
      msg: '',
      data: null
    };
    try {
      let dir = path.resolve(__dirname, `../public/docx/template/${projectBh}`);
      // 创建目录 
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      };
      fs.writeFileSync(path.join(dir, 'template_contract.docx'), fromFile);
      // // 文件复制
      // if (fromFile !== null) {
      //   let dataBuffer = new Buffer(fromFile, 'base64');
      //   fs.writeFileSync(path.join(dir, 'template_contract.docx'), dataBuffer);
      // }
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
  saveContractListTemplate(projectBh, fromFile) {
    // const { ctx } = this;
    let jResult: IResult
      = {
      code: 600,
      msg: '',
      data: null
    };
    try {
      let dir = path.resolve(__dirname, `../public/docx/template/${projectBh}`);
      // 创建目录 
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      };

      // 文件复制
      // if (base64_1 !== null) {
      //   let dataBuffer = new Buffer(base64_1, 'base64');
      //   fs.writeFileSync(path.join(dir, 'template_contract_list.xlsx'), dataBuffer);
      // }
      fs.writeFileSync(path.join(dir, 'template_contract_list.xlsx'), fromFile);
    } catch (error) {
      jResult.code = 601;
      jResult.msg = error.stack;
      console.log(JSON.stringify(error.stack));
      jResult.data = null;
    }
    return jResult;
  }

  /**
  * #  列出合同照片
  */
  async listContractFileName(projectBh, userId) {
    // const { ctx } = this;
    projectBh;
    let jResult: IResult
      = {
      code: 600,
      msg: '',
      data: null
    };
    try {
      let extDir = `../public/photo/${userId}`;
      var param = path.resolve(__dirname, extDir);
      let arrFileName = new Array();
      return new Promise((resolve, reject) => {
        fs.stat(param, function (err, stats) {
          if (err) {
            reject(err);
          }
          if (stats.isDirectory()) {
            fs.readdir(param, function (err, files) {
              if (err) {
                reject(err);
              }
              files.forEach(e => {
                // console.log(e);
                // let url = path.resolve(path.join(param, e));
                if (e !== "sfz1.jpg" && e !== "sfz2.jpg") {
                  arrFileName.push(e);
                }
              });
              jResult.data = arrFileName;
              console.log(arrFileName);
              resolve(jResult);
            });
          }
        });
      });
    } catch (error) {
      jResult.code = 601;
      jResult.msg = error.stack;
      console.log(JSON.stringify(error.stack));
      jResult.data = null;
    }
  }

  /**
  * #  列出合同照片
  */
 async listSfzFileName( userId) {
  // const { ctx } = this;
  let jResult: IResult
    = {
    code: 600,
    msg: '',
    data: null
  };
  try {
    let extDir = `../public/photo/${userId}`;
    var param = path.resolve(__dirname, extDir);
    let arrFileName = new Array();
    return new Promise((resolve, reject) => {
      fs.stat(param, function (err, stats) {
        if (err) {
          reject(err);
        }
        if (stats.isDirectory()) {
          fs.readdir(param, function (err, files) {
            if (err) {
              reject(err);
            }
            files.forEach(e => {
              // console.log(e);
              // let url = path.resolve(path.join(param, e));
              if (e === "sfz1.jpg" || e !== "sfz2.jpg") {
                arrFileName.push(e);
              }
            });
            jResult.data = arrFileName;
            console.log(arrFileName);
            resolve(jResult);
          });
        }
      });
    });
  } catch (error) {
    jResult.code = 601;
    jResult.msg = error.stack;
    console.log(JSON.stringify(error.stack));
    jResult.data = null;
  }
}

}