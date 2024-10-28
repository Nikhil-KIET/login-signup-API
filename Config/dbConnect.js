const mongoose=require("mongoose")

require("dotenv").config();
  function dbConnect(){
    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    } ).then(()=>{
        console.log("connected to database")
    }).catch(()=>{
        console.log("Not connected to database")
        process.exit(1)
    })
    
    
    
}

module.exports=dbConnect
