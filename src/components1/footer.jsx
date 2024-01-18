import React from "react";
import digital_missionary from '../assets1/images/digital_missionary.png'
import orion_logo from '../assets1/images/orion_logo.png'

const Footer= () => {
    return(
        <div className="flex flex-row justify-center">
            <img alt="/" src={digital_missionary} className="w-[147px] justify-center" />

            <img alt="/" src={orion_logo} className="w-[97px] h-[92px] mt-5" />
        </div> 
    );
};

export default Footer;
