const ErrorMessage = {
  INVALID_EMAIL: "Invalid Email!",
  EMAIL_REQUIRED: "Email is required!",
  INVALID_OTP: "Invalid OTP!",
  OTP_REQUIRED: "Please Enter 6 digit OTP",
  PASSWORD_MIN: "Password must be at least 6 characters",
  PASSWORD_INVALID: "Invalid Password!",
  PASSWORD_REQUIRED: "Password is required",
  FIRST_NAME_MIN: "First Name must be at least 2 characters",
  FIRST_NAME_MAX: "Maximum 30 characters are allowed",
  FIRST_NAME_IS_REQUIRED: "First name is required!",
  LAST_NAME_MIN: "Last Name must be at least 2 characters",
  LAST_NAME_MAX: "Maximum 30 characters are allowed",
  LAST_NAME_IS_REQUIRED: "Last Name is required!",
  PHONE_NUMBER_REQUIRED: "Phone Number is required!",
  PHONE_NUMBER_MUST_BE_AT_LEAST_7_DIGIT: "Phone Number must be alteast 7 digits",
  PHONE_NUMBER_MUST_BE_AT_MOST_15_DIGIT: "Phone Number must be atmost 15 digits",
  CITY: "City is required!",
  AGE: "Age is required!",
  INVALID_IMAGE_TYPE: "Please Select .jpg/.png Images",
  PLEASE_SELECT_A_ROLE: "Please Select a Role"
}

const labels = {
  FORGOT_PASSWORD: "Forgot Password? ",
  SUBMIT: "Submit",
  LOG_IN: "Login",
  SOCIAL_LOG_IN: "Social Login",
  DONT_HAVE: "Don't have an account?",
  REGISTER_ACCOUNT: "Register account",
  REGISTER: "Register",
  FIRST_NAME: "First Name",
  LAST_NAME: "Last Name",
  ENTER_OTP: "Enter OTP",
  PHONE_NO: "Phone Number",
  PASSWORD: "Password",
  NEWPASSWORD: "New Password",
  CONFIRM_PASSWORD: "Confirm password",
  ROLE: "Role",
  IMAGE: "Image",
  USERS: "Users List",
  ADD_USER: "Add User",
  EDIT_USER: "Edit User",
  EDIT: "Edit",
  DELETE: "Delete",
  FIRST_NAME_ACCESSOR: "firstName",
  LAST_NAME_ACCESSOR: "lastName",
  AGE: "Age",
  AGE_ACCESSOR: "age",
  EMAIL: "Email",
  EMAIL_ACCESSOR: "email",
  CITY: "City",
  CITY_ACCESSOR: "city",
  PHONE: "Phone",
  PHONE_ACCESSOR: "phone",
  ROLE_ACCESSOR: "type",
  STATE: "State",
  STATE_ACCESSOR: "state",
  DISTRICT: "District",
  DISTRICT_ACCESSOR: "district",
  DOB: "DOB",
  DOB_ACCESSOR: "dob",
  OPTIONS: "Options",
  OPTIONS_ACCSSOR: "actions",
  INDEX: "#",
  INDEX_ACCESSOR: "index_no",
  GENDER: "Gender",
  RESET_PASSWORD: "Reset Password",
  SEND_OTP: "Send OTP",
  PASSWORDS_DONT_MATCH: "Passowrds Dont Match"
}

const SucessMessages = {
  IMAGE_UPLOADED_SUCESSFULLY: "Image Uploaded Sucessfully!",
  PROFILE_UPDATED_SUCCESSFULLY: "Profile Update Successfully",
  USER_UPDATED_SUCCESSFULLY: "user updated successfully!",
  USER_ADDED_SUCCESSFULLY: "user added successfully!",
}

const userType = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
]

const userData = [
  { firstName: "Sudarshan", lastName: "Reddy", age: 25, gender: "Male", state: "Karnataka", district: "Chickballapur", dob: "1997-03-01" },
  { firstName: "Vihaan", lastName: "Sharma", age: 30, gender: "Male", state: "Delhi", district: "South Delhi", dob: "1992-05-15" },
  { firstName: "Aditi", lastName: "Gupta", age: 28, gender: "Female", state: "Uttar Pradesh", district: "Lucknow", dob: "1994-09-20" },
  { firstName: "Advik", lastName: "Choudhury", age: 27, gender: "Male", state: "West Bengal", district: "Kolkata", dob: "1995-11-12" },
  { firstName: "Ananya", lastName: "Deshpande", age: 35, gender: "Female", state: "Maharashtra", district: "Mumbai", dob: "1987-07-08" },
  { firstName: "Arjun", lastName: "Singh", age: 32, gender: "Male", state: "Rajasthan", district: "Jaipur", dob: "1990-02-25" },
  { firstName: "Aaradhya", lastName: "Mishra", age: 38, gender: "Female", state: "Uttar Pradesh", district: "Kanpur", dob: "1984-12-30" },
  { firstName: "Ayaan", lastName: "Patel", age: 40, gender: "Male", state: "Gujarat", district: "Ahmedabad", dob: "1982-08-18" }
]

export {
  ErrorMessage,
  labels,
  SucessMessages,
  userType,
  userData
}