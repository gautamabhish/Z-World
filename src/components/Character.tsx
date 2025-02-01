//@ts-nocheck
import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { RigidBody } from "@react-three/rapier";

const Character = () => {
  const gltf = useLoader(GLTFLoader, "/models/character-male-c.glb");

  return (
    <RigidBody  colliders="hull"
    mass={1}
    linearDamping={1}
    angularDamping={1}

    friction={0.5}
    enabledRotations={[false, false, false]}>
      <primitive object={gltf.scene}  />
    </RigidBody> 
  );
};

export default Character;
