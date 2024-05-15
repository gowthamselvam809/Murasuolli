const Url = {
  baseApiUrl: "http://localhost:3001/",
  // baseApiUrl: "https://znkm0f852h.execute-api.ap-south-1.amazonaws.com/dev/v1",
  // baseApiUrl: process.env.REACT_APP_LAMBDA_URL,
  logoUrl: "https://rhibhus.com/static/media/RhibhusLogos.b4105cfac9319d6b423234e5491599be.svg"
}


const apiRoutes = {
  addUser: "/addUser",
  userLogin: "/userLogin",
  userRegister: "/userRegister",
  profile: {
    getProfile: "/getProfile",
    updateProfile: "/updateProfile"
  },
  getAllUsers: '/getAllUsers',
  fetchAllState: '/fetchAllState',
  fetchAllAgent: "/fetchAllAgent",
  fetchAllDistrict: "/fetchAllDistrict",
  deleteUser: "/deleteUser",
  editUser: "/editUser",
  profileImageUrl: "/profileImageUrl",
  common: {
    forgotPassword: "/forgotPassword",
    passwordResetOtp: "/userVerification",
    passwordReset: "/changePasswordById",
  },
  addAgent: "/addAgent",
  updateAgent: "/updateAgent",
  deleteAgent: "/deleteAgent",
  fetchAllMagazine: "/fetchAllMagazine",
  updateMagazine: "/updateMagazine",
  deleteMagazine: "/deleteMagazine",
  createMagazine: "/createMagazine",
  fetchAllBankType: "/fetchAllBankType",
  fetchAllReason: "/fetchAllReason",
  updateReason: "/updateReason",
  createReason: "/createReason",
  fetchAllCopyConfirm: "/fetchAllCopyConfirm",
  updateCopyConfirm: "/updateCopyConfirm",
  createCopyConfirm: "/createCopyConfirm",
  fetchAllCommission: "/fetchAllCommission",
  createCommission: "/createCommission",
  updateCommission: "/updateCommission",
  updateState: "/updateState",
  createState: "/createState",
  createDistrict: "/createDistrict",
  updateDistrict: "/updateDistrict",
  fetchIssuesBasedOnDate: "/fetchIssuesBasedOnDate",
  insertIssues: "/insertIssues",
  fetchMaxIssDate: "/fetchMaxIssDate",
  fetchEditIssuesByDate: "/fetchEditIssuesByDate",
  updateIssueCopy: "/updateIssueCopy",
  fetchAllCompanies: "/fetchAllCompanies",
  fetchAllFinancialYear: "/fetchAllFinancialYear",
  fetchAllOperator: "/fetchAllOperator",
}

export { Url, apiRoutes };