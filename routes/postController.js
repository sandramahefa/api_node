const express = require("express");
var cors = require('cors')
const res = require("express/lib/response");
const router = express.Router()

//Active the CORS option
router.all('*', cors());
//------Autre option
/*var corsOptions = {
    origin: 'http://localhost:3700/post/',
    optionsSuccessStatus: 200
  };*/
  //--------
const ObjectID = require('mongoose').Types.ObjectId

const {PostModel} = require("../models/postModel");

router.get('/',(req,rep) => {
    PostModel.find( (err,docs) =>{
        if(!err) rep.send(docs)
        else rep.send("error to get data")
    })
})

/*router.get("/id",function (req, rep)
 {

    PostModel.find({_id:"62515812ff2016be5939d7f8"},(err, docs) => {
        if(!err) rep.send(docs)
        else rep.send('error to get data by ID')
    });
});
*/

router.post('/',(req,rep)=>{
    const newRecord = new PostModel({
        author: req.body.author ,
        message: req.body.message
    })

    newRecord.save((err,docs)=>{
        if(! err) rep.send(docs);
        else console.log("INsertion error ");
    })
})


router.put("/:id",(req,rep)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send("ID unknow : "+req.params.id);
    }
        

    const updateRecord = {
        author: req.body.author ,
        message: req.body.message
    };

    PostModel.findByIdAndUpdate(
        req.params.id,
        {$set: updateRecord},
        {new: true},
        (err,data) =>{
            if(!err) rep.send(data);
            else console.log("udapte unvalide");
        }
    )
    
})

router.delete("/:id",(req,rep)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send("ID unknow : "+req.params.id);
    }

    PostModel.findByIdAndRemove(
        req.params.id,
        (err,data) =>{
            if(!err) rep.send(data);
            else console.log("unpossible to delete")
    })

})

module.exports = router