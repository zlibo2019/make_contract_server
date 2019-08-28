
/* jshint indent: 2 */

module.exports = app => {
  const {
    STRING,
    DATE
  } = app.Sequelize;
  const dt_contract = app.model.define('dt_contract', {
    // id: {
    //   type: INTEGER,
    //   allowNull: false,
    //   autoIncrement: true,
    // },
    contractNo: {
      field: 'contractNo',
      type: STRING,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      field: 'userId',
      type: STRING,
      allowNull: true,
    },
    userNo: {
      field: 'userNo',
      type: STRING,
      allowNull: true
    },

    userName: {
      field: 'userName',
      type: STRING,
      allowNull: true
    },
    userSex: {
      field: 'userSex',
      type: STRING,
      allowNull: true
    },
    userCard: {
      field: 'userCard',
      type: STRING,
      allowNull: true
    },
    userBirthday: {
      field: 'userBirthday',
      type: STRING,
      allowNull: true
    },
    userDepart: {
      field: 'userDepart',
      type: STRING,
      allowNull: true
    },

    userNation: {
      field: 'userNation',
      type: STRING,
      allowNull: true
    },
    userAddress: {
      field: 'userAddress',
      type: STRING,
      allowNull: true
    },
    userCensus: {
      field: 'userCensus',
      type: STRING,
      allowNull: true
    },
    skillsCertificateNo: {
      field: 'skillsCertificateNo',
      type: STRING,
      allowNull: true
    },
    userTelephone: {
      field: 'userTelephone',
      type: STRING,
      allowNull: true
    },
    months: {
      field: 'months',
      type: STRING,
      allowNull: true
    },
    dateWhichNo: {
      field: 'dateWhichNo',
      type: STRING,
      allowNull: true
    },
    contractBegin: {
      field: 'contractBegin',
      type: STRING,
      allowNull: true
    },
    contractEnd: {
      field: 'contractEnd',
      type: STRING,
      allowNull: true
    },
    qualifyingMonths: {
      field: 'qualifyingMonths',
      type: STRING,
      allowNull: true
    },
    qualifyingBegin: {
      field: 'qualifyingBegin',
      type: STRING,
      allowNull: true
    },
    qualifyingEnd: {
      field: 'qualifyingEnd',
      type: STRING,
      allowNull: true
    },
    contractBegin2: {
      field: 'contractBegin2',
      type: STRING,
      allowNull: true
    },
    qualifyingMonths2: {
      field: 'qualifyingMonths2',
      type: STRING,
      allowNull: true
    },
    qualifyingBegin2: {
      field: 'qualifyingBegin2',
      type: STRING,
      allowNull: true
    },
    qualifyingEnd2: {
      field: 'qualifyingEnd2',
      type: STRING,
      allowNull: true
    },
    projectName: {
      field: 'projectName',
      type: STRING,
      allowNull: true
    },
    userJob: {
      field: 'userJob',
      type: STRING,
      allowNull: true
    },
    jobContent: {
      field: 'jobContent',
      type: STRING,
      allowNull: true
    },
    jobPosition: {
      field: 'jobPosition',
      type: STRING,
      allowNull: true
    },
    salaryWhichNo: {
      field: 'salaryWhichNo',
      type: STRING,
      allowNull: true
    },
    workHoursOneDay: {
      field: 'workHoursOneDay',
      type: STRING,
      allowNull: true
    },
    workDaysOneWeek: {
      field: 'workDaysOneWeek',
      type: STRING,
      allowNull: true
    },
    salaryOneDay: {
      field: 'salaryOneDay',
      type: STRING,
      allowNull: true
    },
    qualityType: {
      field: 'qualityType',
      type: STRING,
      allowNull: true
    },
    openingBank: {
      field: 'openingBank',
      type: STRING,
      allowNull: true
    },
    userBankAccount: {
      field: 'userBankAccount',
      type: STRING,
      allowNull: true
    },
    signingDate: {
      field: 'signingDate',
      type: STRING,
      allowNull: true
    },
    extend1: {
      field: 'extend1',
      type: STRING,
      allowNull: true
    },
    extend2: {
      field: 'extend2',
      type: STRING,
      allowNull: true
    },
    extend3: {
      field: 'extend3',
      type: STRING,
      allowNull: true
    },
    extend4: {
      field: 'extend4',
      type: STRING,
      allowNull: true
    },
    extend5: {
      field: 'extend5',
      type: STRING,
      allowNull: true
    },
    extend6: {
      field: 'extend6',
      type: STRING,
      allowNull: true
    },
    extend7: {
      field: 'extend7',
      type: STRING,
      allowNull: true
    },
    extend8: {
      field: 'extend8',
      type: STRING,
      allowNull: true
    },
    extend9: {
      field: 'extend9',
      type: STRING,
      allowNull: true
    },
    extend10: {
      field: 'extend10',
      type: STRING,
      allowNull: true
    },
    extend11: {
      field: 'extend11',
      type: STRING,
      allowNull: true
    },
    extend12: {
      field: 'extend12',
      type: STRING,
      allowNull: true
    },
    extend13: {
      field: 'extend13',
      type: STRING,
      allowNull: true
    },
    extend14: {
      field: 'extend14',
      type: STRING,
      allowNull: true
    },
    extend15: {
      field: 'extend15',
      type: STRING,
      allowNull: true
    },
    extend16: {
      field: 'extend16',
      type: STRING,
      allowNull: true
    },
    extend17: {
      field: 'extend17',
      type: STRING,
      allowNull: true
    },
    extend18: {
      field: 'extend18',
      type: STRING,
      allowNull: true
    },
    extend19: {
      field: 'extend19',
      type: STRING,
      allowNull: true
    },
    extend20: {
      field: 'extend20',
      type: STRING,
      allowNull: true
    },
    extend21: {
      field: 'extend21',
      type: STRING,
      allowNull: true
    },
    extend22: {
      field: 'extend22',
      type: STRING,
      allowNull: true
    },
    extend23: {
      field: 'extend23',
      type: STRING,
      allowNull: true
    },
    extend24: {
      field: 'extend24',
      type: STRING,
      allowNull: true
    },
    extend25: {
      field: 'extend25',
      type: STRING,
      allowNull: true
    },
    extend26: {
      field: 'extend26',
      type: STRING,
      allowNull: true
    },
    extend27: {
      field: 'extend27',
      type: STRING,
      allowNull: true
    },
    extend28: {
      field: 'extend28',
      type: STRING,
      allowNull: true
    },
    extend29: {
      field: 'extend29',
      type: STRING,
      allowNull: true
    },
    extend30: {
      field: 'extend30',
      type: STRING,
      allowNull: true
    },
    createdAt: {
      field: 'createdAt',
      type: DATE,
      allowNull: true
    },
    updatedAt: {
      field: 'updatedAt',
      type: DATE,
      allowNull: true
    },
  }, {
      tableName: 'dt_contract',
      freezeTableName: true, // Model 对应的表名将与model名相同
      timestamps: true,//去除createAt updateAt
    });
  return dt_contract;
};
