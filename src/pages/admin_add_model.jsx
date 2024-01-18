import { IoSearchSharp } from "react-icons/io5";
import CardsGridManagement from "../components1/cardsgridmanagement";
import emapping from "../assets1/images/emapping.png"
import { LuImagePlus } from "react-icons/lu";
import { TbBoxModel2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { FirstJsonClass, FormData_, api_root, keep_m_name, store_first_json, store_form_data } from "../api/api_variables";
import axios from "axios";
import SessionExpired from "../components1/session_expired";




export default function AdminAddModel() {
    const navigate= useNavigate();
    const axios_new = require('axios');


    const [is_expired, set_is_expired]= useState(false);
    const is_expired_ = (e) => {
        if (e.code === "ERR_BAD_REQUEST"){
            set_is_expired(true)
        }
        else{set_is_expired(false)}
    }


    const view_admin= useNavigate();
    function view_admin_(event){
        view_admin('/view-admin', {relative: true});
    }

    const dashboard_management= useNavigate();
    function dashboard_(event){
        // If you want to rewrite current page in history with the target page, use replace: true. Otherwise, leave out the config object or set replace: false.
        dashboard_management('/admin-model-management', {relative: true});
    }

    const home_page= useNavigate();
    function home_page_(event){
        // If you want to rewrite current page in history with the target page, use replace: true. Otherwise, leave out the config object or set replace: false.
        navigate('/', {relative: true});
    }


    const [picture_text, set_picture_text]= useState("Click to attach cover image");
    const [model_text, set_model_text]= useState("Click to attach model file");
    const [validation_text, set_validation_text]= useState("");

    const [model_name, set_model_name]= useState('');
    const model_name_= (e) => {
        if (model_name.trim().length !== 0){
            set_validation_text("");
        }
        set_model_name(e.target.value);
    }

    const [model_description, set_model_description]= useState('');
    const model_description_= (e) => {
        if (model_description.trim().length !== 0){
            set_validation_text("");
        }
        set_model_description(e.target.value);
    }

    

    // const fileInputRef = useRef(null);
    const [pick_file, set_pick_file]= useState(null);
    const pick_file_ = (e) => {
        // console.log(e.target.files[0]);
        const file_picked= e.target.files[0];
        set_pick_file(file_picked);

        try{set_model_text(file_picked.name);}
        catch{set_model_text('Click to attach model file');}
        
        set_validation_text("")
        // fileInputRef.current.click()) ;
    }

    const [pick_picture, set_pick_picture]= useState(null);
    const pick_picture_ = (e) => {
        const file_picked= e.target.files[0];
        set_pick_picture(file_picked);
        
        try{set_picture_text(file_picked.name);}
        catch{set_picture_text('Click to attach cover image');}

        set_validation_text("")
    }



    let access_token;
    const getCookie = (name) => {
        const cookies = document.cookie.split(';');

        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.trim().split('=');

            if (cookieName === name) {
            return decodeURIComponent(cookieValue);
            }
        }

        return null;
    };

    const handleGetCookie = () => {
        // Retrieve the value of the "exampleCookie" cookie
        access_token = getCookie('access_token');
        return
    };





    const [isFinished, setFinished]= useState(false);
    const [showProcessing, setshowProcessing]= useState(false);
    useEffect(() => {

        function capitalizeEachWord(sentence) {
            // Split the sentence into words
            const words = sentence.split(' ');
          
            // Capitalize the first letter of each word
            const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
          
            // Join the words back into a sentence
            const capitalizedSentence = capitalizedWords.join(' ');
          
            return capitalizedSentence;
          }


        const capital_model_name= capitalizeEachWord(model_name.trim());
        if (isFinished){
          // If you want to rewrite current page in history with the target page, use replace: true. Otherwise, leave out the config object or set replace: false.
          navigate(`/add-model-objects/${capital_model_name}`, {relative: true});
        }
    }, [isFinished]); //this effect when isLoggedIn changes




    function loginPostRes(res){
        alert("Continue to add object interactions");
        setFinished(true);
        setshowProcessing(false);
      }



    const post_request= async(data_upload, string_json_upload) => {
        setshowProcessing(true);

        handleGetCookie();
        if (access_token === null){
            navigate('/admin-login', {relative: true});
        }
        
        else{
            const req= await axios.request(
                {
                    method: 'post',
                    data: data_upload,
                    maxBodyLength: Infinity,
                    url: api_root + 'admin/add-model?request_body='+string_json_upload,
                    headers: { 
                      'Authorization': access_token,
                      'Content-Type': 'multipart/form-data',
                    }
                }
            )
            .then(res => loginPostRes(res))
            .catch((error) => {
                console.log(error);
                setshowProcessing(false);
            });
        }
        // else{
        //     console.log(access_token);
        //     axios.post(api_root + 'admin/add-model2?request_body='+string_json_upload, {
        //         data_upload,

        //         headers: {
        //             'Authorization': access_token,
        //             'Content-Type': 'multipart/form-data', // Add other headers if needed
        //             'accept': 'application/json'
        //             // 'accept': 'application/json'
        //           }

        //         // params: {
        //         //     request_body: "erfe"
        //         // },
        //     }).then(res => (null))
        //     .catch(e => is_expired_(e));
        // }
    }


    const form_data= () => {
        const m_name= model_name.trim();
        const m_desc= model_description.trim();

        if (m_name.length === 0){
            return set_validation_text("Type in a model name");
        }

        if (m_desc.length === 0){
            return set_validation_text("Type in a short description for the model");
        }

        if (!pick_file) {
            // alert('Please add a model file');
            set_validation_text("Please pick a model file")
            return;
        }

        if (!pick_picture) {
            // alert('Please add a picture file');
            set_validation_text("Please pick a picture file")
            return;
        }

        // var model_desc= {"id": m_name,   "description_model": m_desc};
        var model_desc= {"id": m_name,   "description_model": m_desc, "objects_data": []};

        let formData = new FormData();
        // const data_reader= new FileReader();
        // data_reader.readAsDataURL(pick_picture);
        // data_reader.onload= reader_event => {
        //     formData.append('picture_cover', reader_event.target.result);
        // }

        // formData.append('picture_cover', pick_picture, pick_picture.name);
        // formData.append('model_object', pick_file, pick_file.name);

        formData.append('picture_cover', pick_picture);
        formData.append('model_object', pick_file);

        let first_json= new FirstJsonClass(JSON.parse(JSON.stringify(model_desc)));
        let form_data_= new FormData_(formData);
        
        
        
        first_json= JSON.parse(JSON.stringify(model_desc)); //this type of copying, is a deep copy that enables the copying of all the original object as a new object of its own

        console.log(formData.get('model_object'));
        
        keep_m_name.pop(m_name);
        const json_to_string= `{"id":"${m_name}", "description_model":"${m_desc}", "objects_data":[]}`;
        post_request(formData, json_to_string);

        // console.log(first_json.name);
        // console.log(form_data_.name.get('picture_cover'));
        // first_json.name['new_value']= "Here it is";
        // console.log(store_first_json);
        // console.log(first_json.name);
        // console.log(store_form_data.get('picture_cover'));


    }
    

    return (
        !is_expired 
            ?
                <div>
                    <div className="max-h-screen h-screen grid grid-cols-4 justify-center items-center mx-auto bg-[#C3B598] pb-10">
                        
                        <div className= "text-white relative overflow-hidden h-screen justify-start justify-items-start items-start text-start bg-[#714E2C]"> 
                            <img alt="/" src={emapping} onClick={home_page_} className="cursor-pointer absolute top-5 left-0 right-0 mx-auto w-[158px]"/>

                            <div className="absolute top-32  left-0 right-0 w-full space-y-5">
                                <h1 onClick={dashboard_} className="cursor-pointer text-center">Dashboard</h1>
                                <h1 onClick={view_admin_} className="cursor-pointer text-center -ml-[1.5rem]">Admins</h1>
                                <h1 className="text-center -ml-[2.0rem]">Report</h1>
                            </div>

                            <h1 className="-ml-[2.0rem] text-center absolute bottom-10 left-0 right-0 underline">Logout</h1>
                        </div>
                        
                        
                        
                        <div className="h-screen overflow-y-scroll col-span-3 flex flex-col  items-center justify-start py-4 pb-12">
                            <h1 className="flex text-[30px] text-[#714E2C] font-bold text-center mb-7">Add Model</h1>

                            <h1 className="text-center self-stretch flex flex-col mx-[20%]">
                                <input onChange={e => model_name_(e)} value={model_name} autoFocus className="flex shadow-md shadow-gray-500 text-left my-4 px-4 pl-6 py-2 rounded-full bg-[#B9A88B] placeholder-[#714E2C] text-[#714E2C]"  type="text" placeholder="Model Name"/>
                                <textarea onChange={e => model_description_(e)} value={model_description} rows={3} maxLength={87} autoComplete="" className="resize-none flex shadow-md shadow-gray-500 text-left px-4 pl-6 py-3 rounded-full bg-[#B9A88B] placeholder-[#714E2C] text-[#714E2C]"  type="text" placeholder="Model Description"/>

                                <div className="relative hover:bg-[#714E2C] hover:text-[#B9A88B] my-4 shadow-md shadow-gray-500  bg-[#B9A88B] text-[#714E2C] py-8 rounded-full">
                                    <TbBoxModel2 className="mx-auto size-[65px] my-2" />
                                    <h1 className="abolute left-0 right-0 top-0 bottom-0">{model_text}</h1>
                                    <input onChange={e => pick_file_(e)} type="file" accept=".zip, .glb, .dae" className="w-full h-full absolute top-0 bottom-0 left-0 right-0 opacity-0"/>
                                </div>

                                <div className="relative hover:bg-[#714E2C] hover:text-[#B9A88B] my-4 shadow-md shadow-gray-500  bg-[#B9A88B] text-[#714E2C] py-8 rounded-full">
                                    <LuImagePlus className="mx-auto size-[65px] my-2" />
                                    <h1 className="abolute left-0 right-0 top-0 bottom-0">{picture_text}</h1>
                                    <input onChange={e => pick_picture_(e)} type="file" accept=".jpg, .jpeg, .png, .webp" className="w-full h-full absolute top-0 bottom-0 left-0 right-0 opacity-0"/>
                                </div>

                                <div className="font-bold text-red-700 my-2">{validation_text}</div>

                                {/* <div className="h-6 bg-gray-400 rounded-full w-[100%] my-4 shadow-md shadow-gray-500">
                                    <div className="text-white bg-blue-700 rounded-full w-[35%]">35%</div>
                                </div> */}
                                <button onClick={form_data} className="shadow-md shadow-gray-600 drop-shadow border border-[#B9A88B] hover:text-[#714E2C] hover:bg-white hover:border-[#714E2C] bg-[#714E2C] text-white px-8 py-2  rounded-full font-bold">Upload Model</button>
                            
                            </h1>

                        </div>
                        
                    </div>




                    {showProcessing 
                            ? 
                            <div className="fixed h-screen bg-black/70 text-center text-white flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0">
                            <svg className="animate-spin h-10 w-10 bg-blue-500 mb-4" viewBox="0 0 24 24">
                            </svg>
                            Uploadind data...
                            </div>
                                
                            : <div> </div>}
                </div>
            



            : <SessionExpired />
    );
  }
