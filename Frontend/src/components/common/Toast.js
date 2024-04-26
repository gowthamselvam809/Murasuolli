import { toast } from "react-toastify";

export const SucessToast = (msg) => { toast.success(msg, { autoClose: 5000 }) }
export const ErrorToast = (msg) => { toast.error(msg, { autoClose: 5000 }) }
export const WarningToast = (msg) => { toast.warning(msg, { autoClose: 5000 }) }