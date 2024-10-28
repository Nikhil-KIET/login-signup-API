
const user=require("../Models/Models")

const bcrypt=require("bcrypt")
require("cookie-parser")

const jwt=require("jsonwebtoken")

require("dotenv").config()


async function signup(req,res){
    try{
        const {name,email,pass,role}=req.body

        let data= await user.findOne({email:email});

        

        if(data){
            return res.status(400).json({message:"Email already exists"})
        }
        
       let p= await bcrypt.hash(pass,10);

       
       



        await user.create({name,email,pass:p,role})

        


        res.status(200).json({message:"User Created"})
    }catch(err){
        res.status(401).json({message:err.message})
    }
    

}

async function login(req,res){
    try{
        const {email,pass}=req.body
        const data= await user.findOne({email:email})
        if(!data)
        {
            return res.status(401).json({
                message:"Invalid Email"
            })
        }
        const chk=await bcrypt.compare(pass,data.pass);
        if(!chk){
            return res.status(401).json({message:"wrong password"})
        }
        const payload={
            id:data._id,
            name:data.name,
            email:data.email,
            role:data.role

        }
        const option={
            expiresIn:"300000hr"
        }
        const token=jwt.sign(payload,process.env.JWT_SECREAT,option)

        res.cookie("mycookie",token,{
            httpOnly:true,
            maxAge: 1000 * 60 * 60 * 24,
        })
        res.status(200).json({message:"Login Success"})

        // res.status(200).json({
        //     message:"Login sucess full",
        //     token

        
        // }).cookies("mycookies",token,{
        //     httpOnly: true
        // })


    }catch(err){
        res.status(401).json({message:err.message})

    }
}

async function auth(req,res){
    try{

        const token= req.cookies.mycookie;
        console.log(token)
        // if(!token){
        //     return res.status(401).json({message:"Please provide token"})
        // }
        let payload=await jwt.verify(token,'nikhil')
        console.log(payload)
        res.status(200).json({ message: 'Authorized' });
        


    }catch{
        res.status(401).json({message:"Invalid token"})
    }
}




module.exports={signup,login,auth}