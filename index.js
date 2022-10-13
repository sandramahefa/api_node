let express = require("express")
let app = express()
require("./models/dbConfig")
const postRoute = require("./routes/postController")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")


app.use(bodyParser.json())
app.use("/post",postRoute)

app.listen(3700,() => console.log("server started on 3700 port "))