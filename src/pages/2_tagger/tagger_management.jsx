import { IoSearchSharp } from "react-icons/io5";
import emapping from "../../assets/images/emapping.png"
import { IoAddCircle } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { api_root, bearer_token, keep_json_data } from "../../api/api_variables";
import SessionExpired from "../../components/1_super_admin/session_expired";
import { handleDeleteCookie } from "../../api/delete_cookie";



export let selected_models= [];

export default function AdminManagement() {
    var access_token;

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

    const handleGetCookie = () => {
        // Retrieve the value of the "exampleCookie" cookie
        access_token = getCookie('access_token');
    };



    const navigate= useNavigate();
    const handleLogout= () => {
        handleDeleteCookie();
        navigate('/user-login', {relative: true});
    }


    function model_add_(event){
        // If you want to rewrite current page in history with the target page, use replace: true. Otherwise, leave out the config object or set replace: false.
        navigate('/admin-add-model', {relative: true});
    }

    function view_admin_(event){
        navigate('/view-admin', {relative: true});
    }

    function dashboard_(event){
        // If you want to rewrite current page in history with the target page, use replace: true. Otherwise, leave out the config object or set replace: false.
        navigate('/admin-model-management', {relative: true});
    }

    function home_page_(event){
        // If you want to rewrite current page in history with the target page, use replace: true. Otherwise, leave out the config object or set replace: false.
        navigate('/', {relative: true});
    }




    const [is_model_delete, set_is_model_delete]= useState(false);
    const [model_json_data, set_model_json_data]= useState([]);
    const model_json_data_= (res) => {
        keep_json_data.length= 0;
        keep_json_data.push(res.data);
        set_model_json_data(res.data);
    };



    useEffect(() => {
        selected_models=[];

        handleGetCookie();
        if (access_token === null){
            navigate('/user-login', {relative: true});
        }

        else{
            axios.get(api_root + 'admin/get-user', {
                headers: {
                    'Authorization': access_token,
                    'Content-Type': 'application/json', // Add other headers if needed
                  },
            }).then(res => model_json_data_(res))
            .catch(e => is_expired_(e));
        }
    }, [is_model_delete]); //the empty array is very important at the back, which means we are saying the effect does not depends on anything so as to prevent it from autorefiring by itself after first run of the page loading, even if there is any varibale or thing that changes in it





    function allow_search(){
        document.getElementById('search_input').focus();
    }

    const [cancel_delete, setDelete]= useState(false);
    const cancel_delete_= () => {
        setDelete(!cancel_delete);
    }

    const [continue_delete, setContinueDelete]= useState(false);
    const continue_delete_= () => {
        // console.log(selected_models);
        // setContinueDelete(!continue_delete);


        setContinueDelete(!continue_delete);

        handleGetCookie();
        if (access_token === null){
            navigate('/admin-login---', {relative: true});
        }
        
        else{
            axios.request(
                {
                    method: 'delete',
                    url: api_root + `admin/delete-model-super-admin?id=[${selected_models}]`,
                    headers: { 
                        'Authorization': access_token,
                        'Content-Type': 'application/json'
                    },

                    data: selected_models
                    // params: {
                    //     id: selected_models
                    // },
                }
            )
            .then((response) => {
                setContinueDelete(false);
                cancel_delete_();
                
                set_is_model_delete(!is_model_delete);
            })
            .catch((error) => {
                console.log(error);
                setContinueDelete(false);
                cancel_delete_();
            });

        }
    }

    

    return (
        <div>
        
        </div>
    );
  }
