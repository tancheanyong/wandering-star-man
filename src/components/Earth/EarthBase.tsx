import { FC, useRef } from "react";
import { useFrame, useLoader, Vector3 } from "@react-three/fiber";
import { Mesh, TextureLoader } from "three";

type EarthBaseProps = {
  rotationSpeed?: number;
  position?: Vector3;
};

const EarthBase: FC<EarthBaseProps> = ({ rotationSpeed = 0.26, position }) => {
  const earthRef = useRef<Mesh>(null!);
  useFrame(({ clock }) => {
    earthRef.current.rotation.y = clock.getElapsedTime() * rotationSpeed;
  });
  const diffuse = useLoader(TextureLoader, "Earth/earth_atmos_4096.jpg");

  return (
    <mesh ref={earthRef} position={position}>
      <sphereGeometry />
      <meshPhysicalMaterial map={diffuse} />
    </mesh>
  );
};
export default EarthBase;
