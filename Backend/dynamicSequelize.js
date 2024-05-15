const { Sequelize } = require('sequelize');

const initializeSequelize = (databaseName) => {
    const sequelize = new Sequelize(databaseName, 'sa', 'sa123', {
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

    return sequelize;
}

module.exports = initializeSequelize;
