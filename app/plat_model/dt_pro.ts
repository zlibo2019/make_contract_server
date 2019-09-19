
/* jshint indent: 2 */

module.exports = app => {
  const {
    STRING,
    INTEGER
  } = app.Sequelize;
  const dt_pro = app.platModel.define('dt_pro', {
    bh: {
      type: INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    pro_mj: {
      field: 'pro_mj',
      type: STRING,
      allowNull: true,
    },
  }, {
      tableName: 'dt_pro',
      freezeTableName: true, // Model 对应的表名将与model名相同
      timestamps: false,//去除createAt updateAt
    });
  return dt_pro;
};
