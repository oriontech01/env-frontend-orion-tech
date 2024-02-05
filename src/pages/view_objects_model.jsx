import { useEffect, useState } from "react";
import { FirstJsonClass, api_root, keep_current_object, keep_for_edit_name, keep_for_object_view, keep_for_view_url, keep_m_name, keep_objects_data, keep_objects_data_reference, keep_objects_reference, reset_values, save_for_object_view, store_first_json, store_form_data } from "../api/api_variables";
import Nav_New from "../components1/nav_new";
import { ViewAnimation } from "../animation_three_js/view_animation";
import { handleDeleteCookie } from "../api/delete_cookie";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import SessionExpired from "../components1/session_expired";
import emapping from "../assets1/images/emapping.png"





export default function ViewObjectsModel() {
  const { dynamicParam } = useParams();

  const keep_for_model_file= [];
  var access_token= null;




  const navigate= useNavigate();
  const handleLogout= () => {
      handleDeleteCookie();
      navigate('/admin-login', {relative: true});
  }

  function home_page_(event){
      // If you want to rewrite current page in history with the target page, use replace: true. Otherwise, leave out the config object or set replace: false.
      navigate('/', {relative: true});
  }



  const [is_expired, set_is_expired]= useState(false);
  const is_expired_ = (e) => {
      if (e.code === "ERR_BAD_REQUEST"){
          handleDeleteCookie();
          set_is_expired(true)
      }
      else{set_is_expired(false)}
  }


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

  // const handleGetCookie = () => {
  //     // Retrieve the value of the "exampleCookie" cookie
  //     access_token = getCookie('access_token');
  // };

  const [model_json_data, set_model_json_data]= useState([]);
  const [has_loaded, set_has_loaded]= useState(false);

  const model_json_data_= (res) => {
      set_has_loaded(false);
      // console.log(res.data);

      keep_for_object_view.length= 0;
      // keep_for_model_file.length= 0;
      // keep_for_view_url.length= 0;
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
      // console.log(keep_for_model_file);
  };



  useEffect(() => {
      axios.request(
          {
              method: 'get',
              timeout: 450000,
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

  }, []); //the em






    const [listeria, set_listeria]= useState('');
    const [apc, set_apc]= useState('');
    const [salmonella, set_salmonella]= useState('');
    const [date_, set_date_]= useState('');
    const [time_, set_time_]= useState('');
    const [type_, set_type_]= useState('');
    const [comment_, set_comment_]= useState('');



    let [is_double_clk, set_is_double_clk]= useState(false);
    const notify_double_click= (state_value) => {
      set_is_double_clk(state_value);
    }



    const show_obj_d_= (obj) => {
      try{
        if (obj){ 
          notify_double_click(true);

          set_listeria(keep_for_object_view[obj].listeria);
          set_apc(keep_for_object_view[obj].apc);
          set_salmonella(keep_for_object_view[obj].salmonella);
          set_date_(keep_for_object_view[obj].date_of_sample);
          set_time_(keep_for_object_view[obj].time_of_sample);
          set_type_(keep_for_object_view[obj].type_of_sample);
          set_comment_(keep_for_object_view[obj].comment_box);
          // alert(keep_objects_data_reference[obj].comment_box);
        }

        else{
          notify_double_click(false);

          set_listeria("");
          set_apc("");
          set_salmonella("");
          set_date_("");
          set_time_("");
          set_type_("");
          set_comment_("");
        
        }
      }
      catch{}
    }







    
    return (

      !is_expired 
        ?
          <div className="max-h-screen h-screen flex flex-col">
            {/* <Nav_New /> */}

            <div className="relative h-screen object-cover overflow-hidden">
              <div className= "right-0 left-0 top-0 bottom-0 overflow-hidden grid grid-cols-4 h-screen  bg-[#EEEEEE]">
        
                  <section className="col-span-3 object-cover h-screen">
                    {
                      has_loaded 
                        ?
                          <ViewAnimation  show_obj_= {show_obj_d_} for_object_view= {keep_for_object_view} for_model_file= {keep_for_model_file}/>
                        :
                          ""
                    }
                  </section>
                  



                  
                
                <div className="overflow-y-auto">
                  <div className="fixed flex w-screen bg-white shadow-sm shadow-black">
                    <img alt="/" src={emapping} onClick={home_page_} className="cursor-pointer w-[158px] m-4"/>
                  </div>
            
                  <h1  className= " my-6 overflow-y-auto mt-24 text-center flex flex-col">

                      <div  className={`${!is_double_clk ? "opacity-50" : ""}  flex flex-col mx-10 mb-15 pointer-events-none`}>

                        <h1  className="text-[#714E2C] font-bold text-left text-2xl pb-8">Data</h1>


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
                        <input  value={apc} onChange={e =>  {e.target.value <1001 ?  set_apc(e.target.value) : e.target.value=1000}} type="number" min={0} max={1000} className="placeholder:text-[#714E2C] text-[#714E2C] px-4 mt-1 flex shadow-md shadow-gray-500 text-left my-4  py-2  bg-[#B9A88B]" />

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
                        <input  value={date_} onChange={e => {set_date_(e.target.value)}} type="date" min={0} max={1000} className= "text-[#714E2C] px-4 mt-1 flex shadow-md shadow-gray-500 text-left my-4  py-2  bg-[#B9A88B]" />

                        <label  htmlFor="Time of sample" className="flex flex-col text-left text-[#714E2C]">
                          Time of sample:
                        </label>
                        <input  value={time_} onChange={e => {set_time_(e.target.value)}} type="time" min={0} max={1000} className= "text-[#714E2C] px-4 mt-1 flex shadow-md shadow-gray-500 text-left my-4  py-2  bg-[#B9A88B]" />

                        <label  htmlFor="Type of sample" className="flex flex-col text-left text-[#714E2C]">
                          Type of sample:
                        </label>
                        <input  value={type_} onChange={e => {set_type_(e.target.value)}} type="text" min={0} max={1000}  className="placeholder:text-[#714E2C] text-[#714E2C] px-4 mt-1 flex shadow-md shadow-gray-500 text-left my-4  py-2  bg-[#B9A88B]" />

                        <label  htmlFor="Comment Box" className="flex flex-col text-left text-[#714E2C]">
                          Comment Box:
                        </label>
                        <textarea  value={comment_} onChange={e => {set_comment_(e.target.value)}} type="text" min={0} max={1000} className="placeholder:text-[#714E2C] text-[#714E2C] px-4 mt-1 flex shadow-md shadow-gray-500 text-left my-4  py-2  bg-[#B9A88B]" />


                      </div>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                  </h1>
                </div>
        


              </div>



              
            </div>
          </div>
        

        : <SessionExpired />
    );
  }
