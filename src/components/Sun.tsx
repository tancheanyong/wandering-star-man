import { useFrame, useLoader } from "@react-three/fiber";
import { FC, useRef } from "react";
import { Mesh, TextureLoader } from "three";

const Sun: FC<any> = () => {
  const sunRef = useRef<Mesh>(null!);
  const sunTexture = useLoader(TextureLoader, "8k_sun.jpg");

  useFrame(({ clock }) => {
    sunRef.current.rotation.y = clock.getElapsedTime() * 0.2;
  });

  return (
    <mesh position={[0, 0, 0]} ref={sunRef} scale={10}>
      <pointLight />
      <sphereGeometry />
      <meshPhysicalMaterial
        emissiveMap={sunTexture}
        emissive={"yellow"}
        emissiveIntensity={0.8}
      />
    </mesh>
  );
};

export default Sun;
