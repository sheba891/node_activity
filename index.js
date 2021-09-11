const app  = require("express")();

require("dotenv").config();
require("./db/connectDB");

const port = process.env.PORT;
//const app =express();
//app.use(express.json())

const bodyParser = require("express").json;
app.use(bodyParser());
const userRoute = require("./routes/userRoute")
app.use('/user', userRoute)

app.listen(port, () => {
    console.log("Server is running on ",)
})