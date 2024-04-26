const { PublishCommand } = require("@aws-sdk/client-sns");
const { sns } = require('../../awsConfig');
const { fortmatData } = require('../helper/util');

exports.process = async function (reqData) {
    let snsParams = {
        Message: JSON.stringify(reqData),
        MessageStructure: `String`,
        TopicArn: `arn:aws:sns:${process.env.REGION}:${process.env.ACCOUNT_NUMBER}:dev-template-send-email`
    };

    console.log(`SNS publish params : ${fortmatData(snsParams)}`);
    const data = await sns.send(new PublishCommand(snsParams));
    console.log("Success.", data.$metadata.httpStatusCode);
    return data.$metadata;
}