import { Html, OrbitControls, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import background from './assets/images/background2.jpg';
import { ModelAnimation } from "./animation_components/model_animation";
import { AmbientLight } from "./animation_components/ambient_light";
import { Point_Light } from "./animation_components/point_light";





export const AddAnimation= (props) => {
  return (
  <div style={{backgroundImage: `url(${background})`}} className="h-screen">
    <Canvas camera={{fov:70, position: [0, 15, 55]}}>
      <Suspense fallback={null}>
        <AmbientLight />
        <Point_Light />
        <ModelAnimation props= {props}/>
        <OrbitControls />
      </Suspense>
    </Canvas>
  </div>

  );
}

