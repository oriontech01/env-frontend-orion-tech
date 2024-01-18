import { Html, OrbitControls, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import background from './assets/images/background2.jpg';
import { AmbientLight } from "./animation_components/ambient_light";
import { ModelViewAnimation } from "./animation_components/model_animation_view";
import { Loader_ } from "./loader";





export const ViewAnimation= (props) => {
  return (
  <div style={{backgroundImage: `url(${background})`}} className="h-screen">
    <Canvas camera={{fov:70, position: [0, 15, 55]}}>
      <Suspense fallback={<Loader_ />}>
        <AmbientLight />
        <ModelViewAnimation props= {props}/>
        <OrbitControls />
      </Suspense>
    </Canvas>
  </div>

  );
}

