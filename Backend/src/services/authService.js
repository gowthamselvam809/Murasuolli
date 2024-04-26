const { userService } = require('../services');

const { userRepository } = require('../repository');

const { googleGetApiCallWithUrl, googlePostApiCallWithUrl } = require('../api')
const { apiHelper, apiRoutes: { Url }, jwt, util: { getRandomOtp, getCurrentTimestamp, isEmptyArray } } = require('../helper')
const { constant: { emailTemplatePaths, KeyWords, OAUTHRedirectEndpoint, Messages, Roles, SocialLogin } } = require('../constants');

const googleSignInForWeb = async (request) => {
    request[`redirectionEndpoint`] = OAUTHRedirectEndpoint.GoogleSignInForWeb;
    let url = await apiHelper.googleSignIn(request)
    return { redirectUrl: url };
}

const googleSignInforWebRedirect = async (request) => {
    let queryParam = 'code=' + request.code + '&redirect_uri=' + process.env.SERVER_URL + OAUTHRedirectEndpoint.GoogleSignInForWeb + '&client_id=' + process.env.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY + '&client_secret=' + process.env.SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET + '&scope=&grant_type=authorization_code';
    let url = Url.googleApiToken + "?" + queryParam;

    try {
        let googleOAuthPostResponse = await googlePostApiCallWithUrl(url);

        try {
            let googleOAuthGetResponse = await googleGetApiCallWithUrl(Url.googleApiUserInfo.replace('**userInfo**', googleOAuthPostResponse.access_token));

            // Add user data
            let user = {
                firstName: googleOAuthGetResponse.given_name,
                lastName: googleOAuthGetResponse.family_name,
                email: googleOAuthGetResponse.email.toLowerCase(),
                subId: googleOAuthGetResponse.sub,
                type: Roles.User,
                isSocial: true,
                provider: SocialLogin.Google
            }
            const _user = await userRepository.getByEmail(googleOAuthGetResponse.email);

            if (!isEmptyArray(_user)) {
                if (_user[0].isSocial) {
                    if (_user[0].provider === SocialLogin.Google) {

                        if (_user[0].isVerified) {
                            return [{ redirect: true, response: { token: await jwt.jwtSign(_user[0]), userId: _user[0].id, type: _user[0].type }, param: KeyWords.VERIFIED }]

                        } else {
                            _user[0].otp = getRandomOtp();

                            const newUser = await userRepository.update(_user[0]);
                            const emailSentSuccessfully = await userService.sendOtpMail(newUser, emailTemplatePaths.otpForAccountRegisterTemplate)

                            if (emailSentSuccessfully) {
                                return [{ redirect: true, response: { userId: newUser.id, email: newUser.email }, param: KeyWords.NOT_VERIFIED }]
                            } else {
                                return [{ redirect: false, response: { userId: newUser.id, email: newUser.email, error: Messages.OTP_ERROR }, param: KeyWords.NOT_VERIFIED }]
                            }
                        }
                    } else {
                        if (_user[0].provider = SocialLogin.Facebook) {
                            return [{ redirect: true, response: Messages.FACEBOOK_USER_ALREADY_EXISTS, param: KeyWords.FACEBOOK_USER }]
                        } else if (_user[0].provider = SocialLogin.Twitter) {
                            return [{ redirect: true, response: Messages.TWITTER_USER_ALREADY_EXISTS, param: KeyWords.TWITTER_USER }]
                        } else {
                            return [{ redirect: false, response: Messages.INVALID_PROVIDER, param: KeyWords.INVALID_USER }]
                        }
                    }
                } else {
                    return [{ redirect: false, response: Messages.NORMAL_USER_ALREADY_EXISTS, param: KeyWords.INVALID_USER }];
                }
            } else {
                const newUser = await userRepository.create(user);
                return [{ redirect: true, response: newUser, param: KeyWords.NEW_USER }];
            }
        } catch (error) {
            console.log("error : ", error);
            return error
        }

    } catch (error) {
        console.log("error is here : ", error);
        return error;
    }
}


