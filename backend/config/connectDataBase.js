const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URL).then((conn) => {
    console.log("MongoDB connected to host : " + conn.connection?.host); //For Port Number
  });
};

module.exports = connectDatabase;
