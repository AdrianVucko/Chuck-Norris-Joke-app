import { useEffect, useState } from "react";
import UserRegister from "../models/UserRegister";
import instance from "../services/instance";
import { useNavigate } from "react-router-dom";

interface RegisterProps{
    isLoggedIn: boolean;
}

function Register(props: RegisterProps){
    const url="/authenticate/register"
    const navigate= useNavigate()
    const [formClicked, setFormClicked]= useState(false)
    const [registrationSuccess, setRegistrationSuccess]= useState(false);
    const [conflict, setConflict]= useState(false);
    const [credentials, setCredentials]= useState<UserRegister>({
        email: "",
        password: "",
        repeatPassword: "",
        firstName: "",
        lastName: ""
    });

    useEffect(()=>{
        if(props.isLoggedIn){
            navigate("/")
        }
    },[props.isLoggedIn])

    async function registerClick(e:any){
        e.preventDefault()
        setFormClicked(true);
        setRegistrationSuccess(false);
        setConflict(false);

        var prolaz= true;

        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(credentials.email)) prolaz= false;
        if(credentials.password.length==0 || credentials.repeatPassword.length==0 || credentials.password!==credentials.repeatPassword) prolaz=false;
        if(credentials.firstName.length==0) prolaz= false;
        if(credentials.lastName.length==0) prolaz=false;

        if(prolaz){
            try{
                const response= await instance.post(url,{...credentials})
                
                if(response.status==201){
                    setRegistrationSuccess(true);
                }
            }catch(error:any){
                if(error.response.status==409) setConflict(true)
            }
        }
    }

    return(
        <div className="min-h-screen flex items-center">
            <form className="mx-auto max-lg:w-7/12 lg:w-1/3 shadow-md rounded-3xl bg-white flex flex-col p-5 gap-3">
                <h1 className="w-full text-center text-3xl font-medium">Register</h1>
                
                <label htmlFor="userEmail" className="w-full text-lg font-medium">Email</label>
                <input type="email" 
                className={"w-full bg-gray-900 p-2 rounded-md focus:outline-none autofill:shadow-[inset_0_0_0px_1000px_rgb(6,222,212)]"+((formClicked && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(credentials.email)) ? " border-2 border-red-600 placeholder:text-red-600 text-red-600" : " placeholder:text-gray-400 text-sky-500")}
                name="userEmail" id="userEmail" placeholder="Enter email" 
                value={credentials.email} onChange={(e) => setCredentials((prev) => {return {email: e.target.value, password: prev.password,repeatPassword: prev.repeatPassword, firstName: prev.firstName, lastName: prev.lastName}})}/>
                
                <label htmlFor="userPassword" className="w-full  text-lg font-medium">Password</label>
                <input type="password" 
                className={"w-full bg-gray-900 p-2 rounded-md focus:outline-none autofill:shadow-[inset_0_0_0px_1000px_rgb(6,222,212)]"+((formClicked && (credentials.password.length==0 || credentials.password !== credentials.repeatPassword)) ? " border-2 border-red-600 placeholder:text-red-600 text-red-600" : " placeholder:text-gray-400 text-sky-500")}
                name="userPassword" id="userPassword" placeholder="Enter password"
                value={credentials.password} onChange={(e) => setCredentials((prev) => {return {email: prev.email, password: e.target.value, repeatPassword: prev.repeatPassword, firstName: prev.firstName, lastName: prev.lastName}})}/>
                
                <label htmlFor="userRepeatPassword" className="w-full  text-lg font-medium">Repeat password</label>
                <input type="password" 
                className={"w-full bg-gray-900 p-2 rounded-md focus:outline-none autofill:shadow-[inset_0_0_0px_1000px_rgb(6,222,212)]"+((formClicked && (credentials.repeatPassword.length==0 || credentials.password !== credentials.repeatPassword)) ? " border-2 border-red-600 placeholder:text-red-600 text-red-600" : " placeholder:text-gray-400 text-sky-500")} 
                name="userRepeatPassword" id="userRepeatPassword" placeholder="Repeat password"
                value={credentials.repeatPassword} onChange={(e) => setCredentials((prev) => {return {email: prev.email, password: prev.password, repeatPassword: e.target.value, firstName: prev.firstName, lastName: prev.lastName}})}/>
                
                <label htmlFor="firstName" className="w-full  text-lg font-medium">First name</label>
                <input type="text" 
                className={"w-full bg-gray-900 p-2 rounded-md focus:outline-none autofill:shadow-[inset_0_0_0px_1000px_rgb(6,222,212)]"+((formClicked && credentials.firstName.length==0) ? " border-2 border-red-600 placeholder:text-red-600 text-red-600" : " placeholder:text-gray-400 text-sky-500")}
                name="firstName" id="firstName" placeholder="Enter first name"
                value={credentials.firstName} onChange={(e) => setCredentials((prev) => {return {email: prev.email, password: prev.password, repeatPassword: prev.repeatPassword, firstName: e.target.value, lastName: prev.lastName}})}/>
                
                <label htmlFor="lastName" className="w-full  text-lg font-medium">Last name</label>
                <input type="text" 
                className={"w-full bg-gray-900 p-2 rounded-md focus:outline-none autofill:shadow-[inset_0_0_0px_1000px_rgb(6,222,212)]"+((formClicked && credentials.lastName.length==0) ? " border-2 border-red-600 placeholder:text-red-600 text-red-600" : " placeholder:text-gray-400 text-sky-500")} 
                name="lastName" id="lastName" placeholder="Enter last name"
                value={credentials.lastName} onChange={(e) => setCredentials((prev) => {return {email: prev.email, password: prev.password, repeatPassword: prev.repeatPassword, firstName: prev.firstName, lastName: e.target.value}})}/>
                
                {
                    conflict ?
                    <div className="p-2 bg-red-300 rounded-md">
                        <p className="text-center text-red-800">This email is already registered</p>
                    </div> :
                    null
                }

                {
                    registrationSuccess ?
                    <div className="p-2 bg-green-300 rounded-md">
                        <p className="text-center text-green-800">Successfull register</p>
                    </div> :
                    null
                }

                <button className="w-full p-3 bg-sky-400 hover:bg-sky-500 rounded-xl text-gray-900 font-bold text-lg" onClick={registerClick}>Register</button>
            </form>
        </div>
    );
}

export default Register;