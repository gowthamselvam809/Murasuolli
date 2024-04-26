const Common = {
  UserNameRegex: /^([a-zA-Z0-9]+\s)*[a-zA-Z0-9]+$/,
  PasswordRegExp: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
  EmailRegExp: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  OtpRegExp: /^\d{6}$/,
  PhoneNumberRegExp: /^[\\+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{3}[-\\s.]?[0-9]{4,6}$/,
  UrlRegex: /^(https?:\/\/|www\.)[\w-]+\.[\w-]+(\.[\w-]+)*$/,
  CommaSeperatedValueRegex: /^(?:0|[1-9]\d*)(?:\.(?!.*000)\d+)?$/,
  Hashtag: "",
  DateFormat_dd_MM_yyyy: "dd/MM/yyyy",
  DateFormat_DD_MM_YYYY: "DD/MM/YYYY",
  DateFormat_YYYY_MM_DD: "YYYY/MM/DD",
  DateFormat_dd_MM_yyyy_hh_mm_a: "dd/MM/yyyy hh:mm a",
  DateFormat_DD_MM_YYYY_hh_mm_a: "DD/MM/YYYY hh:mm a",
  TZ_Formate: "YYYY-MM-DDTHH:mm:ss[Z]",
  TimeFormat_hh_mm_A: "HH:mm A",
  TimeFormat_hh_mm: "HH:mm",
  TimeFormat_LT: "LT",
  Logout: "Log out",
  SelectRole: "Select Role",
  EMAIL_SENT: "Otp has been sent to mail",
}

const httpsStatus = {
  OK: 200
}

const menuItemTypes = {
  link: "link",
  list: "list"
}

const SessionStorageKeys = {
  SessionToken: "SessionToken",
  UserRole: "UserRole"
}

const Roles = {
  none: "None",
  user: "User",
  admin: "Admin",
  superAdmin: "Super Admin"
}

const RolesEnum = {
  None: 0,
  User: 1,
  Admin: 2,
  SuperAdmin: 4
}

const reactTable = {
  Show: "Show",
  Header: "Header",
  Page: "Page",
  GoToPage: "Go to page:",
  actions: "actions"
}

export { Common, httpsStatus, menuItemTypes, SessionStorageKeys, Roles, RolesEnum, reactTable }