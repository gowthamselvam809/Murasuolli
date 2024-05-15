const { operatorRepository } = require('../repository');
const { isEmptyArray, formatErrorResponse, isEmptyObject } = require('../helper/util');


const fetchAllOperator = async (request) => {
    const operator = await operatorRepository.fetchAllOperator(request);
    return operator.map((ops) => ({ label: ops.MOpe_Name, value: ops.MOpe_Code }));
}

const userLogin = async (request) => {
    const dbUser = await operatorRepository.fetchOperatorById(request);
    if (!isEmptyObject(dbUser)) {
        if (dbUser.MOpe_Pwd !== request.password.toUpperCase()) {
            throw formatErrorResponse("Invalid Password")
        }
        return dbUser;
    }
    throw formatErrorResponse("User does Not exists...")
}

module.exports = {
    fetchAllOperator,
    userLogin
}