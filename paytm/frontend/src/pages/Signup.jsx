import { useState } from "react"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { Subheading } from "../components/Subheading"
import { useNavigate } from "react-router-dom"
import { Bottomwarning } from "../components/Bottomwarning"
import axios from "axios";



export const Singup = ()=>{
    const [firstName,setfirstName]=useState("");
    const [lastName,setlastName]=useState("");
    const [username,setusername]=useState("");
    const [password,setpassword]=useState("");
    const navigate=useNavigate();

     return <div className="bg-slate-300 h-screen flex justify-center">

      <div className="flex flex-col justify-center">

         <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
 
<Heading label={"Sign Up"} />
<Subheading label={"Enter your details below to create an account"}></Subheading>
<InputBox onChange={(e)=>{
setfirstName(e.target.value)
}} label={"First Name"} placeholder={"John"} />
<InputBox onChange={(e)=>{
setlastName(e.target.value)
}} label={"Last Name"} placeholder={"Doe"} />
<InputBox onChange={(e)=>{
setusername(e.target.value)
}} label={"Username"} placeholder={"john123"} />
<InputBox onChange={(e)=>{
setpassword(e.target.value)
}} label={"Password"} placeholder={"123456"} />
<div className="pt-4">
<Button onClick={async ()=>{
   const response=await axios.post("http://localhost:3000/api/v1/user/signup",{
        username,
        firstName,
        lastName,
        password
    }) ; 
    localStorage.setItem("token",response.data.token)
}} label={"Sign Up"} />

</div>

<Bottomwarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />




         </div>
      </div>




     </div>
}