import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {ColladaLoader} from 'three/examples/jsm/loaders/ColladaLoader';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';

import { keep_for_edit_url, keep_objects_data, keep_objects_data_reference, keep_objects_reference } from "../../api/api_variables";
import AddObjectsModel from "../../pages/add_objects_model";
import { Html, Text } from "@react-three/drei";




function DetectModel (extension, get_model_url) {
  const loader_lists= [GLTFLoader, FBXLoader, STLLoader, OBJLoader, ColladaLoader];
// useLoader_lists= [useLoader, useFBX];

  let save_loader;

  if (extension === "gltf" || extension === "glb"){ save_loader= loader_lists[0]; }
  // else if (extension === "fbx"){return useFBX(`${get_model_url}`);}
  else if (extension === "fbx"){save_loader= loader_lists[1];}
  else if (extension === "stl"){save_loader= loader_lists[2];}
  else if (extension === "obj"){save_loader= loader_lists[3];}
  else if (extension === "dae"){save_loader= loader_lists[4];}
  // else if (extension === "ifc"){model_load= useLoader(STLLoader, `${get_model_url}`);}
  // else{
  //   return alert("We could not recognize the model file extension, you are trying to view.")
  // }

  return useLoader(save_loader, `${get_model_url}`);
}


export const ModelAnimation = (props) => {
    const get_model_url= keep_for_edit_url[0];

    // GETTING THE FILE EXTENSION
    // Extract the file name from the URL
    const fileName = get_model_url.substring(get_model_url.lastIndexOf('/') + 1);
    // Split the file name into its base name and extension
    // const [baseName, extension] = fileName.split('.');
    const file_path = fileName.split('.');
    const extension= file_path[file_path.length -1];

    // console.log(get_model_url);
    // console.log(extension);
    const model_load= DetectModel(extension, get_model_url);


    //++++++++++++++++ ACCESSING PROPS +++++++++++++++++
    const notify_double_= props.props.notify_double_;
    const show_obj_data= props.props.show_obj_;
    const for_model_file_data= props.props.for_model_file[0];

    const room_ref= useRef();
    const [intersected, set_intersected]= useState(false);



    let model_children= new THREE.Object3D();
  
    const {camera, size}= useThree();
    const rayCaster= new THREE.Raycaster();

    const text_ref= useRef();
    var intersected_points;

    let [current_text, set_current_text]= useState("");
  
  
    
  
    // model_load.scene.traverse((child) => {
    //   if (child.isGroup){
    //     model_children= child.children[0].children[0].children;
    //   }
    // });
  
  
    const {rotate_model} = useControls({
      rotate_model: {
        label: "Rotate",
        value: false,
        min: false,
        max: true
      }
    });


    useFrame((state, delta) => {
        if (room_ref.current){
          if(rotate_model) {
            room_ref.current.rotation.y -= delta *0.2
            console.log(model_children);
          } 
    
        }   
      });
  


    var objects_data= [];
  
    var intersects;
    var intersected_points;
    var lastObject;
    let last_intersects;

    const keep_small_object_ref= [];
    let ref_object= "";
  

    
    //+++++++++++++ MOUSEMOVE  EVENT ++++++++++++++++
    const handle_mouse = (event) => {

      if (event.target.localName === "canvas"){

        
        const x = (event.clientX / size.width) * 2 - 1;
        const y = -(event.clientY / size.height) * 2 + 1;
    
        const current_mouse= { x, y };
    
        rayCaster.setFromCamera(current_mouse, camera);
        intersects= rayCaster.intersectObjects(model_children);

        
        if (intersects.length > 0){ 
          const intersected_object= intersects[0].object;
          intersected_points= intersects[0].point;
          text_ref.current.position.x= intersected_points.x;
          text_ref.current.position.y= intersected_points.y;


          const ref_small2= keep_small_object_ref.indexOf(intersected_object.name);

          if (ref_small2 === -1){
            
            if (keep_objects_reference.length === keep_small_object_ref.length){
              notify_double_(null, false);
            }

            set_current_text("")
            if (current_text == ""){

            }

            if (lastObject){
              lastObject.material.color.set(new THREE.Color(1, 1, 1));
            }
    
            // keep_small_object_ref.splice(ref_small, 1);
            intersected_object.material.color.set(new THREE.Color(4, 4, 4));
            lastObject= intersected_object;
          }
          else{
            // const ob_details= `
            //   ${}
            // `


            try{
              const get_text_data= keep_objects_data_reference[intersected_object.name].comment_box;
              set_current_text(get_text_data);
            }
            catch{}
            show_obj_data(intersected_object.name);
          }
         
        }
      }
    }
  



    //++++++++ DOUBLE CLICK EVENT ++++++++++++++++
    const handle_double_click= (event) => {
        // console.log(event.target.localName);
        
        if (event.target.localName === "canvas"){
          const x = (event.clientX / size.width) * 2 - 1;
          const y = -(event.clientY / size.height) * 2 + 1;
    
          const current_mouse= { x, y };
    
          rayCaster.setFromCamera(current_mouse, camera);
          const intersects2= rayCaster.intersectObjects(model_children);

          // if (last_intersects){
          //   if (keep_objects_reference.indexOf(last_intersects.name)=== -1){
          //     last_intersects.material.color.set(new THREE.Color(4, 4, 4));
          //     notify_double_();
          //   }
          //   last_intersects= null;
          // }


          if (intersects2.length != 0){ 
              intersected_points= intersects[0].point;
              // const list_keep_obj= Object.keys(keep_objects_data[0]);
              ref_object= keep_objects_reference.indexOf(intersects2[0].object.name);
              const ref_small= keep_small_object_ref.indexOf(intersects2[0].object.name);
              
              if (ref_object === -1){
                  // window.removeEventListener('dblclick', handle_double_click);
                  if(ref_small !== -1){
                    notify_double_(null, false);

                    keep_small_object_ref.splice(ref_small, 1);
                    intersects2[0].object.material.color.set(new THREE.Color(1, 1, 1));
                  }
                  //++++TO PREVENT FURTHER PICKING WHEN THEY HAVE NOT POPULATED THE ONE THAT THEY PICK CURRENTLY
                  else if(keep_objects_reference.length === keep_small_object_ref.length){
                    notify_double_(intersects2[0].object.name, true);

                    intersects2[0].object.material.color.set(new THREE.Color(0, 1, 0));
                    keep_small_object_ref.push(intersects2[0].object.name);
                    //++++++++++++++++ I HAVE TO EQUATE lastObject= "" TO EMPTY BECAUSE THE MOUSE MOVE BEFORE THE DOUBLE CLICK WAS MADE HAD ALREADY STORED THIS AS OUR LAST OBJECT ++++++++++
                    lastObject= "";
                    // keep_objects_data.push(intersects2[0].object.name);  
                  }
              }
              else{
                keep_objects_data.splice(ref_object, 1);
                // delete keep_objects_data_reference.object_name;
                //If you want to delete an entire object with a specific key from another object in JavaScript,
                delete keep_objects_data_reference[intersects2[0].object.name];
                console.log(keep_objects_data_reference);
                keep_objects_reference.splice(ref_object, 1);
                keep_small_object_ref.splice(ref_object, 1);
                intersects2[0].object.material.color.set(new THREE.Color(1, 1, 1));
              }
              
              // console.log(keep_objects_data);
          } 
        }

    }
    
  
  
  
  
    useEffect(() => {
      window.addEventListener('mousemove', handle_mouse);
      window.addEventListener('dblclick', handle_double_click);
  
      return () => {
        window.removeEventListener('mousemove', handle_mouse);
        window.removeEventListener('dblclick', handle_double_click);
      };
    }, []);
  
  
  
  
  
  
    return (
      <group >
        <primitive 
          object={
            model_load.scene
          } 
          scale={1} 
          position= {[0, -5, 0]}
          ref={room_ref}
          // onPointerEnter= {e => (handle_mouse_enter(e))}
          // onPointerLeave= {e => (handle_mouse_leave(e))}
        />



        <Text
          ref={text_ref}
          // scale={scale}
          // color= {text_color} // def
          position={[0, 0, 0]}
          
        >

          {/* Pipeloluwa */}
          <Html center>
            <div className={`${current_text === "" ? "" : "bg-green-600/80 shadow shadow-black min-h-4 w-44 py-2 px-4 rounded-xl"}`}>
              <p className={` text-[14px] text-white `}>
                {current_text}
                {/* <br></br>
                wffef */}
              </p>
            </div>
          </Html>
      
        </Text>
      </group>
    );
  }
  