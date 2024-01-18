import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import CardsGrid from "./cards_grid";
import { api_root, keep_json_data, keep_model_images, model_images } from "../api/api_variables";
import axios from "axios";


const Search= () => {
    function allow_search(){
        document.getElementById('search_input').focus();
    }



    const [model_json_data, set_model_json_data]= useState([]);    
    const model_json_data_= (res) => {
        keep_json_data.length= 0;
        keep_json_data.push(res.data); 
        
        set_model_json_data(keep_json_data[0]);
    };

    

    useEffect(() => {
        model_images.length= 0;
       
        axios.get(api_root + 'home-models/get-all-models', {
            headers: {
                'Content-Type': 'application/json', // Add other headers if needed
                },
        }).then(res => model_json_data_(res))
        .catch(e => alert("Something, went wrong, data could not be fetched"));
    

        // else{
        //     console.log(keep_json_data[0])
        //     set_model_json_data(keep_json_data[0]);
        // }
    }, []);






    return(
        <div className="justify-center items-center mx-auto bg-[#C3B598] pb-10">
            <div className="px-[5%] mx-auto items-center justify-center">
                <h1 className="text-center flex flex-row relative">
                    <input id="search_input" className="shadow-md shadow-gray-500 absolute  left-32 right-32 mt-[53px] justify-center items-center mx-auto align-middle text-left px-4 pl-16 py-3 rounded-xl bg-[#B9A88B] placeholder-[#714E2C] text-[#714E2C]"  type="text" placeholder="Search Model"/>
                    <IoSearchSharp onClick={allow_search}  className="absolute  left-[9.2rem] right-32 mt-[65px] size-7" color="#714E2C"/>
                    {/* <input className="absolute left-5 right-5 items-center justify-center mx-auto w-[1026px] h-[79] text-left px-4 pl-16 py-3 rounded-xl mt-[50px] bg-[#B9A88B] placeholder-[#714E2C] text-[#714E2C]"  type="text" placeholder="Search Model"/> */}
                </h1>

                <CardsGrid show_data= {model_json_data}/>
            </div>
        </div>
    );
};
export default Search;
