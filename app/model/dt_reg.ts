
/* jshint indent: 2 */

module.exports = app => {
  const {
    STRING,
    DATE,
    INTEGER
  } = app.Sequelize;
  const dt_reg = app.model.define('dt_reg', {
    id: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    enterpriseNo: {
      field: 'enterpriseNo',
      type: STRING,
      primaryKey: true,
      allowNull: false,
    },
    enterpriseName: {
      field: 'enterpriseName',
      type: STRING,
      allowNull: true,
    },
    account: {
      field: 'account',
      type: STRING,
      allowNull: true
    },

    pwd: {
      field: 'pwd',
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
      tableName: 'dt_reg',
      freezeTableName: true, // Model 对应的表名将与model名相同
      timestamps: true,//去除createAt updateAt
    });
  return dt_reg;
};
