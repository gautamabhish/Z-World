//@ts-nocheck
import { useLoader } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export const Map = ({ model }) => {
  const { scene } = useLoader(GLTFLoader, model);

  return (
    <RigidBody type="fixed" colliders="trimesh">
      <primitive object={scene}  />
    </RigidBody>
  );
};
