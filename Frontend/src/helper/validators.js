import * as Yup from "yup";
import { ErrorMessage } from "./message";
import { Common } from "./";

const SignupFormSchema = Yup.object().shape({
  email: Yup.string().email(ErrorMessage.INVALID_EMAIL).required(ErrorMessage.EMAIL_REQUIRED),
  password: Yup.string().required(ErrorMessage.PASSWORD_REQUIRED),
});

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().min(2, ErrorMessage.FIRST_NAME_MIN).max(30, ErrorMessage.FIRST_NAME_MAX).required(ErrorMessage.FIRST_NAME_IS_REQUIRED).trim(),
  lastName: Yup.string().min(2, ErrorMessage.LAST_NAME_MIN).max(30, ErrorMessage.LAST_NAME_MAX).required(ErrorMessage.LAST_NAME_IS_REQUIRED).trim(),
  phone: Yup.string().min(7, ErrorMessage.PHONE_NUMBER_MUST_BE_AT_LEAST_7_DIGIT).max(15, ErrorMessage.PHONE_NUMBER_MUST_BE_AT_MOST_15_DIGIT).required(ErrorMessage.PHONE_NUMBER_REQUIRED).trim(),
  email: Yup.string().matches(Common.EmailRegExp, ErrorMessage.INVALID_EMAIL).required(ErrorMessage.EMAIL_REQUIRED),
  city: Yup.string().required(ErrorMessage.CITY),
  password: Yup.string().matches(Common.PasswordRegExp, ErrorMessage.PASSWORD_INVALID).required(ErrorMessage.PASSWORD_REQUIRED),
});

const UpdateProfileSchema = Yup.object().shape({
  firstName: Yup.string().min(2, ErrorMessage.FIRST_NAME_MIN).max(30, ErrorMessage.FIRST_NAME_MAX).required(ErrorMessage.FIRST_NAME_IS_REQUIRED).trim(),
  lastName: Yup.string().min(2, ErrorMessage.LAST_NAME_MIN).max(30, ErrorMessage.LAST_NAME_MAX).required(ErrorMessage.LAST_NAME_IS_REQUIRED).trim(),
  phone: Yup.string().min(7, ErrorMessage.PHONE_NUMBER_MUST_BE_AT_LEAST_7_DIGIT).max(15, ErrorMessage.PHONE_NUMBER_MUST_BE_AT_MOST_15_DIGIT).required(ErrorMessage.PHONE_NUMBER_REQUIRED).trim(),
  email: Yup.string().matches(Common.EmailRegExp, ErrorMessage.INVALID_EMAIL).required(ErrorMessage.EMAIL_REQUIRED),
  city: Yup.string().required(ErrorMessage.CITY)
});

const AddUserSchema = Yup.object().shape({
  firstName: Yup.string().min(2, ErrorMessage.FIRST_NAME_MIN).max(30, ErrorMessage.FIRST_NAME_MAX).required(ErrorMessage.FIRST_NAME_IS_REQUIRED).trim(),
  lastName: Yup.string().min(2, ErrorMessage.LAST_NAME_MIN).max(30, ErrorMessage.LAST_NAME_MAX).required(ErrorMessage.LAST_NAME_IS_REQUIRED).trim(),
  phone: Yup.string().min(7, ErrorMessage.PHONE_NUMBER_MUST_BE_AT_LEAST_7_DIGIT).max(15, ErrorMessage.PHONE_NUMBER_MUST_BE_AT_MOST_15_DIGIT).required(ErrorMessage.PHONE_NUMBER_REQUIRED).trim(),
  email: Yup.string().matches(Common.EmailRegExp, ErrorMessage.INVALID_EMAIL).required(ErrorMessage.EMAIL_REQUIRED),
  city: Yup.string().required(ErrorMessage.CITY),
});

const EmailValidationSchema = Yup.object().shape({
  email: Yup.string().email(ErrorMessage.INVALID_EMAIL).required(ErrorMessage.EMAIL_REQUIRED),
});

const OtpValidationSchema = Yup.object().shape({
  otp: Yup.string().matches(Common.OtpRegExp, ErrorMessage.INVALID_OTP).required(ErrorMessage.OTP_REQUIRED),
});

const PasswordValidationSchema = Yup.object().shape({
  password: Yup.string().matches(Common.PasswordRegExp, ErrorMessage.PASSWORD_INVALID).required(ErrorMessage.PASSWORD_REQUIRED),
  confirmPassword: Yup.string().required(ErrorMessage.PASSWORD_INVALID)
});

export {
  SignupFormSchema,
  RegisterSchema,
  UpdateProfileSchema,
  AddUserSchema,
  EmailValidationSchema,
  OtpValidationSchema,
  PasswordValidationSchema
}