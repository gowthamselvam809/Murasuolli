import React, { useEffect, useState } from "react";

import { EmailField, OtpField, SetPassword } from ".";

import { Common, SessionStorageKeys, labels } from "../../helper";
import * as commonApi from "../../api/apiRegister";
import { SessionStorage, isEmptyObject } from "../../utils";

const ForgotPassword = () => {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isEmail, setIsEmail] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isOtp, setIsOtp] = useState();

  const verifyEmail = async () => {
    const forgotPassword_ = await commonApi.forgotPassword({ email: isEmail });
    if (forgotPassword_?.Items === Common.EMAIL_SENT) {
      setIsEmailVerified(true);
    } else {
      setIsEmailVerified(false)
    }
  }

  const verifyOtp = async () => {
    const otp_ = await commonApi.passwordResetOtp({ email: isEmail, otp: Number(isOtp) });
    if (!isEmptyObject(otp_?.Items)) {
      SessionStorage.setItem(SessionStorageKeys.SessionToken, otp_.Items.jwt);
      setIsOtpVerified(true);
    } else {
      setIsOtpVerified(false);
    }
  }

  useEffect(() => {
    (isEmail && !isOtp) && verifyEmail();
    (isEmail && isOtp) && verifyOtp();
  }, [isEmail, isOtp])
  return (
    <div className="formik-conatiner forgotPassword">
      <label className="label">{labels.RESET_PASSWORD}</label>
      {!isOtpVerified && <EmailField isEmailVerified={isEmailVerified} setIsEmailVerified={setIsEmailVerified} setIsEmail={setIsEmail} />}
      {isEmailVerified && !isOtpVerified && <OtpField isOtpVerified={isOtpVerified} setIsOtpVerified={setIsOtpVerified} setIsOtp={setIsOtp} />}
      {isOtpVerified && <SetPassword />}
    </div>
  )
}

export { ForgotPassword };