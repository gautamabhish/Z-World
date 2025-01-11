//@ts-nocheck
import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const characters = {
  "/thumbnails/character-female-a.png": "/models/character-female-a.glb",
  "/thumbnails/character-female-b.png": "/models/character-female-b.glb",
  "/thumbnails/character-female-c.png": "/models/character-female-c.glb",
  "/thumbnails/character-female-d.png": "/models/character-female-d.glb",
  "/thumbnails/character-female-e.png": "/models/character-female-e.glb",
  "/thumbnails/character-female-f.png": "/models/character-female-f.glb",
  "/thumbnails/character-male-a.png": "/models/character-male-a.glb",
  "/thumbnails/character-male-b.png": "/models/character-male-b.glb",
  "/thumbnails/character-male-c.png": "/models/character-male-c.glb",
  "/thumbnails/character-male-d.png": "/models/character-male-d.glb",
  "/thumbnails/character-male-e.png": "/models/character-male-e.glb",
  "/thumbnails/character-male-f.png": "/models/character-male-f.glb",
};

const accessories = {
  "/thumbnails/aid-hearing.png": "/models/aid_hearing.glb",
  "/thumbnails/aid-cane-blind.png": "/models/aid-cane-blind.glb",
  "/thumbnails/aid-cane-low-vision.png": "/models/aid-cane-low-vision.glb",
  "/thumbnails/aid-cane.png": "/models/aid-cane.glb",
  "/thumbnails/aid-crutch.png": "/models/aid-crutch.glb",
  "/thumbnails/aid-defibrillator-green.png":
    "/models/aid-defibrillator-green.glb",
  "/thumbnails/aid-defibrillator-red.png": "/models/aid-defibrillator-red.glb",
  "/thumbnails/aid-glasses.png": "/models/aid-glasses.glb",
  "/thumbnails/aid-mask.png": "/models/aid-mask.glb",
  "/thumbnails/wheelchair.png": "/models/wheelchair.glb",
  "/thumbnails/wheelchair-deluxe.png": "/models/wheelchair-deluxe.glb",
  "/thumbnails/wheelchair-power.png": "/models/wheelchair-power.glb",
  "/thumbnails/wheelchair-power-deluxe.png":
    "/models/wheelchair-power-deluxe.glb",
};

function Scene({ modelPath, accessoryPath }) {
  const { gl } = useThree();
  const [character, setCharacter] = useState(null);
  const [accessory, setAccessory] = useState(null);

  // Load the character model
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        setCharacter(gltf.scene);
      },
      undefined,
      (error) => console.error("Error loading character model:", error)
    );

    return () => {
      if (character) {
        character.traverse((child) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => mat.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
        gl.dispose();
      }
    };
  }, [modelPath, gl]);

  // Load the accessory model
  useEffect(() => {
    if (!accessoryPath) {
      setAccessory(null);
      return;
    }
    const loader = new GLTFLoader();
    loader.load(
      accessoryPath,
      (gltf) => {
        setAccessory(gltf.scene);
      },
      undefined,
      (error) => console.error("Error loading accessory model:", error)
    );

    return () => {
      if (accessory) {
        accessory.traverse((child) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => mat.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      }
    };
  }, [accessoryPath, gl]);

  if (!character) return null;

  return (
    <>
      <primitive object={character} scale={4} />
      {accessory && (
        <primitive
          object={accessory}
          scale={4}
          position={[0, 0.5, 0]} // Adjust this position to attach accessory
        />
      )}
    </>
  );
}

const CharPreview = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(
    "/models/character-female-a.glb"
  ); // Default character
  const [selectedAccessory, setSelectedAccessory] = useState(null); // No accessory by default

  return (
    <div className="h-screen flex">
      {/* 3D Viewer Section */}
      <div className="flex-1 border border-gray-300">
        <Canvas>
          <ambientLight intensity={2} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <OrbitControls />
          <Scene
            modelPath={selectedCharacter}
            accessoryPath={selectedAccessory}
          />
        </Canvas>
      </div>

      {/* Selection Panel */}
      <div className="w-1/3 p-5 border-l border-gray-300">
        <h3 className="text-lg font-bold mb-4">Select a Character</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(characters).map(([thumbnail, modelPath]) => (
            <div
              key={modelPath}
              onClick={() => setSelectedCharacter(modelPath)}
              className="cursor-pointer text-center"
            >
              <img
                src={thumbnail}
                alt={modelPath}
                className="w-20 h-20 object-cover mx-auto mb-2"
              />
              <p className="text-sm">
                {thumbnail.split("/").pop().split(".")[0]}
              </p>
            </div>
          ))}
        </div>
        <h3 className="text-lg font-bold mb-4">Select an Accessory</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(accessories).map(([thumbnail, modelPath]) => (
            <div
              key={modelPath}
              onClick={() => setSelectedAccessory(modelPath)}
              className="cursor-pointer text-center"
            >
              <img
                src={thumbnail}
                alt={modelPath}
                className="w-20 h-20 object-cover mx-auto mb-2"
              />
              <p className="text-sm">
                {thumbnail.split("/").pop().split(".")[0]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharPreview;
