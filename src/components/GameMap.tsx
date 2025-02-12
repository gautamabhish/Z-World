//@ts-nocheck
import { useLoader } from "@react-three/fiber";
import { useState, useRef, useMemo, useCallback } from "react";
import { RigidBody } from "@react-three/rapier";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Html } from "@react-three/drei";

export const GameMap = ({ model }) => {
  const { scene } = useLoader(GLTFLoader, model);
  const group = useRef();
  const [driveOptions, setDriveOptions] = useState(false);

  // Separate transport and static meshes
  const { transportMeshes, staticMeshes } = useMemo(() => {
    const transportMeshes = [];
    const staticMeshes = [];

    scene.children.forEach((mesh) => {
      if (mesh.name?.startsWith("transport")) {
        transportMeshes.push(mesh);
      } else {
        staticMeshes.push(mesh);
      }
    });

    return { transportMeshes, staticMeshes };
  }, [scene]);

  // Collision handler
  const handleCollision = useCallback((event) => {
    if (event?.target?.rigidBody?.userData?.type === "drive") {
      setDriveOptions(true);
    }
  }, []);

  return (
    <group ref={group}>
      {/* Transport Meshes (Dynamic) */}
      {transportMeshes.map((mesh, index) => (
        <RigidBody
          key={index}
          colliders="cuboid" // Larger collider than the object
          activeEvents="collision"
          type="dynamic"
          onCollisionEnter={handleCollision}
          mass={300}
          userData={{ type: "drive" }}
        >
          <primitive object={mesh} />
        </RigidBody>
      ))}

      {/* Show Drive Button Only on Collision */}
      {driveOptions && (
        <Html position={[0, 2, 0]}>
          <button
            style={{
              background: "rgba(255, 255, 255, 0.8)",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              fontSize: "16px",
              borderRadius: "5px",
              position:"absolute",
              zIndex:"100",
            }}
            onClick={() => console.log("Drive mode activated")}
          >
            Drive
          </button>
        </Html>
      )}

      {/* Static Meshes (Fixed) */}
      <RigidBody colliders="trimesh" type="fixed">
        {staticMeshes.map((mesh, index) => (
          <primitive key={index} object={mesh} />
        ))}
      </RigidBody>
    </group>
  );
};
