import axios from "axios";

// export default axios.create({
//     baseURL: 'https://http://127.0.0.1:8000/'
// });

export const api_root= 'https://env-api-e61k.onrender.com/';
export var bearer_token= null;
export let keep_json_data= [];
export const model_images= [];
export let keep_objects_data= [];
export let keep_objects_data_reference= {};
export let keep_objects_reference= [];
export let keep_current_object= [];

export let has_model_loaded= [];

export let save_for_object_view= [];

export let keep_for_edit_name= [];
export let keep_for_edit_url= [];
export let keep_for_view_url= [];

export let keep_m_name= [];


export var store_first_json;
export var store_form_data;

export class FirstJsonClass {
    constructor(value_gotten) {
      this.value_gotten = value_gotten;
      store_first_json= value_gotten;
    }
  
    // getter
    get name() {
        return this.value_gotten;
    //   return `${this.first} ${this.last}`;
    }

    // 👇️ Define setter
    set name(value_to_set) {
        this.value_gotten = value_to_set;
    }
}



export class FormData_ {
    constructor(value_gotten) {
      this.value_gotten = value_gotten;
      store_form_data= value_gotten;
    }
  
    // getter
    get name() {
        return this.value_gotten;
    //   return `${this.first} ${this.last}`;
    }

    // 👇️ Define setter
    set name(value_to_set) {
        this.value_gotten = value_to_set;
    }
  }
