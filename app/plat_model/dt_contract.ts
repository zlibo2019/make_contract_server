
/* jshint indent: 2 */

module.exports = app => {
  const {
    STRING,
    INTEGER
  } = app.Sequelize;
  const dt_contract = app.platModel.define('dt_contract', {
    xh: {
      type: INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    reg_serial: {
      field: 'reg_serial',
      type: STRING,
      allowNull: true,
    },
    lx:{
      field: 'lx',
      type: INTEGER,
      allowNull: true,
    },
    user_serial: {
      field: 'user_serial',
      type: STRING,
      allowNull: true,
    },
    contract_bh: {
      field: 'contract_bh',
      type: INTEGER,
      allowNull: true
    },
    contract_name: {
      field: 'contract_name',
      type: STRING,
      allowNull: true
    },

    contract_path: {
      field: 'contract_path',
      type: STRING,
      allowNull: true
    },
    is_show: {
      field: 'is_show',
      type: INTEGER,
      allowNull: true
    },
    sj: {
      field: 'sj',
      type: STRING,
      allowNull: true
    },
    sendStatus: {
      field: 'sendStatus',
      type: INTEGER,
      allowNull: true
    },
    pro_bh: {
      field: 'pro_bh',
      type: INTEGER,
      allowNull: true
    },
  }, {
      tableName: 'dt_contract',
      freezeTableName: true, // Model 对应的表名将与model名相同
      timestamps: false,//去除createAt updateAt
    });
  return dt_contract;
};
