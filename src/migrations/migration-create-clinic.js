'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // statusId:DataTypes.STRING,
    // doctorId:DataTypes.INTEGER,
    // patienId:DataTypes.INTEGER,
    // date:DataTypes.DATE,
    // timeType:DataTypes.STRING,

    await queryInterface.createTable('clinics', {
      // id:DataTypes.STRING,
      // email: DataTypes.STRING,
      // firstName: DataTypes.STRING,
      // lastName: DataTypes.STRING,
      // address :DataTypes.STRING,
      // gender:DataTypes.BOOLEAN,
      // roleid:DataTypes.STRING,
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING
      },
      description:{
        type:Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('clinics');
  }
};