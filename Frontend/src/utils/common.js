import { httpsStatus } from "../helper";

const ImageValidation = (file) => {
  switch (file.type) {
  case "image/jpeg": case "image/png": return true;
  default: return false
  }
}

const UploadImage = async (url, file) => {
  let result = await fetch(url, {
    method: "PUT",
    body: file
  });

  if (result.status === httpsStatus.OK) {
    return "success"
  }
}

export { ImageValidation, UploadImage }