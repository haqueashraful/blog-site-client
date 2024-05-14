import { useContext } from "react";
import { Context } from "../Context/MyContext";

const Loading = () => {
    const {isChecked} = useContext(Context)
    return (
        <div className=" flex justify-center items-center min-h-screen">
            <span className={`loader  ${isChecked ? "!text-white" : "!text-black"}`}></span>
        </div>
    );
};

export default Loading;