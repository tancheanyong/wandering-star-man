import React, { FC } from "react";

const OrbitalLines: FC<{ radius: number }> = ({ radius }) => {
  return (
    <mesh rotation={[-1.5708, 0, 0]}>
      <ringGeometry args={[radius, radius + 0.02, 120]} />
      <meshBasicMaterial color={"white"} />
    </mesh>
  );
};

export default OrbitalLines;
