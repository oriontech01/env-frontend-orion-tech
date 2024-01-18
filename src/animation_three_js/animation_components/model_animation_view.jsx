import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { has_model_loaded, keep_for_edit_url, keep_for_view_url, keep_objects_data, keep_objects_data_reference, keep_objects_reference } from "../../api/api_variables";
import AddObjectsModel from "../../pages/add_objects_model";
import { Html, Text } from "@react-three/drei";


export const ModelViewAnimation = (props) => {
    const get_model_url= keep_for_view_url[0];
    //++++++++++++++++ ACCESSING PROPS +++++++++++++++++
    const show_obj_data= props.props.show_obj_;
    const for_object_view_data= props.props.for_object_view;
    const for_model_file_data= props.props.for_model_file[0];
    // console.log(for_model_file_data);

    const room_ref= useRef();
    const [intersected, set_intersected]= useState(false);
    const gltf_model= useLoader(GLTFLoader, `${get_model_url}`);

    // if (has_model_loaded.length === 0){
    //  gltf_model= useLoader(GLTFLoader, `${for_model_file_data}`);
    // }
    // else{gltf_model= has_model_loaded[0]}

    let model_children= new THREE.Object3D();
  
    const {camera, size}= useThree();
    const rayCaster= new THREE.Raycaster();

    const text_ref= useRef();
    var intersected_points;

    let [current_text, set_current_text]= useState("");
  
  
    
  
    gltf_model.scene.traverse((child) => {
      if (child.isGroup){
        model_children= child.children[0].children[0].children;
      }

      // has_model_loaded.push[gltf_model];
    });
  
  
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


          const ref_small2= for_object_view_data[(intersected_object.name)];

          if (!ref_small2){
            
            // if (keep_objects_reference.length === keep_small_object_ref.length){
            //   notify_double_(false);
            // }

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

            try{
              const get_text_data= for_object_view_data[intersected_object.name].comment_box;
              set_current_text(get_text_data);
            }
            catch{}

            show_obj_data(intersected_object.name);
          }
         
        }
      }
    }
  



  
  
  
  
    useEffect(() => {
      window.addEventListener('mousemove', handle_mouse);
  
      return () => {
        window.removeEventListener('mousemove', handle_mouse);
      };
    }, []);
  
  
  
  
  
  
    return (
      <group >
        <primitive 
          object={
            gltf_model.scene
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
  