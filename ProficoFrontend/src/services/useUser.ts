import { useState } from "react";
import User from "../models/User";
import instance from "./instance";

function useUser(){
    const [curUser, setCurUser]= useState<User | undefined>()
    const autoUrl="/api/me"

    const loginSuccsessfull=(obj:{user:User,token:string})=>{
        localStorage.setItem("user-token",obj.token)
        setCurUser(obj.user);
    }

    const logout=()=>{
        localStorage.removeItem("user-token");
        setCurUser(undefined)
    }

    const autoLogin= async ()=>{
        if(localStorage.getItem("user-token")){
            try{
                const response= await instance.get(autoUrl)
                console.log(response)
                setCurUser(response.data)
            }catch(e){
                localStorage.removeItem("user-token")
                setCurUser(undefined)
            }
        }
        else{
            setCurUser(undefined)
        }
    }

    return{
        curUser,
        loginSuccsessfull,
        logout,
        autoLogin
    }
}

export default useUser;