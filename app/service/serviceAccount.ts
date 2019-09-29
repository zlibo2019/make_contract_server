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


    let glyNo = account.glyNo;
    let glyPass = account.glyPass;
    try {
      let res;
      let loginInfo = {};
      if (this.config.program.isConnectedPlat) {
        res = await ctx.platModel.WtGly.findOne({
          where: {
            gly_no: glyNo,
            gly_pass: glyPass,
          }
        });
        if (undefined !== res && null !== res) {
          // @ts-ignore
          loginInfo.glyName = res.gly_lname;
          // @ts-ignore
          // let regSerial = res.gly_regserial;

          res = await ctx.platModel.DtPro.findOne({
            where: {
              pro_mj: glyNo,
            }
          });
          if (undefined !== res && null !== res) {
            // @ts-ignore
            loginInfo.projectName = res.pro_name;
            //@ts-ignore
            loginInfo.projectBh = res.bh;
            jResult.data = loginInfo;
          } else {
            jResult.code = 601;
            jResult.msg = '未找到对应项目';
          }
        } else {
          jResult.code = 601;
          jResult.msg = '登陆错误';
        }
      } else {
        res = await ctx.model.WtGly.findOne({
          where: {
            gly_no: glyNo,
            gly_pass: glyPass,
          }
        });

        if (undefined !== res && null !== res) {
          // @ts-ignore
          loginInfo.glyName = res.glyName;
          // @ts-ignore
          res = await ctx.platModel.DtProject.findOne({
            where: {
              gly_no: glyNo,
            }
          });
          if (undefined !== res && null !== res) {
            // @ts-ignore
            loginInfo.projectName = res.project_name;
            // @ts-ignore
            loginInfo.projectBh = res.project_bh;
            jResult.data = loginInfo;
          } else {
            jResult.code = 601;
            jResult.msg = '未找到对应项目';
          }
        } else {
          jResult.code = 601;
          jResult.msg = '登陆错误';
        }
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