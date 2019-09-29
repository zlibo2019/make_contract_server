
/* jshint indent: 2 */

module.exports = app => {
  const {
    STRING,
    DATE,
    INTEGER
  } = app.Sequelize;
  const wt_gly = app.model.define('wt_gly', {
    id: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    gly_no: {
      field: 'gly_no',
      type: STRING,
      primaryKey: true,
      allowNull: false,
    },
    gly_name: {
      field: 'gly_name',
      type: STRING,
      allowNull: true,
    },
    gly_pass: {
      field: 'gly_pass',
      type: STRING,
      allowNull: true
    },
    gly_regserial: {
      field: 'gly_regserial',
      type: INTEGER,
      allowNull: true,
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
      tableName: 'wt_gly',
      freezeTableName: true, // Model 对应的表名将与model名相同
      timestamps: true,//去除createAt updateAt
    });
  return wt_gly;
};
