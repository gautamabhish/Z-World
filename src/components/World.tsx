//@ts-nocheck
import React, { useRef, useState,useEffect ,useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { KeyboardControls, OrbitControls, useKeyboardControls } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import { Vector3 } from "three";

const Scene = () => {
   const gltf = useLoader(GLTFLoader, "/world/model_file.glb");
   return <primitive object={gltf.scene} position={[2, 0, 0]} scale={0.0001} />;
 };
const Character = ({ setCharacterRef }) => {
   const gltf = useLoader(GLTFLoader, "/models/character-male-c.glb");
   const characterRef = useRef<RigidBody | null>(null);
   const [velocity] = useState(new Vector3());
   const [sub, get] = useKeyboardControls();
 
      // Pass character ref to parent (for camera follow)
      useEffect(() => {
        if (characterRef.current) {
          console.log("Character is assigned:", characterRef.current);
          setCharacterRef(characterRef.current);
        }
        else {
          console.error(" Character Ref is NULL!");
        }
      }, []);
    
   useEffect(() => {
    const unsubscribe = sub(
      (state) => state.jump,
      (pressed) => {
        if (pressed) console.log("Jump pressed");
      }
    );
    return () => unsubscribe(); // Cleanup on unmount
  }, []);
  
   useFrame(() => {
    
    // console.log("Character is assigned:", characterRef.current);
     if (!characterRef.current || !characterRef.current.setLinvel) return;
     const body = characterRef.current;
 
     let moveX = 0, moveZ = 0;
     const { forward, back, left, right, jump } = get();
 
     if(forward) moveZ -= 0.2;
     if (back) moveZ += 0.2;
     if (left) moveX -= 0.2;
     if (right) moveX += 0.2;
    if(body.setLinvel){
     // Apply movement as linear velocity for smoother movement
     const linVel = body.linvel ? body.linvel() : new Vector3(0, 0, 0);
     body.setLinvel(new Vector3(moveX, linVel.y, moveZ));
 
     // Jumping logic
     if (jump && Math.abs(linVel.y) < 0.01) {
      body.applyImpulse({ x: 0, y: 5, z: 0 }, true);
    }
  }
  else{
    console.error("md")
  }
  });
 

 
   return (
     <RigidBody
       
       colliders="hull"
       mass={1}
       linearDamping={0.5}
       angularDamping={0.5}
       friction={1}
       ref={characterRef}
       enabledRotations={[false, false, false]} // Prevents character from rotating
     >
       <primitive  object={gltf.scene} scale={2} />
     </RigidBody>
   );
 };


 const CameraFollow = ({ characterRef }) => {
   const cameraRef = useRef();
 
   useFrame(({ camera }) => {
     if (!characterRef.current) return;
     const pos = characterRef.current.translation()?.clone();
     if (!pos) return;
     camera.position.lerp(new Vector3(pos.x, pos.y + 2, pos.z + 5), 0.1);
     camera.lookAt(pos);
   });
 
   return <OrbitControls ref={cameraRef} />;
 };
 
 const World = () => {
   const [characterRef, setCharacterRef] = useState(null);
   enum Controls {
    forward = 'forward',
    back = 'back',
    left = 'left',
    right = 'right',
    jump = 'jump',
  }
  const map = useMemo<KeyboardControlsEntry<Controls>[]>(()=>[
    { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
    { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
    { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
    { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
    { name: Controls.jump, keys: ['Space'] },
  ], [])
   return (
    <KeyboardControls
    map={map}
    ><Canvas>
       <ambientLight intensity={0.5} />
       <directionalLight position={[5, 5, 5]} />
       <Physics gravity={[0, -9.81, 0]}>
         <RigidBody type="fixed">
           <Scene />
         </RigidBody>
         <Character setCharacterRef={setCharacterRef} />
       </Physics>
       {characterRef && <CameraFollow characterRef={characterRef} />}
     </Canvas>
        </KeyboardControls>
   );
 };
 export default World ; 