import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./Space.scss";
import Earth from "./Earth/Earth";

const Space = () => {
  return (
    <div className="space">
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.2} />
        <directionalLight position={[-1, 0, 1]} intensity={1} castShadow />
        <Earth />
      </Canvas>
    </div>
  );
};

export default Space;
