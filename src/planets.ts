import { Euler, Vector3 } from "@react-three/fiber";

type PlanetData = {
  id: string;
  position: Vector3;
  scale?: number;
  rotationSpeed: number;
  atmosRotationSpeed: number;
  mapTexture: string;
  axisRotation?: Euler;
  atmosMapTexture?: string;
};

const planets: PlanetData[] = [
  {
    id: "Earth",
    position: [30, 0, 0],
    scale: 1,
    rotationSpeed: 0.2,
    atmosRotationSpeed: 0.15,
    mapTexture: "Earth/earth_atmos_4096.jpg",
    axisRotation: [0, 0, 0.403],
    atmosMapTexture: "Earth/earth_clouds_2048.png",
  },
];

export default planets;
