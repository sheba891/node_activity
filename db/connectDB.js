const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(
  process.env.DB_URL,
  {
    //useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true,
  },
  () => {
    console.log("DB Connected");
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
