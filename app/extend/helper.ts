import { IResult } from '../extend/helper';

/**
 * 格式化日期
 */
function fix2number(n) {
  return [0, n].join('').slice(-2);
}
exports.formatDate = (format: any, curDate: Date) => {
  if (format === undefined) return curDate;
  curDate = new Date(curDate);
  format = format.replace(/Y/i, curDate.getFullYear());
  format = format.replace(/m/i, fix2number(curDate.getMonth() + 1));
  format = format.replace(/d/i, fix2number(curDate.getDate()));
  format = format.replace(/H/i, fix2number(curDate.getHours()));
  format = format.replace(/i/i, fix2number(curDate.getMinutes()));
  format = format.replace(/s/i, fix2number(curDate.getSeconds()));
  format = format.replace(/ms/i, curDate.getMilliseconds());
  return format;
};

exports.formatDateRange = (beginDate: string, endDate: string) => {
  if (endDate < beginDate) {
    let convert = parseInt(endDate.substring(0, 2)) + 12;
    endDate = `${convert}${endDate.substring(2, 4)}`;
  }
  return {
    beginDate: beginDate,
    endDate: endDate,
  }
}


export interface IResult {
  code: number;
  msg: string;
  data: any;
};
