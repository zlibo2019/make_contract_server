import { Service } from 'egg';
import { IResult } from '../extend/helper';


export default class AccountService extends Service {
  /**
   * # 生成合同
   */
  async loginCheck(account) {
    const { ctx } = this;
    let jResult: IResult
      = {
      code: 600,
      msg: '',
      data: null
    };


    let userName = account.userName;
    let password = account.password;
    try {
      let res = await ctx.model.DtReg.findOne({
        where: {
          account: userName,
          pwd: password,
        }
      });
      if (undefined !== res && null !== res) {
        jResult.data = res;

      } else {
        jResult.code = 601;
      }

      return jResult;
    } catch (error) {
      console.log('bbbbbbbbbbbbbbbb');
      jResult.code = 601;
      jResult.msg = error.stack;
      console.log(JSON.stringify(error.stack));
      jResult.data = false;
    }
    return jResult;
  }
}