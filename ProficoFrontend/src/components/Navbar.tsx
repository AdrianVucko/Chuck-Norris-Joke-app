import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import User from "../models/User";

interface NavbarProps{
    user: User|undefined;
    logout: ()=>void;
}

function Navbar(props:NavbarProps) {
    const [phoneMenuClicked, setPhoneMenuClicked] = useState(false);
    const location= useLocation();

    return (
        <nav className="bg-gray-900 p-5 w-full">
            <div className={"max-md:hidden flex items-center"+ (props.user!=undefined ? " justify-between" : " justify-end")}>
                {
                    props.user != undefined ?
                    <Link to={"/"} className="text-xl text-white p-3 hover:bg-sky-500 rounded-3xl hover:text-gray-900 hover:font-medium">
                        Jokes
                    </Link> :
                    null
                }
                {
                    props.user != undefined ?
                    <button onClick={props.logout} className="text-xl text-white p-3 hover:bg-sky-500 hover:text-gray-900 hover:font-medium rounded-3xl">Logout</button>:
                    location.pathname=="/login" ?
                    <Link to={"/register"} className="text-xl text-white p-3 hover:bg-sky-500 hover:text-gray-900 hover:font-medium rounded-3xl">
                        Register
                    </Link> :
                    <Link to={"/login"} className="text-xl text-white p-3 hover:bg-sky-500 rounded-3xl hover:text-gray-900 hover:font-medium">
                        Login
                    </Link>
                }
            </div>
            <div className="md:hidden flex justify-between items-center">
                <div className="p-5">
                    {
                        props.user!=undefined ?
                        <Link to={"/"} className="text-xl text-white p-3 hover:bg-sky-500 rounded-3xl hover:text-gray-900 hover:font-medium">
                            Jokes
                        </Link> :
                        null
                    }
                </div>
                <div className="-mr-2 flex p-5">
                    <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out" aria-label="Main menu" aria-expanded="false" onClick={() => setPhoneMenuClicked(!phoneMenuClicked)}>
                        <svg className={"h-6 w-6" + (phoneMenuClicked ? " hidden" : " block")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg className={"h-6 w-6" + (phoneMenuClicked ? " block" : " hidden")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
            {phoneMenuClicked == false ? null :
                <div>
                    {
                        props.user!=undefined ?
                        <div className="md:hidden flex justify-around my-2">
                            <button onClick={props.logout} className="text-xl text-white p-3 hover:bg-sky-500 rounded-3xl hover:text-gray-900 hover:font-medium">Logout</button> 
                        </div>:
                        <div className="md:hidden flex justify-around my-2">
                            <Link to={"/register"} className="text-xl text-white p-3 hover:bg-sky-500 rounded-3xl hover:text-gray-900 hover:font-medium">
                                Register
                            </Link>
                            <Link to={"/login"} className="text-xl text-white p-3 hover:bg-sky-500 rounded-3xl hover:text-gray-900 hover:font-medium">
                                Login
                            </Link>
                        </div>
                    }
                </div>
            }
        </nav>
    )
}
export default Navbar;