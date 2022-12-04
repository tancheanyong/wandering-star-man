import { useThree } from "@react-three/fiber";

const InteractiveSphere = () => {
  const { camera } = useThree();

  return (
    <group quaternion={camera.quaternion}>
      <mesh>
        <ringGeometry args={[1, 1.02, 60]} />
        <meshBasicMaterial color={"white"} />
      </mesh>
      <mesh>
        <circleGeometry args={[1, 60]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
};

export default InteractiveSphere;
