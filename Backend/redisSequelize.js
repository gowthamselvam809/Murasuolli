const { Sequelize } = require('sequelize');
const { getPrefixFromRedis } = require('./redis');

const getDatabaseName = async () => {
    const prefix = await getPrefixFromRedis('prefix');
    if (prefix) {
        return prefix + 'master';
    } else {
        return 'murmaster';
    }
};

const redisSequelize = async () => {
    const dbName = await getDatabaseName();
    const sequelize = new Sequelize(dbName, 'sa', 'sa123', {
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
};

module.exports = redisSequelize;
