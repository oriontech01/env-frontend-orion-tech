import React, {useEffect, useState} from "react";
import image1 from "../assets1/images/1.png";
import image2 from "../assets1/images/2.png";
import image3 from "../assets1/images/3.png";
import image4 from "../assets1/images/4.png";
import image5 from "../assets1/images/5.png";
import image6 from "../assets1/images/6.png";
import { useNavigate, Link } from "react-router-dom";
import { api_root, model_images } from "../api/api_variables";
import axios from "axios";

const CardsGridAll= ({show_data}) => {

    const navigate= useNavigate();
    function navigate_page(event){
        // If you want to rewrite current page in history with the target page, use replace: true. Otherwise, leave out the config object or set replace: false.
        navigate('/view-all', {relative: true});
    }

    function model_view_(model_id){
        navigate(`/view-model-objects/${model_id}`, {relative: true});
        // navigate('/admin-edit-model', {relative: true});
    }




    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const handleImageLoad = () => {
        model_images.length=0;
        setIsImageLoaded(true);
    };
    


    const user_models= show_data;

    for (let i2= 0; i2 < user_models.length; i2 ++ ){
        model_images.push(
            <div key={user_models[i2].picture_cover} className={`${!isImageLoaded ? "animate-pulse shadow-md drop-shadow-lg shadow-[#30302e] relative w-[367px] h-[243px] bg-[#3D3328] rounded-xl overflow-hidden" : "shadow-md drop-shadow-lg shadow-[#30302e] relative w-[367px] h-[243px] bg-[#d4d2d2] rounded-xl overflow-hidden"}`}>
                <img onLoad={handleImageLoad} alt="/" src={user_models[i2].picture_cover} className={`${isImageLoaded ? "opacity-100" : "opacity-0"} absolute object-cover w-[100%] h-[100%]`}/>

                <div className="opacity-0 hover:opacity-100 hover:bg-slate-100 hover:scale-105 duration-300">
                    <div className="flex absolute w-[367px] h-[243px] bg-[#3D3328] opacity-75 rounded-xl"></div>
                    <button onClick={e => {model_view_(user_models[i2].id)}}  className="absolute right-0 rounded-full py-2 px-4 m-6 text-[#714E2C] bg-[#C3BFBF]">
                        View Model
                    </button>
                    <h1 className="absolute top-[144px] font-bold text-white text-[20px] mx-6">
                        {user_models[i2].id}
                    </h1>
                    <p className="absolute top-[175px] text-white text-[14px] mx-6">
                        {user_models[i2].description_model}
                    </p>
                </div> 
            </div>
        );

        if(i2 === 9){break;}
    }


    
    // set_model_json_data(model_images);

    


    {/* onMouseEnter={change_hover} onMouseLeave={change_hover} */}

    return(
        <div className="flex flex-col justify-center items-center mx-[5%] mt-[8rem]">
            <div className="grid grid-cols-3 grid-flow-row justify-items-center  gap-y-7 gap-x-16 mb-10">
                {model_images}
            </div>

        </div>
    );
};

export default CardsGridAll;
