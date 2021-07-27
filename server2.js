var x=require('express');
var mongoose =require('mongoose');
require('dotenv').config();
var app=x();
var PORT =process.env.PORT || 1337 ||5000 ||2000;
var db=process.env.MONGO_URL;
mongoose.connect(String( db),{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
})

var tab=mongoose.model("counteryCode",mongoose.Schema({
    Dial_code:String,
    name:String,
    countery_code:String
    
}))


app.get("/send",async(req,res)=>{
    var nam= req.headers.name;
    if(nam){
        var gett=await tab.find({"name":{$regex:nam,$options:"i"}});
        if(gett.length>0){
            res.send(gett);  
        }
        else{
            res.send(JSON.stringify({msg:"sorry this countery not exist"}));
        }   
    }
    else{
        var gett=await tab.find({});
        res.send(gett); 
    }
})


app.listen(PORT);