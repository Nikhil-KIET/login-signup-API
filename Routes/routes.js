const express=require("express");
const { signup ,login,auth} = require("../Controller/control");
const app=express()
const router=express.Router();


router.get("/home",(req,res)=>{
res.status(200).send("hi welcome to home")
})
router.post("/signup",signup)
router.get("/login",login)
router.get("/auth",auth)





module.exports=router;