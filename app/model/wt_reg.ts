
/* jshint indent: 2 */

module.exports = app => {
  const {
    INTEGER,
    STRING,
  } = app.Sequelize;
  const wt_reg = app.model.define('wt_reg', {
    reg_serial: {
      type: INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    reg_no: {
      field: 'reg_no',
      type: STRING,
      allowNull: true,
    },
    reg_unit: {
      field: 'reg_unit',
      type: STRING,
      allowNull: true,
    },
  }, {
    tableName: 'wt_reg',
    freezeTableName: true, // Model 对应的表名将与model名相同
    timestamps: false,//去除createAt updateAt
  });
  return wt_reg;
};
