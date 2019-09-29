import { Service } from 'egg';
const fs = require('fs');
import { IResult } from '../extend/helper';


export default class CommonService extends Service {
  /**
   * # 删除文件
   */

  removeFile(filename) {
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

  deleteFolder(path) {
    let self = this;
    var files = [];
    if (fs.existsSync(path)) {
      if (fs.statSync(path).isDirectory()) {
        files = fs.readdirSync(path);
        files.forEach(function (file, index) {
          index;
          var curPath = path + "/" + file;
          if (fs.statSync(curPath).isDirectory()) {
            self.deleteFolder(curPath);
          } else {
            fs.unlinkSync(curPath);
          }
        });
        fs.rmdirSync(path);
      } else {
        fs.unlinkSync(path);
      }
    }
  }

  copyFolder(from, to) {        // 复制文件夹到指定目录
    let self = this;
    let files = [];
    if (fs.existsSync(to)) {           // 文件是否存在 如果不存在则创建
      files = fs.readdirSync(from);
      files.forEach(function (file, index) {
        index;
        var targetPath = from + "/" + file;
        var toPath = to + '/' + file;
        if (fs.statSync(targetPath).isDirectory()) { // 复制文件夹
          self.copyFolder(targetPath, toPath);
        } else {                                    // 拷贝文件
          fs.copyFileSync(targetPath, toPath);
        }
      });
    } else {
      fs.mkdirSync(to);
      self.copyFolder(from, to);
    }
  }

  // copy(src, dst) {
  //   let self = this;
  //   let paths = fs.readdirSync(src); //同步读取当前目录
  //   paths.forEach(function (path) {
  //     var _src = src + '/' + path;
  //     var _dst = dst + '/' + path;
  //     fs.stat(_src,   function (err, stats) { //stats 该对象 包含文件属性
  //       if (err) throw err;
  //       if (stats.isFile()) { //如果是个文件则拷贝
  //         let readable = fs.createReadStream(_src);//创建读取流
  //         let writable = fs.createWriteStream(_dst);//创建写入流
  //         readable.pipe(writable);
  //       } else if (stats.isDirectory()) { //是目录则 递归
  //          self.checkDirectory(_src, _dst, self.copy);
  //       }
  //     });
  //   });
  // }

  // // 复制目录
  //  checkDirectory(src, dst, callback) {
  //   // return new Promise((resolve) => {
  //     fs.access(dst, fs.constants.F_OK, (err) => {
  //       if (err) {
  //         fs.mkdirSync(dst);
  //          callback(src, dst);
  //       } else {
  //          callback(src, dst);
  //       }
  //       // resolve();
  //     });
  //   // })
  // };


  // const SOURCES_DIRECTORY = 'd:commonPrefab'; //源目录
  // checkDirectory(SOURCES_DIRECTORY, __dirname, copy);


  // // 复制文件夹
  // async exists(src, dst, callback) {
  //   return new Promise((resolve) => {
  //     //测试某个路径下文件是否存在
  //     fs.exists(dst, function (exists) {
  //       if (exists) {//不存在
  //         callback(src, dst).then((err) => {
  //           reject(err);
  //         })
  //       } else {//存在
  //         fs.mkdir(dst, function () {//创建目录
  //           callback(src, dst).then((err) => {
  //             reject(err);
  //           })
  //         })
  //       }
  //       resolve();
  //     })
  //   })
  // }

  // async copy(src, dst) {
  //   let self = this;
  //   //读取目录

  //   return new Promise((resolve, reject) => {
  //     fs.readdir(src, function (err, paths) {
  //       console.log(paths)
  //       if (err) {
  //         reject(err);
  //       }
  //       paths.forEach(function (path) {
  //         var _src = src + '/' + path;
  //         var _dst = dst + '/' + path;
  //         var readable;
  //         var writable;
  //         stat(_src, function (err, st) {
  //           if (err) {
  //             throw err;
  //           }

  //           if (st.isFile()) {
  //             readable = fs.createReadStream(_src);//创建读取流
  //             writable = fs.createWriteStream(_dst);//创建写入流
  //             readable.pipe(writable);
  //           } else if (st.isDirectory()) {
  //             self.exists(_src, _dst, self.copy);
  //           }
  //         });
  //       });
  //       resolve();
  //     });
  //   })
  // }
}