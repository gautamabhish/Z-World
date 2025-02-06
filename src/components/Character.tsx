//@ts-nocheck
import React, { useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { useAnimations } from "@react-three/drei";

const Character = ({ animation, ...props }) => {
  const group = useRef();
  const gltf = useLoader(GLTFLoader, "/models/character-male-c.glb");
  const { actions } = useAnimations(gltf.animations, group);

  useEffect(() => {
    if (!actions[animation]) return;

    // Stop all animations before playing a new one
    Object.values(actions).forEach((action) => action.stop());

    // Play the new animation
    actions[animation].reset().fadeIn(0.24).play();

    return () => {
      actions[animation]?.fadeOut(0.24);
    };
  }, [animation, actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={gltf.scene} />
    </group>
  );
};

export default Character;
