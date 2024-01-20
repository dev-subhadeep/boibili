const mongoose = require("mongoose");
const { dburi, dbname } = require("./constants.js");

const connect = mongoose.connect(`${dburi}/${dbname}`);

module.exports = connect;
