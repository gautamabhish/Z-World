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
    
      type="fixed">
      <primitive object={scene}  ref={group}  />
    </RigidBody>
    </group>
   
  );
};
