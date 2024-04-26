var dynamoose = require('dynamoose');
const { userRepository } = require('../repository');

const usersData = require('./dataFiles/user.json');

const dotenv = require("dotenv");

dotenv.config();

const ddb = new dynamoose.aws.ddb.DynamoDB({
    "credentials": {
        "accessKeyId": process.env.ACCESS_KEY_ID,
        "secretAccessKey": process.env.SECRET_ACCESS_KEY
    },
    "region": process.env.REGION
});

// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.ddb.set(ddb);

(async () => {
    await userRepository.createMany(usersData);
})();