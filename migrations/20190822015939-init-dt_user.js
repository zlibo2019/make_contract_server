'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const {
      STRING,
    } = Sequelize;
    return queryInterface.createTable('dt_user', {
      id: Sequelize.INTEGER,
      userNo: {
        type: STRING,
        allowNull: true,
      },
      userId: {
        type: STRING,
        allowNull: true,
      },
      userName: {
        type: STRING,
        allowNull: true,
      },
      userSex: {
        type: STRING,
        allowNull: true,
      },
      userCard: {
        type: STRING,
        allowNull: true,
      },
      userBirthday: {
        type: STRING,
        allowNull: true,
      },
      userDepart: {
        type: STRING,
        allowNull: true,
      },
      userNation: {
        type: STRING,
        allowNull: true,
      },
      userAddress: {
        type: STRING,
        allowNull: true,
      },
      userCensus: {
        type: STRING,
        allowNull: true,
      },
      skillsCertificateNo: {
        type: STRING,
        allowNull: true,
      },
      userTelephone: {
        type: STRING,
        allowNull: true,
      },
      dateWhichNo: {
        type: STRING,
        allowNull: true,
      },
      contractBegin: {
        type: STRING,
        allowNull: true,
      },
      contractEnd: {
        type: STRING,
        allowNull: true,
      },
      qualifyingMonths: {
        type: STRING,
        allowNull: true,
      },
      qualifyingBegin: {
        type: STRING,
        allowNull: true,
      },
      qualifyingEnd: {
        type: STRING,
        allowNull: true,
      },
      contractBegin2: {
        type: STRING,
        allowNull: true,
      },
      qualifyingMonths2: {
        type: STRING,
        allowNull: true,
      },
      qualifyingBegin2: {
        type: STRING,
        allowNull: true,
      },
      qualifyingEnd2: {
        type: STRING,
        allowNull: true,
      },
      projectName: {
        type: STRING,
        allowNull: true,
      },
      userJob: {
        type: STRING,
        allowNull: true,
      },
      jobContent: {
        type: STRING,
        allowNull: true,
      },
      jobPosition: {
        type: STRING,
        allowNull: true,
      },
      salaryWhichNo: {
        type: STRING,
        allowNull: true,
      },
      workHoursOneDay: {
        type: STRING,
        allowNull: true,
      },
      workDaysOneWeek: {
        type: STRING,
        allowNull: true,
      },
      salaryOneDay: {
        type: STRING,
        allowNull: true,
      },
      qualityType: {
        type: STRING,
        allowNull: true,
      },
      openingBank: {
        type: STRING,
        allowNull: true,
      },
      userBankAccount: {
        type: STRING,
        allowNull: true,
      },
      signingDate: {
        type: STRING,
        allowNull: true,
      },
      extend1: {
        type: STRING,
        allowNull: true,
      },
      extend2: {

        type: STRING,
        allowNull: true,
      },
      extend3: {

        type: STRING,
        allowNull: true,
      },
      extend4: {

        type: STRING,
        allowNull: true,
      },
      extend5: {

        type: STRING,
        allowNull: true,
      },
      extend6: {

        type: STRING,
        allowNull: true,
      },
      extend7: {

        type: STRING,
        allowNull: true,
      },
      extend8: {

        type: STRING,
        allowNull: true,
      },
      extend9: {

        type: STRING,
        allowNull: true,
      },
      extend10: {

        type: STRING,
        allowNull: true,
      },
      extend11: {

        type: STRING,
        allowNull: true,
      },
      extend12: {

        type: STRING,
        allowNull: true,
      },
      extend13: {

        type: STRING,
        allowNull: true,
      },
      extend14: {

        type: STRING,
        allowNull: true,
      },
      extend15: {

        type: STRING,
        allowNull: true,
      },
      extend16: {

        type: STRING,
        allowNull: true,
      },
      extend17: {

        type: STRING,
        allowNull: true,
      },
      extend18: {

        type: STRING,
        allowNull: true,
      },
      extend19: {

        type: STRING,
        allowNull: true,
      },
      extend20: {

        type: STRING,
        allowNull: true,
      },
      extend21: {

        type: STRING,
        allowNull: true,
      },
      extend22: {

        type: STRING,
        allowNull: true,
      },
      extend23: {

        type: STRING,
        allowNull: true,
      },
      extend24: {

        type: STRING,
        allowNull: true,
      },
      extend25: {

        type: STRING,
        allowNull: true,
      },
      extend26: {

        type: STRING,
        allowNull: true,
      },
      extend27: {

        type: STRING,
        allowNull: true,
      },
      extend28: {

        type: STRING,
        allowNull: true,
      },
      extend29: {

        type: STRING,
        allowNull: true,
      },
      extend30: {

        type: STRING,
        allowNull: true,
      },
    });

  },

};
