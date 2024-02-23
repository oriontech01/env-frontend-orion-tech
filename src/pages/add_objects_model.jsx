
import { IoSearchSharp } from "react-icons/io5";

import { useEffect, useState } from "react";
import { FirstJsonClass, api_root, keep_current_object, keep_for_edit_name, keep_for_edit_url, keep_for_object_view, keep_for_view_url, keep_m_name, keep_objects_data, keep_objects_data_reference, keep_objects_reference, reset_values, store_first_json, store_form_data } from "../api/api_variables";
import { AddAnimation } from "../animation_three_js/add_animation";


import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
// import background from '../animation_three_js/assets/images/background2.jpg';
import { ModelAnimation } from "../animation_three_js/animation_components/model_animation";
import { AmbientLight } from "../animation_three_js/animation_components/ambient_light";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { handleDeleteCookie } from "../api/delete_cookie";
import DesktopMenu from "../components/1_super_admin/desktop_menu";
import NavHeader from "../components/1_super_admin/nav_header";
import MobileMenu from "../components/1_super_admin/mobile_menu";
import { getCookie } from "../api/cookies_logic";
import { BsBoxArrowUp } from "react-icons/bs";



export default function AddObjectsModel() {
      const { dynamicParam } = useParams();


      const navigate= useNavigate();

      function home_page_(event){
          // If you want to rewrite current page in history with the target page, use replace: true. Otherwise, leave out the config object or set replace: false.
          navigate('/', {relative: true});
      }
    

      const keep_for_model_file= [];

      const [has_loaded, set_has_loaded]= useState(false);
      const model_json_data_= (res) => {
          set_has_loaded(false);

          keep_for_object_view.length= 0;
          // keep_for_model_file.length= 0;
          // keep_for_edit_url.length= 0;
          reset_values();

          const get_for_object_view= res.data;
            
          // keep_for_object_view[object_view['id']]= object_view['objects_data'];
          keep_for_model_file.push(get_for_object_view['file_model']);

          keep_for_view_url.push(get_for_object_view['file_model']);

          for (let i =0; i < get_for_object_view['objects_relationship'].length; i++){
            const get_object= get_for_object_view['objects_relationship'][i];
            keep_for_object_view[get_object['object_name']]= get_object;
          }

          set_has_loaded(true);
      };

      const [is_expired, set_is_expired]= useState(false);
      const is_expired_ = (e) => {
          if (e.code === "ERR_BAD_REQUEST"){
              handleDeleteCookie();
              set_is_expired(true)
          }
          else{set_is_expired(false)}
      }



      let access_token;

      const handleGetCookie = () => {
          access_token = getCookie('access_token');
      };
  

      useEffect(() => {
        handleGetCookie();
        if (access_token === null){
            navigate('/', {relative: true});
        }

        else{
            const req= axios.request(
                {
                    method: 'get',
                    timeout: 450000,
                    // maxBodyLength: Infinity,
                    url: api_root + 'home-models/get-a-model/'+dynamicParam,
                    headers: { 
                      'Authorization': access_token,
                      'Content-Type': 'application/json'
                    }
                    
                }
            )
            .then(res => model_json_data_(res))
            .catch((error) => {
                // is_expired_(error);
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



    const [mobileMenu, setMobileMenu]= useState(false);
    const mobileMenu_ = () => {
        setMobileMenu(!mobileMenu);
    }
  
  
  
    const [file_text, set_file_text]= useState("Choose a file or drag & drop it here");
    const [pick_picture, set_pick_file]= useState(null);
    const pick_picture_ = (e) => {
        if (!pick_picture) {
            const file_picked= e.target.files[0];
            set_pick_file(file_picked);
            
            try{set_file_text(file_picked.name);}
            catch{set_file_text('Choose a file or drag & drop it here'); set_pick_file(null);}
        }
  
        else{
            set_pick_file(null);
            set_file_text('Choose a file or drag & drop it here');
        }
  
        // set_validation_text("")
    }
  
  
    const [floatButtonHelp, setFloatButtonHelp]= useState(false);
  


    const [isFinished, setFinished]= useState(false);
    const [showProcessing, setshowProcessing]= useState(false);



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


  



    const post_request= (json_data) => {
      setshowProcessing(true);

      handleGetCookie();
      if (access_token === null){
          navigate('/', {relative: true});
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
    
    // console.log(json_upload);
    post_request(json_upload);
  }





    
  return (
    <div className="relative flex w-screen h-screen overflow-hidden">

      {/* +++++++++++++++ USING RELATIVE WITH SCROLLING MAKES THIS WORK ++++++++++++++++ */}
      <div className="relative overflow-hidden flex flex-col w-full">
        <div className="fixed left-0 right-0 top-0 bottom-0 flex w-full h-screen">
          
          
          <div className="relative bg-black h-full w-full">
            {
                has_loaded 
                  ?
                    <AddAnimation notify_double_={notify_double_click} show_obj_= {show_obj_d_} for_model_file= {keep_for_model_file}/>
                  
                  : ""
              }
          </div>


          <div className={`${!is_double_clk ? "pointer-events-none opacity-50" : ""} relative overflow-scroll w-[400px] h-screen bg-white`}>
            <div className="flex flex-col w-full px-4 mb-[200px]">
                <h1 className="text-lg font-medium">
                  Input Model Data
                </h1>

                <div className="flex flex-col mt-[30px] gap-y-3 text-sm">
                  <div className='flex flex-col'>
                      <label className='pl-2'>
                          Name of tagger:
                      </label>

                      <input type='text' placeholder='Enter the tagger here' className='shadow-md py-3 px-2 border rounded-xl'/>
                  </div>

                  <div className='flex flex-col'>
                      <label className='pl-2'>
                        Location:
                      </label>

                      <input type='text' placeholder='Enter the location here' className='shadow-md py-3 px-2 border rounded-xl'/>
                  </div>

                  <div className="flex flex-col">
                      <label className='pl-2'>
                        Listeria:
                      </label>

                      <select value={listeria} onChange={e => {set_listeria(e.target.value)}}  className="cursor-pointer w-full border shadow border-gray-300 rounded-2xl h-[47px] pl-1">
                          <option >Positive</option>
                          <option >Negative</option>
                      </select>
                  </div>

                  <div className='flex flex-col'>
                      <label className='pl-2'>
                        APC:
                      </label>

                      <input value={apc} onChange={e =>  {e.target.value <1001 ?  set_apc(e.target.value) : e.target.value=1000}} type="number" min={0} max={1000} placeholder="0 - 1000"  className='shadow-md py-3 px-2 border rounded-xl'/>
                  </div>

                  <div className="flex flex-col">
                      <label className='pl-2'>
                        Salmonella:
                      </label>

                      <select className="cursor-pointer w-full border shadow border-gray-300 rounded-2xl h-[47px] pl-1">
                          <option >Positive</option>
                          <option >Negative</option>
                      </select>
                  </div>

                  <div className='flex flex-col'>
                      <label className='pl-2'>
                        Date:
                      </label>

                      <input value={date_} onChange={e => {set_date_(e.target.value)}} type='date' className='shadow-md py-3 px-2 border rounded-xl'/>
                  </div>

                  <div className='flex flex-col'>
                      <label className='pl-2'>
                        Time:
                      </label>

                      <input value={time_} onChange={e => {set_time_(e.target.value)}} type='time' className='shadow-md py-3 px-2 border rounded-xl'/>
                  </div>

                  <div className='flex flex-col'>
                      <label className='pl-2'>
                        Type of sample:
                      </label>

                      <input  value={type_} onChange={e => {set_type_(e.target.value)}} type="text"  placeholder="Type here" className='shadow-md py-3 px-2 border rounded-xl'/>
                  </div>

                  <div className='flex flex-col'>
                      <label className='pl-2'>
                        Comment Box:
                      </label>

                      <textarea  value={comment_} onChange={e => {set_comment_(e.target.value)}} type="text" min={0} max={1000} placeholder="Type here"  className='shadow-md py-3 px-2 border rounded-xl'/>
                  </div>

                  <div className='flex flex-col'>
                      <label className='pl-2'>
                        Evidence:
                      </label>

                      <div className={`cursor-pointer relative hover:bg-black/60 hover:border-white hover:text-white ${pick_picture !== null ? "bg-green-500 hover:bg-green-400 text-white" : "bg-gray-200"} sm:mt-2 flex flex-col w-full justify-center items-center gap-y-4 border-2 border-gray-400 border-dashed py-8 px-2 rounded-2xl`}>
                          <BsBoxArrowUp className="size-10"/>
                          
                          <div className="flex flex-col gap-y-2 items-center">
                              <h1 className="font-bold text-center">{pick_picture ? "( Click to remove )" : file_text}</h1>
                          </div>

                          {
                              !pick_picture 
                              ?   <input  onChange={e => pick_picture_(e)}  type="file" className="opacity-0 absolute left-0 right-0 top-0 bottom-0"/>
                              : <div  onClick= {e => pick_picture_(e)}  className="opacity-0 absolute left-0 right-0 top-0 bottom-0"/>
                          }

                      </div>
                  </div>

                  <button onClick={(e) => {add_data_call()}} className="mt-5 my-small-button-style gap-x-2 bg-yellow-500 text-white hover:bg-white hover:border hover:border-yellow-500 hover:text-yellow-500 my-shadow-style">
                    Add data <span className="text-3xl -mt-[6px]">+</span>
                  </button>


                {/* +++++++++++++++ FLOATING BUTTON AND HELPER ++++++++++++ */}
                <BsBoxArrowUp onMouseLeave={(e) => {setFloatButtonHelp(false)}} onMouseEnter={(e) => {setFloatButtonHelp(true)}} className="fixed sm:right-[52px] right-[12px] md:h-[60px] w-[60px] bottom-8 my-small-button-style bg-green-500 text-white hover:animate-pulse hover:border hover:bg-white hover:border-green-500 hover:text-green-500 my-shadow-style flex items-center rounded-full text-3xl" />

                
                {floatButtonHelp 
                    ? 
                    <h1 className="fixed right-[40px] sm:flex hidden bottom-[95px] text-white bg-green-600 rounded-xl px-2 text-sm font-medium text-center">Upload Data</h1>
                    : ""
                }


                </div>
            </div>
          </div>

        </div>
        
        
        <NavHeader navTitle= {"Models"} mobileMenuProp_= {mobileMenu_} mobileMenu= {mobileMenu}/>

      </div>


      <MobileMenu mobileMenu= {mobileMenu} sendActive= {"models"} />
  </div>
  );
  }
