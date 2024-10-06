import { Outlet } from "react-router-dom";
// import Navbar from "../Shared/Navbar";

const Root = () => {
    return (
        <div className="">
            {/* <Navbar></Navbar> */}
            <Outlet></Outlet>
            {/* max-w-7xl mx-auto */}
        </div>
    );
};

export default Root;