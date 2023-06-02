import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import User from "./models/User";

interface SourceProps{
    user: User|undefined;
    logout: ()=>void;
}

function Source(props:SourceProps){
    return (
        <>
            <Navbar user={props.user} logout={props.logout}/>
            <Outlet />
            <Footer />
        </>
    );
}

export default Source;