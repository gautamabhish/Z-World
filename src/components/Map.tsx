//@ts-nocheck
import { useLoader } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export const Map = ({ model }) => {
  const { scene } = useLoader(GLTFLoader, model);
  const group = useRef();
  return (
    <group> <RigidBody  
      colliders="trimesh"
      friction={0.8}
      
      type="fixed">
      <primitive object={scene}  ref={group} position={[-1.5,0,0]} />
    </RigidBody>
    </group>
   
  );
};
