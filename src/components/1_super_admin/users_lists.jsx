import React, { useEffect, useState } from 'react'

import { RiDeleteBinLine } from "react-icons/ri";
// import SearchIcon from '@mui/icons-material/Search';

import { CircularProgress, MenuItem, Select } from "@mui/material";
import { access_token, handleGetCookie } from '../../api/cookies_logic';
import { useNavigate } from 'react-router-dom';
import { api_root } from '../../api/api_variables';
import axios from 'axios';


const UsersLists = (props) => {
    const model_json_data= props.model_json_data;

    const [role, setRole]= useState("Tagger");


    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const navigate= useNavigate();



    useEffect( () => {
        selected_models=[];
    });




    const [cancel_delete, setDelete]= useState(false);
    const cancel_delete_= () => {
        setDelete(!cancel_delete);
    }




    var selected_models= [];
    const selectValue_= (index) => {
        if (!selected_models.includes(index)){
            selected_models.push(index);
        }
        else{
            const get_index= selected_models.indexOf(index);
            selected_models.splice(get_index, 1);
        }

        console.log(selected_models);
    }

    const [selectAllValue, setSelectAllValue]= useState(false);
    const selectAllValue_= (checked) => {
        if (checked){
            selected_models.length= 0;
            model_json_data[0].map(item => (
                selected_models.push(item.id)
            ));

            setSelectAllValue(checked);
        }
        else{
            selected_models.length= 0;
            setSelectAllValue(checked);
        }

        console.log(selected_models);
    }

      


    const [continue_delete, setContinueDelete]= useState(false);
    const [is_model_delete, set_is_model_delete]= useState(false);
    const continue_delete_= () => {
        // console.log(selected_models);

        setContinueDelete(!continue_delete);

        handleGetCookie();
        if (access_token === null){
            navigate('/admin-login---', {relative: true});
        }
        
        else{
            axios.request(
                {
                    method: 'delete',
                    url: api_root + `admin/delete-model-super-admin?id=[${selected_models}]`,
                    headers: { 
                        'Authorization': access_token,
                        'Content-Type': 'application/json'
                    },

                    data: selected_models
                }
            )
            .then((response) => {
                setContinueDelete(false);
                cancel_delete_();
                
                set_is_model_delete(!is_model_delete);
            })
            .catch((error) => {
                console.log(error);
                setContinueDelete(false);
                cancel_delete_();
            });

        }
    }


    return (
        <div className="relative top-[100px] flex flex-col gap-y-4 w-full">
            <flex className='text-sm flex justify-between absolute left-0 right-0 top-0 items-center border py-1 px-2'>
                
                <flex onClick={e => {selectAllValue_(!selectAllValue)}} className= "flex items-center gap-x-3 ">
                    <input type='checkbox'  className='size-5'/>
                    <h1>Select All</h1>
                </flex>

                <button className='opacity-65 pointer-events-none rounded-3xl my-shadow-style bg-red-500 sm:px-8 px-5 sm:py-2 py-1 hover:bg-black/75 hover:text-red-500 font-medium '>
                    Delete
                </button>
            </flex>

            <br />
            <br />

            {
                model_json_data.length !== 0
                    ? 

                    
                    model_json_data[0].map(item => (
                        <div className="flex md:flex-row flex-col md:items-center justify-between w-full md:h-[65px] p-3 sm:px-2 px-2 border rounded-xl">     
                            <div className="sm:relative sm:flex sm:justify-between md:hidden hidden cursor-pointer">
                                <input checked={selectAllValue} onClick={e => {selectAllValue_(item.id)}} type='checkbox'  className='size-4'/>
                                <RiDeleteBinLine onClick={(e) => {cancel_delete_(item.id)}} className="hover:bg-gray-300 rounded-full text-red-700 flex scale-[150%] cursor-pointer"/>
                            </div>



                            <div className="md:flex md:pr-4 sm:hidden flex justify-between cursor-pointer">
                                <input id={item.id}  checked={selectAllValue} onClick={e => {selectValue_(item.id)}} type='checkbox'  className='size-4'/>
                                <RiDeleteBinLine onClick={(e) => {cancel_delete_(item.id)}} className="sm:hidden text-red-700  flex scale-[150%] cursor-pointer"/>
                            </div>

                            <div className="sm:-mt-0 -mt-4 flex items-center md:justify-start justify-center md:w-fit w-full">  
                                <div className="flex md:flex-row flex-col gap-x-3 items-center">
                                    <div className="my-picture-style w-[52px] h-[52px] rounded-full flex">
                                        <img onLoad={e => {setIsImageLoaded(true)}} src={item.profile_picture} className={`${!isImageLoaded ? "animate-pulse bg-gray-500 px-4 py-4 object-cover w-full h-full" : "my-image-cover-style w-[100%] h-[100%] flex"} `}/>
                                    </div>

                                    <div className="flex flex-col sm:w-[150px] w-[90px]">
                                        <h1 className="md:text-start text-center text-[20px] truncate">
                                            {item.username}
                                        </h1> 

                                        <h1 className="md:text-start text-center text-[12px] italic text-wrap text-ellipsis">
                                            {item.role === "admin" ? "tagger" : "reviewer"}
                                        </h1> 
                                    </div>
                                </div>

                            </div>



                            <div className='sm:text-center md:mt-0 mt-3 text-sm'>
                                Reg Date: {item.registration_date}
                            </div>

                            <div className="flex md:mt-0 mt-6 md:w-fit sm:w-full w-fit mx-auto">
                                <select onClick={e => selectValue_(item.id)} value= {item.role === "admin" ? "Tagger" : "Reviewer"} onChange={e => {setRole(e.target.value)}} className="cursor-pointer md:w-fit w-full py-2 px-6 border border-gray-300 rounded-2xl text-[12px]">
                                    <option >Tagger</option>
                                    <option >Reviewer</option>
                                </select>

                            </div>


                            <div className="flex items-center gap-x-6 md:w-fit w-full">
                                <button className="my-shadow-style md:w-fit w-full py-2 cursor-pointer flex md:justify-start justify-center md:items-start items-center text-[12px]  px-6 text-black  bg-white md:mt-0 mt-2 rounded-3xl border border-gray-300 hover:bg-black hover:border hover:border-white hover:text-white">
                                    View Profile
                                </button>

                                <RiDeleteBinLine onClick={(e) => {cancel_delete_(item.id)}} className="hover:bg-gray-300 rounded-full text-red-700 md:flex hidden scale-[150%] cursor-pointer"/>
                            </div>
                        </div>
                    ))
                    

                    : 

                    <grid className= "grid grid-rows-3 gap-y-4">
                        <div className="animate-pulse bg-gray-500 h-36 flex md:flex-row flex-col md:items-center justify-between w-full md:h-[65px] p-3 px-6 border rounded-xl" />
                        <div className="animate-pulse bg-gray-500 h-36 flex md:flex-row flex-col md:items-center justify-between w-full md:h-[65px] p-3 px-6 border rounded-xl" />
                        <div className="animate-pulse bg-gray-500 h-36 flex md:flex-row flex-col md:items-center justify-between w-full md:h-[65px] p-3 px-6 border rounded-xl" />
                    </grid>
            }  

        </div>
    )
}

export default UsersLists;