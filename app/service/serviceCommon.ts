import { Service } from 'egg';
const fs = require('fs');
import { IResult } from '../extend/helper';


export default class CommonService extends Service {
  /**
   * # 删除文件
   */

  remove(filename) {
    let jResult: IResult
      = {
      code: 600,
      msg: '',
      data: null
    };
    return new Promise((resolve, reject) => {
      fs.unlink(filename, (err) => {
        if (err) {
          jResult.code = 601;
          jResult.msg = err;
          reject(jResult)
        }
        resolve(jResult)
      });
    })
  }
}