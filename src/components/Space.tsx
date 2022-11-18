import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./Space.scss";

const Box = () => {
  return (
    <mesh>
      <boxBufferGeometry />
      <meshLambertMaterial />
    </mesh>
  );
};

const Space = () => {
  return (
    <div className="space">
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <spotLight position={[0, 5, 0]} angle={3} />
        <Box />
      </Canvas>
    </div>
  );
};

export default Space;
