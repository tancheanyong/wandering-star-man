import { Canvas, extend, Object3DNode } from "@react-three/fiber";
import {
  Bounds,
  useBounds,
  Effects,
  OrbitControls,
  Stars,
} from "@react-three/drei";
import { UnrealBloomPass } from "three-stdlib";
import "./Space.scss";
import { FC } from "react";
import Sun from "./Sun";
import SphereBody from "./SphereBody";
import planets from "../planets";
import { Material, Mesh, Object3D, SphereGeometry } from "three";

// Let React accept new primitives component from UnrealBloomPass
extend({ UnrealBloomPass });

// Let Typescript understand that unrealBloomPass type
declare module "@react-three/fiber" {
  interface ThreeElements {
    unrealBloomPass: Object3DNode<UnrealBloomPass, typeof UnrealBloomPass>;
  }
}
const SelectToZoom: FC<any> = ({ children }) => {
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
        }
      }}
      onPointerMissed={(e) =>
        e.button === 0 &&
        api.to({
          position: [0, 0, 30],
          target: [0, 0, 0],
        })
      }
    >
      {children}
    </group>
  );
};

const Space = () => {
  return (
    <div className="space">
      <Canvas camera={{ position: [0, 0, 30] }}>
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
        {/* TODO:  Save each planet info in json and render accordingly */}
        <Bounds observe margin={1.2}>
          <SelectToZoom>
            <Sun />
            {planets.map((planet) => (
              <SphereBody
                key={planet.id}
                scale={planet.scale}
                position={planet.position}
                rotationSpeed={planet.rotationSpeed}
                atmosRotationSpeed={planet.atmosRotationSpeed}
                mapTexture={planet.mapTexture}
                normalMapTexture={planet.normalMapTexture}
                atmosMapTexture={planet.atmosMapTexture}
                axisRotation={planet.axisRotation}
                ring={planet.ring}
              />
            ))}
          </SelectToZoom>
        </Bounds>
      </Canvas>
    </div>
  );
};

export default Space;
