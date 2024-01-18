
import { IoSearchSharp } from "react-icons/io5";

import image1 from "../assets1/images/1.png";
import success_mark from "../assets1/images/success_mark.png";
import { useEffect, useState } from "react";
import { FirstJsonClass, api_root, keep_current_object, keep_for_edit_name, keep_for_edit_url, keep_m_name, keep_objects_data, keep_objects_data_reference, keep_objects_reference, store_first_json, store_form_data } from "../api/api_variables";
import Nav_New from "../components1/nav_new";
import { AddAnimation } from "../animation_three_js/add_animation";


import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import background from '../animation_three_js/assets/images/background2.jpg';
import { ModelAnimation } from "../animation_three_js/animation_components/model_animation";
import { AmbientLight } from "../animation_three_js/animation_components/ambient_light";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { handleDeleteCookie } from "../api/delete_cookie";
import SessionExpired from "../components1/session_expired";


// import model_scene from '../animation_three_js/public/models/room/scene.gltf'


// let notify_double_click= false;
// export function set_notify_double_click() {
//   notify_double_click= !notify_double_click;
//   console.log(notify_double_click);
// };




export default function AddObjectsModel() {
      const { dynamicParam } = useParams();


      const keep_for_model_file= [];

      
      const model_json_data_= (res) => {
          keep_for_model_file.length= 0;
          keep_for_edit_url.length= 0;

          const get_for_object_view= res.data;
            
            // keep_for_object_view[object_view['id']]= object_view['objects_data'];
            keep_for_model_file.push(get_for_object_view['file_model']);
            keep_for_edit_url.push(get_for_object_view['file_model']);
      };

      const [is_expired, set_is_expired]= useState(false);
      const is_expired_ = (e) => {
          if (e.code === "ERR_BAD_REQUEST"){
              handleDeleteCookie();
              set_is_expired(true)
          }
          else{set_is_expired(false)}
      }

      useEffect(() => {

        handleGetCookie();
        if (access_token === null){
            navigate('/admin-login', {relative: true});
        }

        else{

            const req= axios.request(
                {
                    method: 'get',
                    // maxBodyLength: Infinity,
                    url: api_root + 'home-models/get-a-model/'+dynamicParam,
                    headers: { 
                      'Content-Type': 'application/json'
                    }
                    
                }
            )
            .then(res => model_json_data_(res))
            .catch((error) => {
                is_expired_(error);
                console.log(error);
            });

        }
    }, []); 

    const [listeria, set_listeria]= useState('');
    const [apc, set_apc]= useState('');
    const [salmonella, set_salmonella]= useState('');
    const [date_, set_date_]= useState('');
    const [time_, set_time_]= useState('');
    const [type_, set_type_]= useState('');
    const [comment_, set_comment_]= useState('');


    const [isFinished, setFinished]= useState(false);
    const [showProcessing, setshowProcessing]= useState(false);


    // useEffect(() => {
    //   console.log(notify_double_click);
    //   // if (notify_double_click > 0){
    //   //   set_is_double_clk(true);
    //   // }
    // }, [notify_double_click]);



    let [show_obj_d, set_show_obj_d] =useState({});
    const show_obj_d_= (obj) => {
      try{
        notify_double_click(null, true);
        set_listeria(keep_objects_data_reference[obj].listeria);
        set_apc(keep_objects_data_reference[obj].apc);
        set_salmonella(keep_objects_data_reference[obj].salmonella);
        set_date_(keep_objects_data_reference[obj].date_of_sample);
        set_time_(keep_objects_data_reference[obj].time_of_sample);
        set_type_(keep_objects_data_reference[obj].type_of_sample);
        set_comment_(keep_objects_data_reference[obj].comment_box);
        // alert(keep_objects_data_reference[obj].comment_box);
      }
      catch{}
    }


    let [is_double_clk, set_is_double_clk]= useState(false);
    const [key_value, store_key_value] =useState('');
    const notify_double_click= (value, state_value) => {
      if(value){
        store_key_value(value);
      }
      set_is_double_clk(state_value);
    }



    const add_data_call= () => {
      const data_json= {
        "object_name": key_value,
        "listeria": listeria,
        "apc": apc,
        "salmonella": salmonella,
        "date_of_sample": date_,
        "time_of_sample": time_,
        "type_of_sample": type_,
        "comment_box": comment_
      }

      keep_objects_data.push(
        data_json
      );
      keep_objects_data_reference[key_value]= data_json;
      keep_objects_reference.push(key_value);

      // console.log(keep_objects_data);
      notify_double_click(null, false);
    }


    



    

    const navigate= useNavigate();
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
        console.log(access_token);
        return
    };



    const post_request= (json_data) => {
      setshowProcessing(true);

      handleGetCookie();
      if (access_token === null){
          navigate('/admin-login', {relative: true});
      }
      
      else{
          axios.request(
              {
                  method: 'post',
                  data: json_data,
                  maxBodyLength: Infinity,
                  url: api_root + 'admin/object-add-model',
                  headers: { 
                    'Authorization': access_token,
                    'Content-Type': 'application/json',
                  }
              }
          )
          .then((response) => {
              // console.log(JSON.stringify(response.data));
              alert("Data added ")
              setshowProcessing(false);
          })
          .catch((error) => {
              console.log(error);
              setshowProcessing(false);
          });
      }
  }




  const upload_all= () =>{
    // const string_upload= `{"id":"${keep_m_name[0]}", "objects_data":["${keep_objects_data}"]}`
    const json_upload= {"id":dynamicParam, "objects_data": keep_objects_data}
    
    console.log(json_upload);
    post_request(json_upload);
  }







    
    return (

      !is_expired 
      ?
        <div className="max-h-screen h-screen flex flex-col">
          {/* <Nav_New /> */}

          <div className="relative h-screen object-cover overflow-hidden">
            <div className= "right-0 left-0 top-0 bottom-0 overflow-hidden grid grid-cols-4 h-screen  bg-[#EEEEEE]">
                {/* <div className="bg-black col-span-3 " >

                </div> */}

                {/* <img alt="/" src={image1} className="col-span-3 object-cover w-screen h-screen"/> */}

                
                
                
                <section className="col-span-3 object-cover h-screen">
                  <AddAnimation notify_double_={notify_double_click} show_obj_= {show_obj_d_} for_model_file= {keep_for_model_file}/>
                </section>
                
              
        
                <h1  className= " my-6 overflow-y-auto mt-6 text-center flex flex-col">
                  <div  className={`${!is_double_clk ? "pointer-events-none opacity-50" : ""}  flex flex-col mx-10 mb-15 `}>
                    <h1  className="text-[#714E2C] font-bold text-left text-2xl pb-8">Input Data</h1>


                    <label  htmlFor="Listeria" className="flex flex-col text-left text-[#714E2C]">
                      Listeria
                    </label>
                    <select  value={listeria} onChange={e => {set_listeria(e.target.value)}}  className="text-[#714E2C] px-4 mt-1 flex shadow-md shadow-gray-500 text-left my-4   py-2  bg-[#B9A88B]">
                        <option >select value</option>
                        <option >Negative</option>
                        <option >Positive</option>
                    </select>

                    <label  htmlFor="APC" className="flex flex-col text-left text-[#714E2C]">
                      APC
                    </label>
                    <input  value={apc} onChange={e =>  {e.target.value <1001 ?  set_apc(e.target.value) : e.target.value=1000}} type="number" min={0} max={1000} placeholder="0 - 1000" className="placeholder:text-[#714E2C] text-[#714E2C] px-4 mt-1 flex shadow-md shadow-gray-500 text-left my-4  py-2  bg-[#B9A88B]" />

                    <label  htmlFor="Salmonella" className="flex flex-col text-left text-[#714E2C]">
                      Salmonella
                    </label>
                    <select  value={salmonella} onChange={e => {set_salmonella(e.target.value)}} className="text-[#714E2C] px-4 mt-1 flex shadow-md shadow-gray-500 text-left my-4   py-2  bg-[#B9A88B]">
                        <option >select value</option>
                        <option >Negative</option>
                        <option >Positive</option>
                    </select>

                    <label  htmlFor="Date of sample" className="flex flex-col text-left text-[#714E2C]">
                      Date of sample:
                    </label>
                    <input  value={date_} onChange={e => {set_date_(e.target.value)}} type="date" min={0} max={1000} placeholder="Type here" className= "text-[#714E2C] px-4 mt-1 flex shadow-md shadow-gray-500 text-left my-4  py-2  bg-[#B9A88B]" />

                    <label  htmlFor="Time of sample" className="flex flex-col text-left text-[#714E2C]">
                      Time of sample:
                    </label>
                    <input  value={time_} onChange={e => {set_time_(e.target.value)}} type="time" min={0} max={1000} placeholder="Type here" className= "text-[#714E2C] px-4 mt-1 flex shadow-md shadow-gray-500 text-left my-4  py-2  bg-[#B9A88B]" />

                    <label  htmlFor="Type of sample" className="flex flex-col text-left text-[#714E2C]">
                      Type of sample:
                    </label>
                    <input  value={type_} onChange={e => {set_type_(e.target.value)}} type="text" min={0} max={1000} placeholder="Type here" className="placeholder:text-[#714E2C] text-[#714E2C] px-4 mt-1 flex shadow-md shadow-gray-500 text-left my-4  py-2  bg-[#B9A88B]" />

                    <label  htmlFor="Comment Box" className="flex flex-col text-left text-[#714E2C]">
                      Comment Box:
                    </label>
                    <textarea  value={comment_} onChange={e => {set_comment_(e.target.value)}} type="text" min={0} max={1000} placeholder="Type here" className="placeholder:text-[#714E2C] text-[#714E2C] px-4 mt-1 flex shadow-md shadow-gray-500 text-left my-4  py-2  bg-[#B9A88B]" />


                    <button  onClick={add_data_call} className="shadow-md shadow-gray-600 drop-shadow border border-[#B9A88B] hover:text-[#714E2C] hover:bg-white hover:border-[#714E2C] bg-[#714E2C] text-white px-8 py-2 font-bold my-2 mb-6">Add Data</button>
                    <button className="shadow-md shadow-gray-600 drop-shadow hover:bg-[#714E2C] hover:border-white hover:text-white border border-[#714E2C] text-[#714E2C] font-bold text-[15px] px-2 py-2">Cancel</button>

                    {/* <button className="mt-8 shadow-md shadow-gray-600 drop-shadow border border-[#B9A88B] hover:text-[#08a121] hover:bg-white hover:border-[#08a121] bg-[#08a121] text-white px-8 py-2 font-bold my-2 mb-6">Upload</button>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br /> */}
                  </div>

                  <button onClick={upload_all} className="mx-2 mt-8 shadow-md shadow-gray-600 drop-shadow border border-[#B9A88B] hover:text-[#08a121] hover:bg-white hover:border-[#08a121] bg-[#08a121] text-white px-8 py-2 font-bold my-2 mb-6">Upload</button>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </h1>
      


            </div>



            {showProcessing 
                ? 
                <div className="fixed h-screen bg-black/70 text-center text-white flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0">
                    <svg className="animate-spin h-10 w-10 bg-blue-500 mb-4" viewBox="0 0 24 24">
                    </svg>
                    Please wait...
                </div>
                    
                : <div> </div>}



            {/* <div className="fixed h-screen bg-black/70 text-center text-white flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0">
                <svg className="animate-spin h-10 w-10 bg-blue-500 mb-4" viewBox="0 0 24 24">
                </svg>
                Uploading data
            </div> */}

            {/* <div className="bg-[#B9A88B] h-screen flex flex-col justify-center items-center absolute top-0 bottom-0 left-0 right-0 ">
              <img alt="/" src={success_mark} className="jmx-auto size-[177.19px]" />
              <h1 className="text-[38px] text-center">Upload successful</h1>
              <button className="border border-[#B9A88B] hover:text-[#714E2C] hover:bg-white hover:border-[#714E2C] bg-[#714E2C] text-white px-8 py-2 mt-20 font-bold my-2">Back to dashboard</button>
            </div> */}
            
          </div>
        </div>
      

      : <SessionExpired />
    );
  }
