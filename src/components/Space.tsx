import { Canvas, extend, Object3DNode } from "@react-three/fiber";
import { Bounds, useBounds, Effects, Stars } from "@react-three/drei";
import { UnrealBloomPass } from "three-stdlib";
import "./Space.scss";
import { FC, Suspense, useEffect, useState } from "react";
import Sun from "./Sun";
import SphereBody from "./SphereBody/SphereBody";
import planets from "../planets";
import {
  DirectionalLight,
  Material,
  Mesh,
  Object3D,
  SphereGeometry,
} from "three";
import OrbitalLines from "./OrbitalLines";

// Let React accept new primitives component from UnrealBloomPass
extend({ UnrealBloomPass });

// Let Typescript understand that unrealBloomPass type
declare module "@react-three/fiber" {
  interface ThreeElements {
    unrealBloomPass: Object3DNode<UnrealBloomPass, typeof UnrealBloomPass>;
  }
}

type DefaultCamPosType = [number, number, number];

const DEFAULT_CAM_POS: DefaultCamPosType = [0, 20, 30];

// TODO:  This could be a custom hook
const SelectToZoom: FC<any> = ({ setZoomed, children }) => {
  const api = useBounds();
  return (
    <group
      name="group"
      onClick={(e) => {
        const clickTarget: Object3D = e.object;
        const planet = clickTarget.parent;
        if (planet) {
          const { x, y, z } = planet.position;
          const planetRadius = (clickTarget as Mesh<SphereGeometry>).geometry
            .parameters.radius;
          e.stopPropagation();
          const positionOffset =
            x > 0 ? planetRadius * -1.5 : planetRadius * 1.5;
          const targetOffset = x > 0 ? planetRadius * 3.5 : planetRadius * -3.5;
          api.to({
            position: [x + positionOffset, y, planetRadius * 2],
            target: [x + targetOffset, y, z],
          });
          setZoomed(true);
        }
      }}
      onPointerMissed={(e) => {
        return (
          e.button === 0 &&
          api.to({ position: DEFAULT_CAM_POS, target: [0, 0, 0] }) &&
          setZoomed(false)
        );
      }}
    >
      {children}
    </group>
  );
};

const Space = () => {
  const [zoomed, setZoomed] = useState<boolean>(false);

  return (
    <div className="space">
      <Canvas camera={{ position: DEFAULT_CAM_POS, focus: 0 }}>
        <Stars
          radius={200}
          depth={100}
          count={10000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        {/* Turning on orbitControls will interfere with Bounds */}
        {/* <OrbitControls /> */}
        {/* TODO:  Figure out how to do selective bloom with post processing */}
        {/* https://threejs.org/docs/#manual/en/introduction/How-to-use-post-processing */}
        {/* https://codesandbox.io/s/r3f-selective-bloom-7mfqw?file=/src/index.js:297-307 */}
        <Effects disableGamma>
          <unrealBloomPass strength={1} radius={1} />
        </Effects>
        {/* <ambientLight intensity={1} /> */}
        <Bounds observe margin={1.2}>
          <SelectToZoom setZoomed={setZoomed}>
            <Sun />
            <Suspense>
              {planets.map((planet) => (
                <group>
                  {zoomed ? (
                    <></>
                  ) : (
                    <OrbitalLines radius={planet.position[0]} />
                  )}
                  <SphereBody
                    key={planet.id}
                    name={planet.id}
                    scale={planet.scale}
                    position={planet.position}
                    rotationSpeed={planet.rotationSpeed}
                    revolutionSpeed={planet.revolutionSpeed}
                    atmosRotationSpeed={planet.atmosRotationSpeed}
                    mapTexture={planet.mapTexture}
                    normalMapTexture={planet.normalMapTexture}
                    atmosMapTexture={planet.atmosMapTexture}
                    axisRotation={planet.axisRotation}
                    ringTexture={planet.ringTexture}
                    interactiveSphere={!zoomed}
                  />
                </group>
              ))}
            </Suspense>
          </SelectToZoom>
        </Bounds>
      </Canvas>
    </div>
  );
};

export default Space;
