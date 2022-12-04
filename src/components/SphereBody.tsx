import { Html } from "@react-three/drei";
import { Euler, useFrame, useLoader, Vector3 } from "@react-three/fiber";
import React, { FC, MutableRefObject, Ref, useRef } from "react";
import { BufferGeometry, Group, Material, Mesh, TextureLoader } from "three";

type SphereBodyProps = {
  name: string;
  position: [number, number, number];
  scale?: number;
  rotationSpeed: number;
  revolutionSpeed: number;
  atmosRotationSpeed: number;
  mapTexture: string;
  normalMapTexture?: string;
  axisRotation?: Euler;
  atmosMapTexture?: string;
  ringTexture?: string;
  onClick?: () => void;
};

const SphereBody: FC<SphereBodyProps> = ({
  name,
  position,
  scale = 1,
  onClick,
  rotationSpeed,
  revolutionSpeed,
  atmosRotationSpeed = 0,
  mapTexture,
  normalMapTexture,
  axisRotation = [0, 0, 0],
  ringTexture,
  atmosMapTexture,
}) => {
  const sphereBodyRef = useRef<Group>(null!);
  const sphereBaseRef = useRef<Mesh>(null!);
  const sphereAtmosRef = useRef<Mesh>(null!);

  useFrame(({ clock }) => {
    // Rotation
    sphereBaseRef.current.rotation.y = clock.getElapsedTime() * rotationSpeed;

    if (atmosMapTexture) {
      sphereAtmosRef.current.rotation.y =
        clock.getElapsedTime() * atmosRotationSpeed;
    }

    // Revolution
    sphereBodyRef.current.position.x =
      position[0] * Math.cos(clock.getElapsedTime() * revolutionSpeed);
    sphereBodyRef.current.position.z =
      position[0] * Math.sin(clock.getElapsedTime() * revolutionSpeed);
  });

  const sphereBaseMapTexture = useLoader(TextureLoader, mapTexture);
  const normalMap = useLoader(
    TextureLoader,
    normalMapTexture ?? "default-map.jpeg"
  );
  const sphereAtmosMapTexture = useLoader(
    TextureLoader,
    atmosMapTexture ?? "default-map.jpeg"
  );
  const ringMap = useLoader(TextureLoader, ringTexture ?? "default-map.jpeg");

  return (
    // axisRotation uses Euler which is in radians
    <group
      onClick={onClick}
      position={position}
      rotation={axisRotation}
      ref={sphereBodyRef}
    >
      <Html>
        <span style={{ color: "white" }}>{name}</span>
      </Html>
      <mesh ref={sphereBaseRef} castShadow>
        <sphereGeometry args={[scale / 2, 100, 100]} />
        <meshPhysicalMaterial
          map={sphereBaseMapTexture}
          normalMap={normalMap}
        />
      </mesh>
      {atmosMapTexture ? (
        <mesh scale={1.05} ref={sphereAtmosRef}>
          <sphereGeometry args={[scale / 2, 100, 100]} />
          <meshLambertMaterial map={sphereAtmosMapTexture} transparent />
        </mesh>
      ) : null}
      {ringTexture ? (
        <group>
          <mesh rotation={[1.5708, 3.7, 0]}>
            <ringGeometry args={[scale * 0.7, scale, 60]} />
            <meshPhongMaterial map={ringMap} />
          </mesh>
          <mesh rotation={[-1.5708, -3.7, 0]}>
            <ringGeometry args={[scale * 0.7, scale, 60]} />
            <meshPhongMaterial map={ringMap} />
          </mesh>
        </group>
      ) : null}
    </group>
  );
};

export default SphereBody;
