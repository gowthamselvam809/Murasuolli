let DBEnvPrefix = process.env.DB_PREFIX;
let DBNamePrefix = `${DBEnvPrefix}template_`;

// dynamoose.Table.defaults.set({
//     "prefix": DBNamePrefix
// });

exports.TABLE_NAMES = {
    USER_TABLE: `${DBNamePrefix}user`
}