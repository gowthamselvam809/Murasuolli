const dynamoose = require("dynamoose");
const { v4: uuidv4 } = require('uuid');

const schema = new dynamoose.Schema(
    {
        "id": { type: String, default: () => uuidv4(), hashKey: true },
        "name": { type: String, required: true }
    },
    {
        "timestamps": true
    }
);

const BeamTestingModel = dynamoose.model("BeamTesting", schema, {
    create: true,
    throughput: "ON_DEMAND",
});

module.exports = BeamTestingModel;
