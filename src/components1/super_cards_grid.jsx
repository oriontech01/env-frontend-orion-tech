import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { FaCircle } from "react-icons/fa";


import { selected_models } from "../pages/super_admin_management";
import { keep_for_edit_name, keep_for_edit_url, keep_for_object_view, save_for_object_view } from "../api/api_variables";

const SuperCardsGridManagement= (model_json_data) => {
    const navigate= useNavigate();
    function navigate_page(event){
        // If you want to rewrite current page in history with the target page, use replace: true. Otherwise, leave out the config object or set replace: false.
        navigate('/single-model-view', {relative: true});
    }
    

    const [selectValue, makeSelect]= useState(null);
    const selectValue_= (index) => {
        if (!selected_models.includes(index)){
            selected_models.push(index);
        }
        else{
            const get_index= selected_models.indexOf(index);
            selected_models.splice(get_index, 1);
        }

        console.log(selected_models);
        // const get_Check= document.getElementById(index)
        // if (get_Check === true){
            
        // }

        // else{
        //     // console.log(index);
        //     // console.log("It is a false o");
        // }
    }

    function model_edit_(object_name, file_model){
        keep_for_edit_name.length= 0;
        keep_for_edit_url.length= 0;

        keep_for_edit_name.push(object_name);
        keep_for_edit_url.push(file_model);

        navigate('/add-model-objects', {relative: true});
        // navigate('/admin-edit-model', {relative: true});
    }


    function model_view_(model_id){
        navigate(`/view-model-objects/${model_id}`, {relative: true});
        // navigate('/admin-edit-model', {relative: true});
    }







    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };

    const {json_data}= model_json_data; //same as const message = props.message;

    const model_images= [];
    var cards= [false, false, false, false, false, false];

    for (let i =0; i <  json_data.length; i ++){
        const user_models= json_data[i].user_models;
        for (let i2= 0; i2 < user_models.length; i2 ++ ){
            // console.log(user_models[i2].picture_cover);
            model_images.push(
                <div key={user_models[i2].picture_cover}>
                    <div className={`${!isImageLoaded ? "animate-pulse shadow-md drop-shadow-lg shadow-[#30302e] relative w-[367px] h-[243px] bg-[#d4d2d2] rounded-xl overflow-hidden" : "shadow-md drop-shadow-lg shadow-[#30302e] relative w-[367px] h-[243px] bg-[#d4d2d2] rounded-xl overflow-hidden"}`}>
                        <img onLoad={handleImageLoad} alt="/" src={user_models[i2].picture_cover} className={`${isImageLoaded ? "opacity-100" : "opacity-0"} absolute object-cover w-[100%] h-[100%]`}/>
                        
                        <div className="hover:bg-slate-100 hover:scale-105 duration-300">
                            <div className="flex absolute w-[367px] h-[243px] bg-[#3D3328] opacity-75 rounded-xl"></div>
                            {/* {cards[index] === true 
                                ? <div> </div>
                                
                                
                                : <FaCircle onClick={select_card(index)} className="shadow-2xl shadow-black drop-shadow size-6 absolute right-0  m-6 text-[#C3BFBF]"/>
                            } */}
                            
                            <input type="checkbox" id={i2} onClick={e => selectValue_(user_models[i2].id)} className="shadow-2xl shadow-black drop-shadow size-6 absolute right-0  m-6" />
                            <h1 className="absolute top-[144px] font-bold text-white text-[20px] mx-6">
                                {user_models[i2].id}
                            </h1>
                            <p className="absolute top-[175px] text-white text-[14px] mx-6">
                                {/* Dangote apartment is located at Puzzler street,Maitama, Abuja. */}
                                {user_models[i2].description_model}
                            </p>
                        </div> 
                    </div>

                    <div className="mx-4 my-4 flex flex-row justify-between">
                        {/* <button  onClick={e => {model_edit_(user_models[i2].id, user_models[i2].file_model)}} className="shadow-md shadow-gray-600 drop-shadow  hover:bg-[#714E2C] hover:border-white hover:text-white border border-[#714E2C] text-[#714E2C] font-bold text-[15px] px-8 py-3 rounded-2xl">Edit Model</button> */}
                        <button onClick={e => {model_view_(user_models[i2].id)}} className="shadow-md shadow-gray-600 drop-shadow border border-white text-white hover:text-[#714E2C] hover:bg-white hover:border-[#714E2C] bg-[#714E2C] px-8 py-3 rounded-2xl text-[15px] font-bold">View Model</button>
                    </div>
                </div>
            );
        }
    }


    // function select_card(index){
        
    // }

    

    return(
        <div className="flex flex-col justify-center items-center mx-[5%] mt-[8rem]">
            <div className="grid grid-cols-2 grid-flow-row justify-items-center  gap-y-7 gap-x-16 mb-10">
                
                {model_images}
                {/* <fieldset className="absolute">
                    <label>Choose your option</label>

                    https://drive.google.com/uc?export=view&id=1ySTEmHsHeT-esBuGYNbK0ybNANfQlPhv

                </fieldset> */}
            </div>

        </div>
    );
};

export default SuperCardsGridManagement;
