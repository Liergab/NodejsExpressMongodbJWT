const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const router = require("./routes/index")
const userRoutes = require("./routes/userRoutes")
const connect = require("./config/db")
const errorHandler = require("./middleware/errorHandler")
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/api/v3",router)
app.use("/api/v4",userRoutes)
connect()


app.use(errorHandler)
const Port = process.env.PORT || 3001
app.listen(Port, () => {
    console.log(`Server is Listening in PORT: http://localhost:${Port}`)
});

