const { Sequelize } = require('sequelize');

const initializeSequelize = (databaseName) => {
    console.log(`Initializing Sequelize for database: ${databaseName}`);
    const sequelize = new Sequelize(databaseName, 'sa', 'sa123', {
        host: 'DELL',
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: true,
                trustServerCertificate: true,
                requestTimeout: 60000
            }
        },

        logging: console.log
    });

    return sequelize;
}

module.exports = initializeSequelize;
