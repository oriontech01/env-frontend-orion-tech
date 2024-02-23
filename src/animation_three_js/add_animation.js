import { Html, OrbitControls, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
// import background from './assets/images/background2.jpg';
import { ModelAnimation } from "./animation_components/model_animation";
import { AmbientLight } from "./animation_components/ambient_light";
import { Point_Light } from "./animation_components/point_light";
import { Loading } from "./loading";
import { useControls } from "leva";





export const AddAnimation= (props) => {


  const {bg_color} = useControls({
    bg_color: {
      value: "gray",
      label: "Background"
    }
  });


  return (
    // <div style={{backgroundImage: `url(${background})`}} className="h-screen">
  <div className="h-full w-full" style={{background:bg_color }}>
    <Canvas camera={{fov:70, position: [0, 15, 55]}}>

      <Suspense fallback={<Loading />}>
        {/* <camera /> */}
        <AmbientLight />
        <Point_Light/>
        <ModelAnimation props= {props}/>
        <OrbitControls />

      </Suspense>
    </Canvas>
  </div>

  );
}

