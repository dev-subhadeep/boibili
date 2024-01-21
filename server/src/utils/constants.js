require("dotenv").config();

const dburi = process.env.DB_URI;
const dbname = process.env.DB_NAME;
const jwtpk = process.env.JWT_PK;
const cookieOptions = { httpOnly: true, secure: true };

module.exports = {
  jwtpk,
  dburi,
  dbname,
  cookieOptions,
};
