
/* jshint indent: 2 */

module.exports = app => {
  const {
    STRING,
    INTEGER
  } = app.Sequelize;
  const dt_user = app.platModel.define('dt_user', {
    user_serial: {
      type: INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      field: 'user_id',
      type: STRING,
      allowNull: true,
    },
  }, {
      tableName: 'dt_user',
      freezeTableName: true, // Model 对应的表名将与model名相同
      timestamps: false,//去除createAt updateAt
    });
  return dt_user;
};
