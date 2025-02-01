//@ts-nocheck
import { Environment, OrthographicCamera } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
// import {DebugEnv} from "@react-three/rapier";
import { useRef } from "react";
import { CharacterController } from "./CharacterController";
import { Map } from "./Map";
import { RigidBody } from "@react-three/rapier";


export const Experience = () => {
  const shadowCameraRef = useRef();


  return (
    <>
      {/* <OrbitControls /> */}
      <Environment preset="sunset" />
      <directionalLight
        intensity={0.65}
        castShadow
        position={[-15, 10, 15]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00005}
      >
        <OrthographicCamera
          left={-22}
          right={15}
          top={10}
          bottom={-20}
          ref={shadowCameraRef}
          attach={"shadow-camera"}
        />
      </directionalLight>
      <Physics gravity={[0, -9.81, 0]}>
      {/* <Debug /> */}
      <RigidBody type="fixed">
          <Map model={"/world/city2.glb"}></Map>
         </RigidBody>
        <CharacterController />
      </Physics>
    </>
  );
};