import { Euler, Vector3 } from "@react-three/fiber";

type PlanetData = {
  id: string;
  position: Vector3;
  scale?: number;
  rotationSpeed: number;
  atmosRotationSpeed: number;
  mapTexture: string;
  normalMapTexture?: string;
  axisRotation?: Euler;
  atmosMapTexture?: string;
  ringTexture?: string;
};

const planets: PlanetData[] = [
  {
    id: "Mercury",
    position: [-10, 0, 0],
    scale: 0.5,
    rotationSpeed: 0.1,
    atmosRotationSpeed: 0.15,
    mapTexture: "Earth/mercurymap.jpg",
    axisRotation: [0, 0, 0],
  },
  {
    id: "Venus",
    position: [10, 0, 0],
    scale: 0.9,
    rotationSpeed: 0.1,
    atmosRotationSpeed: 0.15,
    mapTexture: "Earth/venusmap.jpg",
    axisRotation: [0, 0, 0],
  },
  {
    id: "Earth",
    position: [-15, 0, 0],
    scale: 1,
    rotationSpeed: 0.2,
    atmosRotationSpeed: 0.15,
    mapTexture: "Earth/earth_atmos_4096.jpg",
    axisRotation: [0, 0, 0.403],
    atmosMapTexture: "Earth/earth_clouds_2048-low.png",
  },
  {
    id: "Mars",
    position: [15, 0, 0],
    scale: 0.8,
    rotationSpeed: 0.1,
    atmosRotationSpeed: 0.15,
    mapTexture: "Earth/mars_1k_color.jpg",
    normalMapTexture: "Earth/mars_1k_normal.jpg",
    axisRotation: [0, 0, 0],
  },
  {
    id: "Jupiter",
    position: [-25, 0, 0],
    scale: 5,
    rotationSpeed: 0.5,
    atmosRotationSpeed: 0,
    mapTexture: "Earth/jupiter2_4k.jpg",
    axisRotation: [0, 0, 0],
  },
  {
    id: "Saturn",
    position: [25, 0, 0],
    scale: 4,
    rotationSpeed: 0.5,
    atmosRotationSpeed: 0,
    mapTexture: "Earth/saturnmap.jpg",
    axisRotation: [0, 0, 0],
    ringTexture: "saturnring.png",
  },
  {
    id: "Uranus",
    position: [-35, 0, 0],
    scale: 3,
    rotationSpeed: 0.5,
    atmosRotationSpeed: 0,
    mapTexture: "Earth/uranusmap.jpg",
    axisRotation: [0, 0, 0],
  },
  {
    id: "Neptune",
    position: [35, 0, 0],
    scale: 3,
    rotationSpeed: 0.5,
    atmosRotationSpeed: 0,
    mapTexture: "Earth/neptunemap.jpg",
    axisRotation: [0, 0, 0],
  },
  {
    id: "Pluto",
    position: [-40, 0, 0],
    scale: 0.3,
    rotationSpeed: 0.5,
    atmosRotationSpeed: 0,
    mapTexture: "Earth/plutomap1k.jpg",
    axisRotation: [0, 0, 0],
  },
];

export default planets;
