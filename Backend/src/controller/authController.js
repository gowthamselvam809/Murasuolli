let { baseController } = require("./genericController");

const authService = require(`../services/authService`);

const { util: { ERROR } } = require("../helper");
const { KeyWords, Messages } = require("../constants/constant");

baseController = baseController(authService);

const googleSignInForWeb = async (req, res, next) => {
  try {
    const request = req.body;
    const googleSignInForWeb_res = await authService.googleSignInForWeb(request);
    console.log(`C :: Signed Up Process Initiated successfully ...`);
    res.json({ status: 200, data: googleSignInForWeb_res });
  } catch (error) {
    next(error);
  }
};

const googleSignInforWebRedirect = async (req, res, next) => {
  try {
    console.log("googleSignInForWebAndRedirect api called");

    const request = req.query;

    const googleSignInForWebAndRedirect_res = await authService.googleSignInforWebRedirect(request);
    const response = JSON.stringify(googleSignInForWebAndRedirect_res[0].response);

    if (googleSignInForWebAndRedirect_res[0].redirect) {
      switch (socialSignInRedirectGoogleMobile_res[0].param) {
        case KeyWords.VERIFIED:
          return res.redirect(`${process.env.FRONTEND_URL}/home?response=${response}`);
        case KeyWords.NOT_VERIFIED:
          return res.redirect(`${process.env.FRONTEND_URL}/otpPage?response=${response}`);
        case KeyWords.FACEBOOK_USER:
          return res.redirect(`${process.env.FRONTEND_URL}/?response=${response}`);
        case KeyWords.TWITTER_USER:
          return res.redirect(`${process.env.FRONTEND_URL}/?response=${response}`);
        case KeyWords.NEW_USER:
          return res.redirect(`${process.env.FRONTEND_URL}/socialLogin?response=${response}`);
        default:
          console.log(`C :: Signed In Via Google failed...`);
      }
      console.log(`C :: Signed In Via Google successful...`);
    } else {
      switch (googleSignInForWebAndRedirect_res[0].param) {
        case KeyWords.NOT_VERIFIED:
          return res.redirect(`${process.env.FRONTEND_URL}/otpPage?response=${response}`);
        case KeyWords.INVALID_USER:
          return res.redirect(`${process.env.FRONTEND_URL}/?response=${response}`);
        case KeyWords.NORMAL_USER:
          return res.redirect(`${process.env.FRONTEND_URL}/?response=${response}`);
        default:
          return {}
      }
    }
  } catch (error) {
    console.log("error: ", error);
    return { status: ERROR.MOVED_TEMPORARILY, body: 'Redirecting...', headers: { location: `${process.env.FRONTEND_URL}/LoginPage?response=${{ response: Messages.ERROR_IN_SOCIAL_LOGIN }}` } };

  }
};

const googleSignInforMobile = async (req, res, next) => {
  try {
    const request = req.body;
    let result = await authService.googleSignInforMobile(request);
    return formatResponseForOAuth(result)
  } catch (error) {
    next(error);
  }
};

const googleSignInforMobileRedirect = (req, res, next) => {
  console.log("googleSignInforMobileRedirectMobile api called");

  let request = req.query;

  authService.googleSignInforMobileRedirect(request, function (socialSignInRedirectGoogleMobile_err, socialSignInRedirectGoogleMobile_res) {
    if (socialSignInRedirectGoogleMobile_err) {
      res.redirect(`${process.env.FRONTEND_URL}/?response=${{ response: Messages.ERROR_IN_SOCIAL_LOGIN }}`);
    } else {
      let response = JSON.stringify(socialSignInRedirectGoogleMobile_res[0].response);

      if (socialSignInRedirectGoogleMobile_res[0].redirect) {

        switch (socialSignInRedirectGoogleMobile_res[0].param) {
          case KeyWords.VERIFIED:
            return res.redirect(`${process.env.FRONTEND_URL}/home?response=${response}`);
          case KeyWords.NOT_VERIFIED:
            return res.redirect(`${process.env.FRONTEND_URL}/otpPage?response=${response}`);
          case KeyWords.FACEBOOK_USER:
            return res.redirect(`${process.env.FRONTEND_URL}/?response=${response}`);
          case KeyWords.TWITTER_USER:
            return res.redirect(`${process.env.FRONTEND_URL}/?response=${response}`);
          case KeyWords.NEW_USER:
            return res.redirect(`${process.env.FRONTEND_URL}/socialLogin?response=${response}`);
          default:
            console.log(`C :: Signed In Via Google failed...`);
        }
        console.log(`C :: Signed In Via Google successful...`);
      } else {

        switch (socialSignInRedirectGoogleMobile_res[0].param) {
          case KeyWords.NOT_VERIFIED:
            return res.redirect(`${process.env.FRONTEND_URL}/otpPage?response=${response}`);
          case KeyWords.INVALID_USER:
            return res.redirect(`${process.env.FRONTEND_URL}/?response=${response}`);
          case KeyWords.NORMAL_USER:
            return res.redirect(`${process.env.FRONTEND_URL}/?response=${response}`);
          default:
            return {}
        }
      }
    }
  });
};

module.exports = {

  googleSignInforMobile,
  googleSignInforMobileRedirect,
  googleSignInForWeb,
  googleSignInforWebRedirect

}
