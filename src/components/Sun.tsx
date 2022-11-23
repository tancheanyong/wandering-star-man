import { FC } from "react";

const Sun: FC<any> = () => {
  return (
    <mesh position={[0, 0, 0]}>
      <pointLight />
      <sphereGeometry />
      <meshPhysicalMaterial color={"yellow"} emissive={"yellow"} />
    </mesh>
  );
};

export default Sun;
