const Url = {
  baseApiUrl: "http://localhost:3001/v1",
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
  getAllUsers: "/getAllUsers",
  deleteUser: "/deleteUser",
  editUser: "/editUser",
  profileImageUrl: "/profileImageUrl",
  common:{
    forgotPassword:"/forgotPassword",
    passwordResetOtp:"/userVerification",
    passwordReset:"/changePasswordById",
  }
}

export { Url, apiRoutes };