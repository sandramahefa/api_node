let mongoose = require("mongoose")

mongoose.connect(
    "mongodb://0.0.0.0:2717/node-api",{
        useNewUrlParser: true,useUnifiedTopology:true
    },(err) =>{
        if(!err) console.log("mongodb connected");
        else console.log("conection error => "+err);
    }
    )