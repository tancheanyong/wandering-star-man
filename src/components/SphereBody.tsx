import { Euler, useFrame, useLoader, Vector3 } from "@react-three/fiber";
import React, { FC, useRef } from "react";
import { Mesh, TextureLoader } from "three";

type SphereBodyProps = {
  position: Vector3;
  scale?: number;
  rotationSpeed: number;
  atmosRotationSpeed: number;
  mapTexture: string;
  rotation?: Euler;
  atmosMapTexture?: string;

  onClick?: () => void;
};

const SphereBody: FC<SphereBodyProps> = ({
  position,
  scale = 1,
  onClick,
  rotationSpeed,
  atmosRotationSpeed = 0,
  mapTexture,
  rotation = [0, 0, 0],
  atmosMapTexture,
}) => {
  const sphereBaseRef = useRef<Mesh>(null!);
  const sphereAtmosRef = useRef<Mesh>(null!);

  useFrame(({ clock }) => {
    sphereBaseRef.current.rotation.y = clock.getElapsedTime() * rotationSpeed;

    if (atmosMapTexture) {
      sphereAtmosRef.current.rotation.y =
        clock.getElapsedTime() * atmosRotationSpeed;
    }
  });

  const sphereBaseMapTexture = useLoader(TextureLoader, mapTexture);
  const sphereAtmosMapTexture = useLoader(
    TextureLoader,
    atmosMapTexture ?? "logo192.png"
  );

  return (
    // rotation uses Euler which is in radians
    <group
      onClick={onClick}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      <mesh ref={sphereBaseRef}>
        <sphereGeometry />
        <meshPhysicalMaterial map={sphereBaseMapTexture} />
      </mesh>
      {atmosMapTexture ? (
        <mesh scale={1.05} ref={sphereAtmosRef}>
          <sphereGeometry />
          <meshLambertMaterial map={sphereAtmosMapTexture} transparent />
        </mesh>
      ) : null}
    </group>
  );
};

export default SphereBody;
