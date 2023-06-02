import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChuckNorrisJoke from "../models/ChuckNorrisJoke";
import instance from "../services/instance";
import User from "../models/User";

interface JokeProps{
    isLoogedIn: boolean,
    user: User | undefined
}

function Joke(props:JokeProps){
    const jokeUrl= "/api/chuck"
    const navigate= useNavigate();
    const [joke, setJoke]= useState<ChuckNorrisJoke | undefined>(undefined)

    useEffect(()=>{
        if(!props.isLoogedIn){
            navigate("/login")
        }
        else{
            try{
                instance.get(jokeUrl)
                    .then((res)=>setJoke(res.data))
            }catch(e){
                setJoke(undefined)
            }
        }
    },[props.isLoogedIn])

    const newJokeClick= async()=>{
        try{
            const result= await instance.get(jokeUrl)
            setJoke(result.data);
        }catch(e){
            setJoke(undefined)
        }
    }

    return (
        <div className="min-h-screen">
            {
                props.user== undefined ? null :
                <div>
                    <h1 className="w-11/12 mx-auto text-center text-4xl text-gray-900 mt-10">Email: {props.user.email}</h1>
                    <h1 className="w-11/12 mx-auto text-center text-4xl text-gray-900 mt-10">Full name: {props.user.firstName + " " + props.user.lastName}</h1>
                </div>
            }
            {
                joke == undefined ?
                <h1 className="text-4xl text-gray-900 text-center mt-10">Loading...</h1> :
                <div className="w-11/12 mx-auto flex flex-col gap-10 mt-10">
                    <button className="w-full rounded-3xl p-4 text-sky-500 bg-gray-900 text-lg font-medium hover:bg-sky-500 hover:text-gray-900" onClick={newJokeClick}>New joke</button>
                    <div className="flex md:flex-row max-md:flex-col max-md:gap-10 justify-around items-center p-5 bg-gray-900 rounded-3xl">
                        <img className="md:w-5/12 max-md:w-full" src={"https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png"} alt="Picture of Chuck Norris" />
                        <p className="md:w-6/12 max-md:w-full text-xl text-sky-500">{joke.value}</p>
                    </div>
                </div>
            }
        </div>
    );
}

export default Joke;