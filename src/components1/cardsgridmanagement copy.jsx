import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { FaCircle } from "react-icons/fa";

import image1 from "../assets1/images/1.png";
import image2 from "../assets1/images/2.png";
import image3 from "../assets1/images/3.png";
import image4 from "../assets1/images/4.png";
import image5 from "../assets1/images/5.png";
import image6 from "../assets1/images/6.png";
import { model_json_data } from "../pages/admincoursemanagement";

const CardsGridManagement= (model_json_data) => {
    const {json_data}= model_json_data;

    const model_images= [image1, image2, image3, image4, image5, image6];
    var cards= [false, false, false, false, false, false];

    console.log(json_data);


    // function select_card(index){
        
    // }

    const navigate= useNavigate();
    function navigate_page(event){
        // If you want to rewrite current page in history with the target page, use replace: true. Otherwise, leave out the config object or set replace: false.
        navigate('/single-model-view', {relative: true});
    }
    

    const [selectValue, makeSelect]= useState(false);
    const select_card= (index) => {
        //makeSelect(!selectValue);
        const get_Check= document.getElementById(index)
        //makeSelect(!selectValue);
        if (get_Check === true){
            // console.log(index);
            // console.log("It is true");
        }

        else{
            // console.log(index);
            // console.log("It is a false o");
        }
    }

    function model_edit_(event){
        navigate('/admin-edit-model', {relative: true});
    }


    return(
        <div className="flex flex-col justify-center items-center mx-[5%] mt-[8rem]">
            <div className="grid grid-cols-2 grid-flow-row justify-items-center  gap-y-7 gap-x-16 mb-10">
                {model_images.map((item, index) => (
                    <div key={index}>
                        <div className="shadow-md drop-shadow-lg shadow-[#30302e] relative w-[367px] h-[243px] bg-[#d4d2d2] rounded-xl overflow-hidden">
                            <img alt="/" src={item} className="absolute object-cover w-[100%] h-[100%]"/>

                            <div className="hover:bg-slate-100 hover:scale-105 duration-300">
                                <div className="flex absolute w-[367px] h-[243px] bg-[#3D3328] opacity-75 rounded-xl"></div>
                                {/* {cards[index] === true 
                                    ? <div> </div>
                                    
                                    
                                    : <FaCircle onClick={select_card(index)} className="shadow-2xl shadow-black drop-shadow size-6 absolute right-0  m-6 text-[#C3BFBF]"/>
                                } */}
                                
                                <input type="checkbox" id={index} onClick={select_card(index)} className="shadow-2xl shadow-black drop-shadow size-6 absolute right-0  m-6" />
                                <h1 className="absolute top-[144px] font-bold text-white text-[20px] mx-6">
                                    Dangote Apartment
                                </h1>
                                <p className="absolute top-[175px] text-white text-[14px] mx-6">
                                    Dangote apartment is located at Puzzler street,Maitama, Abuja.
                                </p>
                            </div> 
                        </div>

                        <div className="mx-4 my-4 flex flex-row justify-between">
                            <button  onClick={model_edit_} className="shadow-md shadow-gray-600 drop-shadow  hover:bg-[#714E2C] hover:border-white hover:text-white border border-[#714E2C] text-[#714E2C] font-bold text-[15px] px-8 py-3 rounded-2xl">Edit Model</button>
                            <button onClick={navigate_page} className="shadow-md shadow-gray-600 drop-shadow border border-white text-white hover:text-[#714E2C] hover:bg-white hover:border-[#714E2C] bg-[#714E2C] px-8 py-3 rounded-2xl text-[15px] font-bold">View Model</button>
                        </div>
                    </div>
                ))}
                
                {/* <fieldset className="absolute">
                    <label>Choose your option</label>
                </fieldset> */}
            </div>

        </div>
    );
};

export default CardsGridManagement;
