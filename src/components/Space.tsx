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
import Earth from "./Earth/Earth";
import { FC, Suspense, useEffect, useRef, useState } from "react";
import Sun from "./Sun";

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
      <Canvas camera={{ position: [0, 0, 8] }}>
        {/* <OrbitControls /> */}
        <Effects disableGamma>
          <unrealBloomPass strength={1.5} radius={1} />
        </Effects>
        {/* TODO:  Save each planet info in json and render accordingly */}
        <Sun />
        <Earth position={[3, 0, 0]} />
        <Earth position={[8, 0, 0]} />
      </Canvas>
    </div>
  );
};

export default Space;
