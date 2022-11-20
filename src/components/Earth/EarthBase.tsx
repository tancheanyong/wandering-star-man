import { FC, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Mesh, TextureLoader } from "three";

type EarthBaseProps = {
  rotationSpeed?: number;
};

const EarthBase: FC<EarthBaseProps> = ({ rotationSpeed = 0.25 }) => {
  const earthRef = useRef<Mesh>(null!);
  useFrame(({ clock }) => {
    earthRef.current.rotation.y = clock.getElapsedTime() * rotationSpeed;
  });
  const diffuse = useLoader(TextureLoader, "Earth/earth_atmos_4096.jpg");

  return (
    <mesh ref={earthRef}>
      <sphereGeometry />
      <meshPhysicalMaterial map={diffuse} />
    </mesh>
  );
};
export default EarthBase;
