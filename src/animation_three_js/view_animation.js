import { Html, Loader, OrbitControls, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
// import background from './assets/images/background2.jpg';
import { AmbientLight } from "./animation_components/ambient_light";
import { ModelViewAnimation } from "./animation_components/model_animation_view";
import { Loader_ } from "./loader";
import { Color, PointLight } from "three";
import { Point_Light } from "./animation_components/point_light";
import { Leva, useControls } from "leva";
import { Loading } from "./loading";
import * as THREE from "three";





export const ViewAnimation= (props) => {
  
  // const {x_axis, y_axis, z_axis} = useControls({
  //   x_axis :{
  //     label: "camera-x-axis",
  //     value: 0,
  //     min: -1000,
  //     max: 1000
  //   },

  //   y_axis :{
  //     label: "camera-y-axis",
  //     value: 15,
  //     min: -1000,
  //     max: 1000
  //   },


  //   z_axis :{
  //     label: "camera-z-axis",
  //     value: 55,
  //     min: -1000,
  //     max: 1000
  //   },

  //   // fov :{
  //   //   label: "camera-zoom",
  //   //   value: 70,
  //   //   min: -1000,
  //   //   max: 1000,
  //   //   step:1
  //   // }
  // }); 


  // const { fov } = useControls({
  //   min: 10, max: 120, value:70, label: 'Field of View'
  // });

  const {bg_color} = useControls({
    bg_color: "gray"
  });


  return (
    // <div style={{backgroundImage: `url(${background})`}} className="h-screen">
  <div className="h-screen" style={{background:bg_color }}>
    <Canvas   camera={{fov:70, position: [0, 15, 55]}}>
    {/* <Canvas camera= {fov.value}> scene={{background: new THREE.Color(bg_color)}}*/}
      <Suspense fallback={<Loading />}>
        {/* <camera /> */}
        <AmbientLight />
        <Point_Light/>
        <ModelViewAnimation props= {props}/>
        <OrbitControls />

        {/* <color args={[0, 0, 0]} attach="background" /> */}
      </Suspense>
    </Canvas>

  </div>


  // <div style={{backgroundImage: `url(${background})`}} className="h-screen">
  //   {/* <Canvas camera={{fov, position: [x_axis, y_axis, z_axis]}}> */}
  //   <Canvas camera= {{fov, position: [0, 15, 55]}}>
  //     <Suspense fallback={null}>
  //       {/* <camera /> */}
  //       <AmbientLight />
  //       <Point_Light/>
  //       <ModelViewAnimation props= {props}/>
  //       <OrbitControls />

  //       {/* <color args={[0, 0, 0]} attach="background" /> */}
  //     </Suspense>
  //   </Canvas>

  //   <Leva />
  // </div>

  );
}

