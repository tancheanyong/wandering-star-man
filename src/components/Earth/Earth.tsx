import { Vector3 } from "@react-three/fiber";
import { FC, useState } from "react";
import EarthBase from "./EarthBase";
import EarthClouds from "./EarthClouds";

type EarthProps = { position: Vector3; onClick?: () => void };

const Earth: FC<EarthProps> = ({ position, onClick }) => {
  return (
    <group onClick={onClick}>
      <EarthBase position={position} />
      <EarthClouds position={position} />
    </group>
  );
};

export default Earth;
