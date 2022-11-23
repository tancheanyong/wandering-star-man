import { useFrame, useLoader, Vector3 } from "@react-three/fiber";
import React, { FC, useRef } from "react";
import { Mesh, TextureLoader } from "three";

type EarthCloudsProps = {
  rotationSpeed?: number;
  position?: Vector3;
};

const EarthClouds: FC<EarthCloudsProps> = ({
  rotationSpeed = 0.2,
  position,
}) => {
  const earthCloudRef = useRef<Mesh>(null!);
  const clouds = useLoader(TextureLoader, "Earth/earth_clouds_2048.png");

  useFrame(({ clock }) => {
    earthCloudRef.current.rotation.y = clock.getElapsedTime() * rotationSpeed;
  });

  return (
    <mesh scale={1.05} ref={earthCloudRef} position={position}>
      <sphereGeometry />
      <meshLambertMaterial map={clouds} transparent />
    </mesh>
  );
};

export default EarthClouds;
