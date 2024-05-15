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

export const fetchAllAgent = async (data) => (await apiClient.postAPICall(apiRoutes.fetchAllAgent, data))?.data;
export const fetchAllState = async (data) => (await apiClient.postAPICall(apiRoutes.fetchAllState, data))?.data;
export const fetchAllDistrict = async (data) => (await apiClient.postAPICall(apiRoutes.fetchAllDistrict, data))?.data;
export const addAgent = async (data) => (await apiClient.postAPICall(apiRoutes.addAgent, data))?.data;
export const updateAgent = async (data) => (await apiClient.postAPICall(apiRoutes.updateAgent, data))?.data;
export const deleteAgent = async (data) => (await apiClient.postAPICall(apiRoutes.deleteAgent, data))?.data;
export const fetchAllMagazine = async (data) => (await apiClient.postAPICall(apiRoutes.fetchAllMagazine, data))?.data;
export const updateMagazine = async (data) => (await apiClient.postAPICall(apiRoutes.updateMagazine, data))?.data;
export const deleteMagazine = async (data) => (await apiClient.postAPICall(apiRoutes.deleteMagazine, data))?.data;
export const createMagazine = async (data) => (await apiClient.postAPICall(apiRoutes.createMagazine, data))?.data;
export const fetchAllBankType = async (data) => (await apiClient.postAPICall(apiRoutes.fetchAllBankType, data))?.data;
export const fetchAllReason = async (data) => (await apiClient.postAPICall(apiRoutes.fetchAllReason, data))?.data;
export const updateReason = async (data) => (await apiClient.postAPICall(apiRoutes.updateReason, data))?.data;
export const createReason = async (data) => (await apiClient.postAPICall(apiRoutes.createReason, data))?.data;
export const fetchAllCopyConfirm = async (data) => (await apiClient.postAPICall(apiRoutes.fetchAllCopyConfirm, data))?.data;
export const createCopyConfirm = async (data) => (await apiClient.postAPICall(apiRoutes.createCopyConfirm, data))?.data;
export const updateCopyConfirm = async (data) => (await apiClient.postAPICall(apiRoutes.updateCopyConfirm, data))?.data;
export const fetchAllCommission = async (data) => (await apiClient.postAPICall(apiRoutes.fetchAllCommission, data))?.data;
export const createCommission = async (data) => (await apiClient.postAPICall(apiRoutes.createCommission, data))?.data;
export const updateCommission = async (data) => (await apiClient.postAPICall(apiRoutes.updateCommission, data))?.data;
export const createState = async (data) => (await apiClient.postAPICall(apiRoutes.createState, data))?.data;
export const updateState = async (data) => (await apiClient.postAPICall(apiRoutes.updateState, data))?.data;
export const updateDistrict = async (data) => (await apiClient.postAPICall(apiRoutes.updateDistrict, data))?.data;
export const createDistrict = async (data) => (await apiClient.postAPICall(apiRoutes.createDistrict, data))?.data;
export const fetchIssuesBasedOnDate = async (data) => (await apiClient.postAPICall(apiRoutes.fetchIssuesBasedOnDate, data))?.data;
export const insertIssues = async (data) => (await apiClient.postAPICall(apiRoutes.insertIssues, data))?.data;
export const fetchMaxIssDate = async (data) => (await apiClient.postAPICall(apiRoutes.fetchMaxIssDate, data))?.data;
export const fetchEditIssuesByDate = async (data) => (await apiClient.postAPICall(apiRoutes.fetchEditIssuesByDate, data))?.data;
export const updateIssueCopy = async (data) => (await apiClient.postAPICall(apiRoutes.updateIssueCopy, data))?.data;
export const fetchAllCompanies = async (data) => (await apiClient.postAPICall(apiRoutes.fetchAllCompanies, data))?.data;
export const fetchAllFinancialYear = async (data) => (await apiClient.postAPICall(apiRoutes.fetchAllFinancialYear, data))?.data;
export const fetchAllOperator = async (data) => (await apiClient.postAPICall(apiRoutes.fetchAllOperator, data))?.data;

export const getAllUsers = async (data) => (await apiClient.postAPICall(apiRoutes.getAllUsers, data))?.data;
export const deleteUser = async (data) => (await apiClient.postAPICall(apiRoutes.deleteUser, data))?.data;
export const editUser = async (data) => (await apiClient.postAPICall(apiRoutes.editUser, data))?.data;
export const profileImageUrl = async (data) => (await apiClient.postAPICall(apiRoutes.profileImageUrl, data))?.data;


