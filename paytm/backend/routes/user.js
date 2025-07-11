const express=require("express");
const jwt=require("jsonwebtoken");
const router=express.Router();
const zod=require("zod");
const { User } = require("../db");
const { authMiddleware } = require("../middleware");
const {Account} =require("../db")
const {JWT_SECRET}=require("../config")

const signupSchema = zod.object({
  username: zod.string().min(3).max(30).toLowerCase().trim(),
  password: zod.string().min(6),
  firstName: zod.string().max(50).trim(),
  lastName: zod.string().max(50).trim()
});

const updatedBody=zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})




router.post('/signup',async function(req,res){
    const body=req.body;
    const {success}=signupSchema.safeParse(body);
    if(!success){
        return res.status(411).json({
            msg:"Email already taken/Invalid input"
        })
    }

    const user=await User.findOne({
        username:body.username
    })

    if(user){
        return res.status(411).json({
            msg:"User already exists in the dB"
        })
    }

   const dbUser= await User.create(body);
 const token=jwt.sign({
    userId:dbUser._id,

 },JWT_SECRET)
   res.json({
    msg:"User created successfully!",
    token:token
   })

await Account.create({
  userId:dbUser._id,
  balance:1+Math.random()*10000
})

})

const signinBody = zod.object({
    username: zod.string(),
	password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Invalid username or password format"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})


router.put('/',authMiddleware,async function(req,res){

    const {success} =updatedBody.safeParse(req.body);

    if(!{success}){
        return res.status(411).json({
            msg:"Error while updating information"
        })
    }

 await User.updateOne({ _id: req.userId }, req.body);



  res.json({
    msg:"Updated successfully!"
  })


   
});




router.get('/bulk',async function(req,res){
     const filter=req.query.filter || "";
     const users=await User.find({
        $or:[{
            firstName:{
                "$regex":filter
            }
        },
    {
        lastName:{
            "$regex":filter
        }
    }
    ]


     })

 res.json({
      users: users.map(user => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user._id
      }))
    });
})

module.exports=router;