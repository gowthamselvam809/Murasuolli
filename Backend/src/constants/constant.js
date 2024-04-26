exports.Messages = {
    ACCESS_DENIED: "Access Denied",
    ACCOUNT_INACTIVE: "Your Account is InActive",
    ACCOUNT_USER_DATABASE_ERROR: "Account User Database Error",
    APPLICATION_ERROR: "Something wrong while sending invitation request",
    DATABASE_ERROR: "Database Error",
    EMAIL_SENT: "Otp has been sent to mail",
    ERROR_IN_SOCIAL_LOGIN: "Error in Social Login",  
    ERROR_IN_USER_AUTH: "Google User can't reset password!",
    FACEBOOK_USER_ALREADY_EXISTS: "User already exists. Please use Facebook Login!", 
    GOOGLE_USER_ALREADY_EXISTS: "User already exists. Please use Google Login!", 
    INVALID_CREDENTIALS: "Invalid Credentials",
    INVALID_EMAIL: "Invalid Email",
    INVALID_NEW_PASSWORD: "New Password Is Same As Old Password",
    INVALID_OTP: "INVALID OTP",
    INVALID_OLD_PASSWORD: "Invalid Old Password",
    INVALID_PASSWORD: "Invalid Password",
    INVALID_PROVIDER: "Invalid Provider", 
    INVALID_REQUEST: "Invalid Request",
    INVALID_TOKEN: "INVALID_TOKEN",
    IS_SOCIAL_LOGIN: "Please login with Google!",
    NO_CHANGES_ERROR: "No changes were made. The provided first name and last name match the existing user's information.",
    NORMAL_USER_ALREADY_EXISTS: "User already exists. Please Login with email and password",
    OTP_SENT: "Previously sent mail was less than 5 minutes ago",
    PASSWORD_NOT_UPDATED: "Password Not Updated",
    PASSWORD_UPDATED_SUCCESSFULLY: "Password Updated Successfully",
    PROFILE_INCOMPLETE: "Please Complete The Profile Using Link Sent To Your Registered EmailId",
    SEND_OTP_ERROR: "OTP not sent",
    SOCIAL_USER_ALREADY_EXISTS: "User already exists. Please use respective Social platform",
    TOKEN_REQUIRED: "A token is required for authentication",
    TWITTER_USER_ALREADY_EXISTS: "User already exists. Please use Twitter Login!",
    UPDATE_APPLICATION_ERROR: "Error while updating application status", 
    USER_NOT_VERIFIED: "Your account is not verified",
    USER_ALREADY_EXISTS: "User Already Exists. Please Login",
    USER_DATA_UPDATED: "User data Updated",
    USER_DELETED_SUCCESSFULLY: "User Deleted Successfully",
    USER_DOESNOT_EXISTS: "User Doesnot Exists",
    USER_EMAIL_DOESNOT_EXISTS: "User Email Does Not Exists",
    USER_ROLE_ALREADY_EXISTS: "User Role Exists",
    VERIFY_WITH_NORMAL_LOGIN: "Account already exists, login with the Rhibhus login",
    YOUR_PROFILE_IS_NOT_COMPLETED: 'Your Profile is not complete',
}

exports.Label = {
    Active: "Active",
    BillingAddress: "Billing Address",
    City: "City",
    Country: "Country",
    Email: "Email",
    Female: "Female",
    FirstName: "First Name",
    LastName: "Last Name",
    OldPassword: "Old Password",
    OTP: "OTP",
    Password: "Password",
    PhoneNumber: "Phone Number",
    PostalAddress: "Postal Address",
    UserId: "User ID",
    UserRole: "User Role",
    VerificationLink: "Verification Link",
    Year: "Year"
}

exports.Environment = {
    Development: "development",
    Testing: "testing",
    UAT: "uat",
    Production: "prod"
}

exports.KeyWords = {
    EMAIL: "User Email",
    JOB_ID: "Job Id",
    PASSWORD: "User Password",
    PASSPORT_ID: "Passport Id",
    RESUME: "resume",
    STATUS: "Status",
    USER_ID: "User ID",
    SUCCESS: "success",

    VERIFIED: "verified",
    NOT_VERIFIED: "notVerified",
    FACEBOOK_USER: "facebookUser",
    TWITTER_USER: "twitterUser",
    NEW_USER: "newUser",
    INVALID_USER: "invalidUser",
    NORMAL_USER: "normalUser",
    WEBSITE_ADDRESS: "Website Address",

    NAME: "name",
    ASCENDING: "ascending",
    TS: "_ts",
    APPLIED: `applied`,
    INVITED: `invited`,
    SENDER_ID: "Sender Id",
    RECEIVER_ID: "Receiver Id",
    MESSAGE_ID: "Message Id",
    COUNTRY_NAME: "Country Name",
    STATE_NAME: "State Name", 
    ALL_COURSES_LIST: "allCoursesList"
}

exports.OAUTHRedirectEndpoint = {
    GoogleSignInForMobile: "/v1/googleSignInforMobileRedirect",
    GoogleSignInForWeb: "/v1/googleSignInforWebRedirect"
}

exports.RegexFormat = {
    Password: "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"
}

exports.Roles = {
    None: 0,
    User: 1,
    Admin: 2,
    SuperAdmin: 4
};

exports.SocialLogin = {
    Facebook: "facebook",
    Google: "google",
    Twitter: "twitter"
};

exports.TemplatePath = {
    ForgotPassword: "./src/mailTemplates/forgotPassword.html",
    OTPEmail: "./src/mailTemplates/otpTemplate.html",
    VerifyEmail: "./src/mailTemplates/verifyEmail.html",
    WelcomeEmail: "./src/mailTemplates/welcomeEmail.html"
}

exports.UserStatus = {
    Active: "Active",
    InActive: "InActive"
}

exports.DefaultPassword = {
    Password: "123Pa$$word!"
}

exports.ExpirationTime = 86400