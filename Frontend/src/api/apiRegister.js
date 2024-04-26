import * as apiClient from "./httpCommon";
import { apiRoutes } from "../helper";

export const addUser = async (data) => (await apiClient.postAPICall(apiRoutes.addUser, data))?.data;
export const userLogin = async (data) => (await apiClient.postAPICall(apiRoutes.userLogin, data))?.data;
export const userRegister = async (data) => (await apiClient.postAPICall(apiRoutes.userRegister, data))?.data;
export const forgotPassword = async (data) => (await apiClient.postAPICall(apiRoutes.common.forgotPassword, data))?.data;
export const passwordReset = async (data) => (await apiClient.postAPICall(apiRoutes.common.passwordReset, data))?.data;
export const passwordResetOtp = async (data) => (await apiClient.postAPICall(apiRoutes.common.passwordResetOtp, data))?.data;
export const requestOtpForPasswordReset = async (data) => (await apiClient.postAPICall(apiRoutes.common.requestOtpForPasswordReset, data))?.data;
export const updateProfile = async (data) => (await apiClient.postAPICall(apiRoutes.profile.updateProfile, data))?.data;
export const getProfile = async (data) => (await apiClient.postAPICall(apiRoutes.profile.getProfile, data))?.data;
export const getAllUsers = async (data) => (await apiClient.postAPICall(apiRoutes.getAllUsers, data))?.data;
export const deleteUser = async (data) => (await apiClient.postAPICall(apiRoutes.deleteUser, data))?.data;
export const editUser = async (data) => (await apiClient.postAPICall(apiRoutes.editUser, data))?.data;
export const profileImageUrl = async (data) => (await apiClient.postAPICall(apiRoutes.profileImageUrl, data))?.data;


