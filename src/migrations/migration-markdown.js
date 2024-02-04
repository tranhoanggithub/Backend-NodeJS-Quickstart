'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        // statusId:DataTypes.STRING,
        // doctorId:DataTypes.INTEGER,
        // patienId:DataTypes.INTEGER,
        // date:DataTypes.DATE,
        // timeType:DataTypes.STRING,

        await queryInterface.createTable('markdowns', {
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
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            contentHTML: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },
            contentMarkdown: {
                allowNull: false,
                type: Sequelize.TEXT('long')
            },
            description: {
                allowNull: true,
                type: Sequelize.TEXT('long')
            },
            doctorId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            specialtyId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            clinicId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('markdowns');
    }
};