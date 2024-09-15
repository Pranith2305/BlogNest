import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupType} from "../../../common/src/index"
import axios from "axios";
import { BackendURL } from "../config";

const Auth = ({type} : {type : "signup" | "signin"}) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupType>({
        name : "",
        email : "",
        password : ""
    })

    async function sendRequest(){
        try{
            const responce = await axios.post(`${BackendURL}/api/v1/user/${type === "signup"? "signup" : "signin"}`,{...postInputs})
            const jwt = responce.data;
            localStorage.setItem("token", JSON.stringify(jwt));
            navigate("/blogs");
        }
        catch(e){
            alert("SIGNUP ERROR");
        }
    }
    return(
        <div className="h-screen flex justify-center flex-col ">
            <div className="flex justify-center">
            <div>
            <div className="text-3xl font-extrabold">Create an account</div>
            <div className="text-slate-400">{type === "signup"? "alredy have an account?": "Dont have an account?"}
                <Link className="pl-2 underline" to={type === "signup"?"/signin" : "/signup"}>{type === "signup"?"signin" : "signup"}</Link>
            </div>
            </div>
            </div>
            <div>
                
            {type === "signup" ? <LabelledInput label="name"  placeholder="name" onChange={(e)=>{
                setPostInputs(c => ({
                    ...c,
                    name: e.target.value
                }));
            }}/> : null}
            <LabelledInput label="email"  placeholder="email" onChange={(e)=>{
                setPostInputs(c => ({
                    ...c,
                    email: e.target.value
                }));
            }}/>
            <LabelledInput label="password" type={"password"} placeholder="password" onChange={(e)=>{
                setPostInputs(c => ({
                    ...c,
                    password: e.target.value
                }));
            }}/>
            </div>
            <button onClick={sendRequest} type="button" className="text-white mt-4 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "signup" : "signin"}</button>
        </div>
    )
}

interface labelInputType{
    label : string;
    placeholder : string;
    onChange : (e : ChangeEvent<HTMLInputElement>) => void;
    type ?: string;
}
function LabelledInput({label, placeholder, onChange, type} : labelInputType){
    return (
        <div className="w-full max-w-sm min-w-[200px]">
            <label className="mt-2 block mb-2 text-sm font-medium text-black " >{label}</label>
            <input onChange={onChange} type={type || "string"} className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder={placeholder} required/>
        </div>
    )
}
export default Auth;