const googleSignInforMobile = async (request) => {
    request[`redirectionEndpoint`] = OAUTHRedirectEndpoint.GoogleSignInForMobile;
    let url = await apiHelper.googleSignIn(request)
    return { redirectUrl: url };
}

const googleSignInforMobileRedirect = async function (request) {

    let queryParam = 'code=' + request.code + '&redirect_uri=' + process.env.SERVER_URL + OAUTHRedirectEndpoint.GoogleSignInForMobile + '&client_id=' + process.env.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY + '&client_secret=' + process.env.SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET + '&scope=&grant_type=authorization_code';
    let url = Url.googleApiToken + "?" + queryParam;

    try {
        let googleOAuthPostResponse = await googlePostApiCallWithUrl(url);

        try {
            let googleOAuthGetResponse = await googleGetApiCallWithUrl(Url.googleApiUserInfo.replace('**userInfo**', googleOAuthPostResponse.access_token));

            // Add user data
            let user = {
                firstName: googleOAuthGetResponse.given_name,
                lastName: googleOAuthGetResponse.family_name,
                email: googleOAuthGetResponse.email.toLowerCase(),
                subId: googleOAuthGetResponse.sub,
                type: Roles.User,
                isSocial: true,
                provider: SocialLogin.Google,
                createdAt: await getCurrentTimestamp(),
                updatedAt: await getCurrentTimestamp()
            }

            const _user = await userRepository.getByEmail(googleOAuthGetResponse.email);

            if (!isEmptyArray(_user)) {
                if (_user[0].isSocial) {
                    if (_user[0].provider === SocialLogin.Google) {

                        if (_user[0].isVerified) {
                            return [{ redirect: true, response: { token: await jwt.jwtSign(_user[0]), userId: _user[0].id, type: _user[0].type }, param: KeyWords.VERIFIED }]
                        } else {
                            _user[0].otp = await getRandomOtp();
                            _user[0].updatedAt = await getCurrentTimestamp();

                            const newUser = await userRepository.update(_user[0]);
                            const emailSentSuccessfully = await userService.sendOtpMail(newUser, emailTemplatePaths.otpForAccountRegisterTemplate)

                            if (emailSentSuccessfully) {
                                return [{ redirect: true, response: { userId: newUser.id, email: newUser.email }, param: KeyWords.NOT_VERIFIED }]
                            } else {
                                return [{ redirect: false, response: { userId: newUser.id, email: newUser.email, error: Messages.OTP_ERROR }, param: KeyWords.NOT_VERIFIED }]
                            }
                        }
                    } else {
                        if (_user[0].provider = SocialLogin.Facebook) {
                            return [{ redirect: true, response: Messages.FACEBOOK_USER_ALREADY_EXISTS, param: KeyWords.FACEBOOK_USER }]
                        } else if (_user[0].provider = SocialLogin.Twitter) {
                            return [{ redirect: true, response: Messages.TWITTER_USER_ALREADY_EXISTS, param: SocialLogin.TWITTER_USER }]
                        } else {
                            return [{ redirect: false, response: Messages.INVALID_PROVIDER, param: KeyWords.INVALID_USER }]
                        }
                    }
                } else {
                    return [{ redirect: false, response: Messages.NORMAL_USER_ALREADY_EXISTS, param: KeyWords.NORMAL_USER }];
                }
            } else {
                const newUser = await userRepository.create(user);
                return [{ redirect: true, response: newUser, param: KeyWords.NEW_USER }];
            }
        } catch (error) {
            console.log("error : ", error);
            return error
        }

    } catch (error) {
        console.log("error is here : ", error);
        return error;
    }
}

module.exports = {

    googleSignInforMobile,
    googleSignInforMobileRedirect,
    googleSignInForWeb,
    googleSignInforWebRedirect
}

