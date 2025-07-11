const express = require("express");
const cors=require("cors");
const mainRouter=require('./routes/index');



const app=express();
app.use(cors());
app.use(express.json());




app.use('/api/v1',mainRouter);



app.listen(3000,()=>{
console.log("Server is running on the port "+3000);
})


//http:localhost:3000/api/v1/user/signup


 




