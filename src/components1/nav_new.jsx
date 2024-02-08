import React, {useState} from "react";
import emapping from "../assets1/images/emapping.png"
import { useNavigate } from "react-router-dom";
import orion_logo from '../assets1/images/orion_logo.png'

// const Nav= () => {

// };


const Nav_New= () => {
    const login_navigate= useNavigate();
    function login_(event){
        // If you want to rewrite current page in history with the target page, use replace: true. Otherwise, leave out the config object or set replace: false.
        login_navigate('/admin-login---', {relative: true});
    }

    const navigate= useNavigate();
    function navigate_page(event){
        // If you want to rewrite current page in history with the target page, use replace: true. Otherwise, leave out the config object or set replace: false.
        navigate('/view-all', {relative: true});
    }

    const home_page= useNavigate();
    function home_page_(event){
        // If you want to rewrite current page in history with the target page, use replace: true. Otherwise, leave out the config object or set replace: false.
        navigate('/', {relative: true});
    }

    return(
        <div className=" h-[70px] mx-auto mt-0 mb-1 w-screen flex flex-row justify-between items-center py-5 px-[10%] shadow-md shadow-gray-500">
            <img alt="/" src={emapping} onClick={home_page_} className="cursor-pointer w-[158px]"/>

            <ul className="flex flex-row justify-end text-white items-center">
                <img alt="/" src={orion_logo} className="w-[60px] h-[55px] mr-4" />
                <li onClick={home_page_} className="cursor-pointer px-4 font-bold text-[#714E2C]">HOME</li>
                <li onClick={navigate_page} className="cursor-pointer px-4 font-bold text-[#714E2C]">MODEL LIST</li>
                {/* <button onClick={login_} className="border border-white hover:text-[#714E2C] hover:bg-white hover:border-[#714E2C] bg-[#714E2C] px-8 py-3 rounded-xl font-bold">ADMIN LOGIN</button> */}
            </ul>
        </div>
    );
};

export default Nav_New;
