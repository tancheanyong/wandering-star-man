import { Euler, useFrame, useLoader, Vector3 } from "@react-three/fiber";
import React, { FC, MutableRefObject, Ref, useRef } from "react";
import { BufferGeometry, Group, Material, Mesh, TextureLoader } from "three";

type SphereBodyProps = {
  position: Vector3;
  scale?: number;
  rotationSpeed: number;
  atmosRotationSpeed: number;
  mapTexture: string;
  axisRotation?: Euler;
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
  axisRotation = [0, 0, 0],
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
    // axisRotation uses Euler which is in radians
    <group onClick={onClick} position={position} rotation={axisRotation}>
      <mesh ref={sphereBaseRef}>
        <sphereGeometry args={[scale / 2, 40, 40]} />
        <meshPhysicalMaterial map={sphereBaseMapTexture} />
      </mesh>
      {atmosMapTexture ? (
        <mesh scale={1.05} ref={sphereAtmosRef}>
          <sphereGeometry args={[scale / 2, 40, 40]} />
          <meshLambertMaterial map={sphereAtmosMapTexture} transparent />
        </mesh>
      ) : null}
    </group>
  );
};

export default SphereBody;
