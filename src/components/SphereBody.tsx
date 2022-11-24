import { Euler, useFrame, useLoader, Vector3 } from "@react-three/fiber";
import React, { FC, MutableRefObject, Ref, useRef } from "react";
import { BufferGeometry, Group, Material, Mesh, TextureLoader } from "three";

type SphereBodyProps = {
  position: Vector3;
  scale?: number;
  rotationSpeed: number;
  atmosRotationSpeed: number;
  mapTexture: string;
  normalMapTexture?: string;
  axisRotation?: Euler;
  atmosMapTexture?: string;
  ring?: boolean;
  onClick?: () => void;
};

const SphereBody: FC<SphereBodyProps> = ({
  position,
  scale = 1,
  onClick,
  rotationSpeed,
  atmosRotationSpeed = 0,
  mapTexture,
  normalMapTexture,
  axisRotation = [0, 0, 0],
  ring,
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
  const normalMap = useLoader(
    TextureLoader,
    normalMapTexture ?? "default-map.jpeg"
  );
  const sphereAtmosMapTexture = useLoader(
    TextureLoader,
    atmosMapTexture ?? "logo192.png"
  );

  return (
    // axisRotation uses Euler which is in radians
    <group onClick={onClick} position={position} rotation={axisRotation}>
      <mesh ref={sphereBaseRef}>
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
      {ring ? (
        <mesh rotation={[1.5708, 3.7, 0]}>
          <ringGeometry args={[scale, scale + 2, 60]} />
          <meshBasicMaterial color={"yellow"} />
        </mesh>
      ) : null}
    </group>
  );
};

export default SphereBody;
