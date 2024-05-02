const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('murmaster', 'sa', 'sa123', {
    host: 'DELL',
    dialect: 'mssql',
    dialectOptions: {
        options: {
            encrypt: true,
            trustServerCertificate: true
        }
    },
    logging: console.log
});

module.exports = sequelize;
