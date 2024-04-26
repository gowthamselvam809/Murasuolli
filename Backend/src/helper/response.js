const { util: { ERROR } } = require('./src/helper');

const getSuccessResponse = (info) => {
  return {
    statusCode: ERROR.OK,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      message: 'Request approved for performing operation',
      data: info,
      success: true,
    }),
  };
};

const getErrorResponse = (info) => {
  console.log(info);
  return {
    statusCode: info.statusCode || ERROR.INTERNAL_SERVER_ERROR,
    headers: {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(info),
  };
};

module.exports = { getSuccessResponse, getErrorResponse };
