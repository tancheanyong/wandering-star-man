import {
  Canvas,
  extend,
  Object3DNode,
  useFrame,
  useThree,
  Vector3,
} from "@react-three/fiber";
import { Bounds, useBounds, Effects, OrbitControls } from "@react-three/drei";
import { UnrealBloomPass } from "three-stdlib";
import "./Space.scss";
import { FC, Suspense, useEffect, useRef, useState } from "react";
import Sun from "./Sun";
import SphereBody from "./SphereBody";
import planets from "../planets";

// Let React accept new primitives component from UnrealBloomPass
extend({ UnrealBloomPass });

// Let Typescript understand that unrealBloomPass type
declare module "@react-three/fiber" {
  interface ThreeElements {
    unrealBloomPass: Object3DNode<UnrealBloomPass, typeof UnrealBloomPass>;
  }
}

const Space = () => {
  return (
    <div className="space">
      <Canvas camera={{ position: [0, 0, 30] }}>
        <OrbitControls />
        <Effects disableGamma>
          <unrealBloomPass strength={1.5} radius={1} />
        </Effects>
        {/* <ambientLight intensity={1} /> */}
        {/* TODO:  Save each planet info in json and render accordingly */}
        <Sun />
        {planets.map((planet) => (
          <SphereBody
            position={planet.position}
            rotationSpeed={planet.rotationSpeed}
            atmosRotationSpeed={planet.atmosRotationSpeed}
            mapTexture={planet.mapTexture}
            atmosMapTexture={planet.atmosMapTexture}
            rotation={planet.rotation}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default Space;
