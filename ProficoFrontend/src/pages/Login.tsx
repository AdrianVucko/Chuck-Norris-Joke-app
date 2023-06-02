import { useEffect, useState } from "react";
import UserLogin from "../models/UserLogin";
import User from "../models/User";
import instance from "../services/instance";
import { useNavigate } from "react-router-dom";

interface LoginProps{
    onLogin: (obj:{user:User,token:string}) => void;
    isLoggedIn: boolean;
}

function Login(props:LoginProps){
    const url="/authenticate/login"
    const navigate= useNavigate();
    const[formClicked, setFormClicked]= useState(false);
    const [err, setErr]= useState(false);
    const[credentials, setCredentials]= useState<UserLogin>({
        email:"",
        password:""
    })

    useEffect(()=>{
        if(props.isLoggedIn){
            navigate("/")
        }
    },[props.isLoggedIn])

    const loginClick = async (e:any)=>{
        e.preventDefault();
        var prolaz= true;
        setFormClicked(true);
        setErr(false);

        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(credentials.email)) prolaz= false;
        if(credentials.password.length==0) prolaz= false;

        if(prolaz){
            try{
                const response= await instance.post(url,{...credentials})
                
                if(response.status==200){
                    console.log(response.data)
                    props.onLogin(response.data)
                }
                else{
                    setErr(true);
                }
            }catch(e){
                setErr(true);
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center">
            <form className="mx-auto max-lg:w-7/12 lg:w-1/3 shadow-md bg-white flex flex-col p-5 gap-3 rounded-3xl">
                <h1 className="w-full text-center text-3xl font-medium">Login</h1>
                
                <label htmlFor="loginEmail" className="w-full text-lg font-medium">Email</label>
                <input type="email" 
                className={"w-full bg-gray-900 p-2 rounded-md focus:outline-none autofill:shadow-[inset_0_0_0px_1000px_rgb(6,222,212)]"+((formClicked && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(credentials.email)) ? " border-2 border-red-600 placeholder:text-red-600 text-red-600" : " placeholder:text-gray-400 text-sky-500")} 
                name="loginEmail" id="loginEmail" placeholder="Enter email"
                value={credentials.email} onChange={(e)=>setCredentials((prev)=>{return{email:e.target.value,password:prev.password}})}/>
                
                <label htmlFor="loginPassword" className="w-full text-lg font-medium">Password</label>
                <input type="password" 
                className={"w-full bg-gray-900 p-2 rounded-md focus:outline-none autofill:shadow-[inset_0_0_0px_1000px_rgb(6,222,212)]"+((formClicked && credentials.password.trim().length==0) ? " border-2 border-red-600 placeholder:text-red-600 text-red-600" : " placeholder:text-gray-400 text-sky-500")} 
                name="loginPassword" id="loginPassword" placeholder="Enter password"
                value={credentials.password} onChange={(e)=>setCredentials((prev)=>{return{email:prev.email,password:e.target.value}})}/>
                
                {
                    err ?
                    <div className="p-2 bg-red-300 rounded-md">
                        <p className="text-center text-red-800">Wrong email or password!</p>
                    </div> :
                    null
                }

                <button className="w-full p-3 bg-sky-400 hover:bg-sky-500 rounded-xl text-lg text-gray-900 font-bold" onClick={loginClick}>Login</button>
            </form>
        </div>
    )
}

export default Login;