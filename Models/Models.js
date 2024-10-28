const mongoose=require("mongoose")


const user= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["Admin","Student"],
        required:true
    }
})
module.exports=mongoose.model("user",user);