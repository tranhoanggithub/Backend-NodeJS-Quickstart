'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.createTable('specialties', {
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
      image: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('specialties');
  }
};