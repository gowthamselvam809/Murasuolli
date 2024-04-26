import React, { useCallback, useState } from "react";

import { LoginSocialGoogle, LoginSocialAmazon, LoginSocialFacebook, LoginSocialGithub, LoginSocialInstagram, LoginSocialLinkedin, LoginSocialMicrosoft, LoginSocialTwitter, LoginSocialApple } from "reactjs-social-login";
import { FacebookLoginButton, GoogleLoginButton, GithubLoginButton, AmazonLoginButton, InstagramLoginButton, LinkedInLoginButton, MicrosoftLoginButton, TwitterLoginButton, AppleLoginButton } from "react-social-login-buttons";

import { labels } from "../../helper";

const REDIRECT_URI = "http://localhost:3000/login";
// const REDIRECT_URI = "http://localhost:3000/account/login"
// Still working on this Component...
const SocialLoginPage = () => {
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState();

  const onLoginStart = useCallback(() => {
    console.log("login start");
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);

  // const onLogout = useCallback(() => { }, []);
  console.log({ provider });
  console.log({ profile });
  return (
    <>
      {/* {provider && profile && (
                <User provider={provider} profile={profile} onLogout={onLogout} />
      )} */}
      <label className="social-login-label">{labels.SOCIAL_LOG_IN}</label>
      <div className="social-login-contaniner">
        <LoginSocialFacebook
          appId={"1061076851658763" || ""}
          // fieldsProfile={"id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"}
          onLoginStart={onLoginStart}
          onLogoutSuccess={onLogoutSuccess}
          onResolve={({ provider, data }) => {
            setProvider(provider);
            setProfile(data);
          }}
          onReject={(err) => {
            console.log(err)
          }}
        >
          <FacebookLoginButton />
        </LoginSocialFacebook>

        <LoginSocialGoogle
          client_id={"556700582933-rddvpff82hranr0io31podm26trc75j9.apps.googleusercontent.com" || ""}
          onLoginStart={onLoginStart}
          fetch_basic_profile={true}
          redirect_uri={REDIRECT_URI}
          onResolve={({ provider, data }) => {
            setProvider(provider);
            setProfile(data);
          }}
          onReject={err => {
            console.log(err);
          }}
        >
          <GoogleLoginButton />
        </LoginSocialGoogle>

        <LoginSocialApple
          client_id={process.env.REACT_APP_APPLE_ID || ""}
          scope={"name email"}
          redirect_uri={REDIRECT_URI}
          onLoginStart={onLoginStart}
          onResolve={({ provider, data }) => {
            setProvider(provider);
            setProfile(data);
          }}
          onReject={err => {
            console.log(err);
          }}
        >
          <AppleLoginButton />
        </LoginSocialApple>

        <LoginSocialAmazon
          client_id={process.env.REACT_APP_AMAZON_APP_ID || ""}
          redirect_uri={REDIRECT_URI}
          onResolve={({ provider, data }) => {
            setProvider(provider);
            setProfile(data);
          }}
          onReject={(err) => {
            console.log(err);
          }}
          onLoginStart={onLoginStart}
        >
          <AmazonLoginButton />
        </LoginSocialAmazon>

        <LoginSocialInstagram
          client_id={process.env.REACT_APP_INSTAGRAM_APP_ID || ""}
          client_secret={process.env.REACT_APP_INSTAGRAM_APP_SECRET || ""}
          redirect_uri={REDIRECT_URI}
          onLoginStart={onLoginStart}
          onLogoutSuccess={onLogoutSuccess}
          onResolve={({ provider, data }) => {
            setProvider(provider);
            setProfile(data);
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <InstagramLoginButton />
        </LoginSocialInstagram>

        <LoginSocialMicrosoft
          client_id={process.env.REACT_APP_MICROSOFT_APP_ID || ""}
          redirect_uri={REDIRECT_URI}
          onLoginStart={onLoginStart}
          onResolve={({ provider, data }) => {
            setProvider(provider);
            setProfile(data);
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <MicrosoftLoginButton />
        </LoginSocialMicrosoft>

        <LoginSocialLinkedin
          client_id={process.env.REACT_APP_LINKEDIN_APP_ID || ""}
          client_secret={process.env.REACT_APP_LINKEDIN_APP_SECRET || ""}
          redirect_uri={REDIRECT_URI}
          onLoginStart={onLoginStart}
          onResolve={({ provider, data }) => {
            setProvider(provider);
            setProfile(data);
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <LinkedInLoginButton />
        </LoginSocialLinkedin>

        <LoginSocialGithub
          client_id={process.env.REACT_APP_GITHUB_APP_ID || ""}
          client_secret={process.env.REACT_APP_GITHUB_APP_SECRET || ""}
          redirect_uri={REDIRECT_URI}
          onLoginStart={onLoginStart}
          onLogoutSuccess={onLogoutSuccess}
          onResolve={({ provider, data }) => {
            setProvider(provider);
            setProfile(data);
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <GithubLoginButton />
        </LoginSocialGithub>
        {/* <LoginSocialPinterest
                    client_id={process.env.REACT_APP_PINTEREST_APP_ID || ""}
                    client_secret={process.env.REACT_APP_PINTEREST_APP_SECRET || ""}
                    redirect_uri={REDIRECT_URI}
                    onLoginStart={onLoginStart}
                    onResolve={({ provider, data }) => {
                        setProvider(provider);
                        setProfile(data);
                    }}
                    onReject={(err) => {
                        console.log(err);
                    }}
                    className="pinterest-btn"
                >
                    <div className="content">
                        <div className="icon">
                        </div>
                        <span className="txt">Login With Pinterest</span>
                    </div>
                </LoginSocialPinterest> */}

        <LoginSocialTwitter
          client_id={process.env.REACT_APP_TWITTER_V2_APP_KEY || ""}
          // client_secret={process.env.REACT_APP_TWITTER_V2_APP_SECRET || ""}
          redirect_uri={REDIRECT_URI}
          onLoginStart={onLoginStart}
          onLogoutSuccess={onLogoutSuccess}
          onResolve={({ provider, data }) => {
            setProvider(provider);
            setProfile(data);
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <TwitterLoginButton />
        </LoginSocialTwitter>
      </div>
    </>
  );
};

export { SocialLoginPage };