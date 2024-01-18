import { useControls } from "leva";




export const AmbientLight = () => {
    const {brightness} = useControls({
      brightness: {
        label: 'Brightness',
        value: 7,
        min: 0.1,
        max: 100.0,
      }
    });
  
  
    return (
      <ambientLight intensity={brightness}/>
    );
  }