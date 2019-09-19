
/* jshint indent: 2 */

module.exports = app => {
  const {
    STRING,
  } = app.Sequelize;
  const wt_gly = app.platModel.define('wt_gly', {
    gly_no: {
      type: STRING,
      primaryKey: true,
      allowNull: false,
    },
    gly_pass: {
      field: 'gly_pass',
      type: STRING,
      allowNull: true,
    },
    gly_lname: {
      field: 'gly_lname',
      type: STRING,
      allowNull: true,
    },
  }, {
      tableName: 'wt_gly',
      freezeTableName: true, // Model 对应的表名将与model名相同
      timestamps: false,//去除createAt updateAt
    });
  return wt_gly;
};
