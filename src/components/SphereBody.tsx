import { useFrame, useLoader, Vector3 } from "@react-three/fiber";
import React, { FC, useRef } from "react";
import { Mesh, TextureLoader } from "three";

type SphereBodyProps = {
  position: Vector3;
  rotationSpeed: number;
  atmosRotationSpeed: number;
  mapTexture: string;
  atmosMapTexture: string;
  onClick?: () => void;
};

const SphereBody: FC<SphereBodyProps> = ({
  position,
  onClick,
  rotationSpeed,
  atmosRotationSpeed,
  mapTexture,
  atmosMapTexture,
}) => {
  const sphereBaseRef = useRef<Mesh>(null!);
  const sphereAtmosRef = useRef<Mesh>(null!);

  useFrame(({ clock }) => {
    sphereBaseRef.current.rotation.y = clock.getElapsedTime() * rotationSpeed;
    sphereAtmosRef.current.rotation.y =
      clock.getElapsedTime() * atmosRotationSpeed;
  });

  const sphereBaseMapTexture = useLoader(TextureLoader, mapTexture);
  const sphereAtmosMapTexture = useLoader(TextureLoader, atmosMapTexture);

  return (
    <group onClick={onClick} position={position}>
      <mesh ref={sphereBaseRef}>
        <sphereGeometry />
        <meshPhysicalMaterial map={sphereBaseMapTexture} />
      </mesh>
      <mesh scale={1.05} ref={sphereAtmosRef}>
        <sphereGeometry />
        <meshLambertMaterial map={sphereAtmosMapTexture} transparent />
      </mesh>
    </group>
  );
};

export default SphereBody;
