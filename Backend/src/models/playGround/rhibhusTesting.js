var dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

const model = require('../userModel');
const { util } = require('../../helper');

const ddb = new dynamoose.aws.ddb.DynamoDB({
    "credentials": {
        "accessKeyId": "AKIAQREMEI3P6FAX67SB",
        "secretAccessKey": "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"
    },
    "region": "ap-south-1"
});

// Set DynamoDB instance to the Dynamoose DDB instance
dynamoose.aws.ddb.set(ddb);

//dynamoose.local(); // Use a local DynamoDB

const fortmatData = (data) => JSON.stringify(data, null, 2);

const create = async (request) => await model.create(request);

const createMany = async (items) => {
    let result = '';
    items = items.map(item => ({ id: util.isNullOrEmpty(item.id) ? () => uuidv4() : item.id, ...item }));
    for (var i = 0; i < items.length; i += size) {
        const res = await model.batchPut(items.slice(i, i + size));
        result += `${model} unprocessedItems: ${JSON.stringify(res, null, 2)}`;
    }
    return result;
};

const update = async (request) => {
    const { id, ...data } = request;
    return await model.update({ id }, { ...data });
}

const updateMany = async (items) => await model.batchPut(items);

const getById = async (id) => await model.get({ id });

const getByObject = async (object) => await model.query(object).exec();

const getByObjects = async (objects, attributes) => await model.batchGet(objects, attributes ? { attributes } : {}); // [1, 2]  or [{"id": 1}, {"id": 2}] or [{"id": 1, "name": "Tim"}, {"id": 2, "name": "Charlie"}]

const getAll = async () => await model.scan().exec();

const deleteById = async (id) => await model.delete({ id });

const deleteByObject = async (object) => await model.delete(object);

const deleteMany = async (objects) => await model.batchDelete(objects);

const query = async (request) => {
    const { property, filter } = request;

    return await model.query(property).eq(filter).exec();
};

const scan = async (object) => await model.scan(object).exec();

(async () => {
    // var res = await getAll();
    // var res = await getByObjects(["92c652e8-d5ac-4d78-bcba-d06e93cee362"]);
    var res = await getByObjects(["92c652e8-d5ac-4d78-bcba-d06e93cee362"], ["id", "firstName", "lastName", "schoolIds"]);
    // var res = await query({ property: "email", filter: email });
    console.log(fortmatData(res));
})();