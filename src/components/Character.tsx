//@ts-nocheck
import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { RigidBody } from "@react-three/rapier";
import { Group } from "three/examples/jsm/libs/tween.module.js";

const Character = ({...props}) => {
  const gltf = useLoader(GLTFLoader, "/models/character-male-c.glb");

  return (
    <group {...props}>
      <primitive object={gltf.scene}  />
      </group>
  );
};

export default Character;
