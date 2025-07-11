const express=require("express");
const mongoose=require("mongoose");

const router=express.Router();
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");

router.get('/balance',authMiddleware ,async function(req,res){

    const account=await Account.findOne({
        userId:req.userId
    });

    res.json({
        balance:account.balance
    })

});


router.post('/transfer',authMiddleware,async function(req,res){

    const session=await mongoose.startSession();

    session.startTransaction();

    const {amount,to}=req.body;

    const account=await Account.findOne({
        userId:req.userId
    });


  


    if(!account || account.balance<amount){
        await session.abortTransaction();
         return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount=await Account.findOne({
        userId:to
    });

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Account to be transferred money not found!"
        })
    }

    await Account.updateOne(
  { userId: req.userId },
  { $inc: { balance: -amount } }
).session(session);

await Account.updateOne(
  { userId: to },
  { $inc: { balance: amount } }
).session(session);


    await session.commitTransaction();
    res.json({
        msg:"Transfered Successfully!"
    })


})

module.exports=router;