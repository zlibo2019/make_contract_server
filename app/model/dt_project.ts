
/* jshint indent: 2 */

module.exports = app => {
  const {
    STRING,
    INTEGER
  } = app.Sequelize;
  const dt_project = app.model.define('dt_project', {
    id: {
      type: INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    project_bh: {
      field: 'project_bh',
      type: INTEGER,
      allowNull: true,
    },
    project_name: {
      field: 'project_name',
      type: STRING,
      allowNull: true,
    },
    gly_no: {
      field: 'gly_no',
      type: STRING,
      allowNull: true,
    },
  }, {
      tableName: 'dt_project',
      freezeTableName: true, // Model 对应的表名将与model名相同
      timestamps: false,//去除createAt updateAt
    });
  return dt_project;
};
