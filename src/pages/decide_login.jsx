import { useNavigate } from "react-router-dom";
import emapping from "../assets1/images/emapping.png"
import { useEffect, useState } from "react";
import axios from "axios";
import { api_root } from "../api/api_variables";
import Nav_ from "../components1/nav";

export default function DecideLogin() {
    const navigate= useNavigate();

  

    function home_page_(event){
      // If you want to rewrite current page in history with the target page, use replace: true. Otherwise, leave out the config object or set replace: false.
      navigate('/', {relative: true});
    }


   
    return (
      <div className="relative h-screen overflow-hidden">
        
      </div>
    );
  }