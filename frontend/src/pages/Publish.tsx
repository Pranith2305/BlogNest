import axios from "axios";
import AppBar from "../components/AppBar"
import { BackendURL } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
  return (
    <div class="flex justify-center">
    <div class="max-w-screen-lg w-full">
    <AppBar/>
      <div class="mb-6 pt-4">
        <input onChange={(e)=>{
            setTitle(e.target.value);
        }}
          type="text"
          id="large-input"
          placeholder="Write the title here..."
          class="block w-full p-4 text-gray-600 focus:outline-none text-2xl focus:ring-blue-500 focus:border-blue-500"
        />
        <div>
            <textarea onChange={(e)=>{
                setDescription(e.target.value);
            }} id="message" rows={4} class="block p-2.5 w-full text-sm text-gray-900 rounded-lg  focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your thoughts here..."></textarea>
        </div>
      <button
            type="button"
            class="mt-2 text-white bg-blue-500 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
            onClick={async() => {
                const storedToken = JSON.parse(localStorage.getItem("token") || '{}');
                const responce = axios.post(`${BackendURL}/api/v1/blog`,{
                    title,
                    content : description
                }, {
                    headers : {
                        Authorization : `${storedToken.jwt}`,
                    },
                });
                navigate(`/blog/${(await responce).data.id}`)
            }}
          >
            Publish
          </button>
      </div>
      
    </div>
    </div>
  );
};

