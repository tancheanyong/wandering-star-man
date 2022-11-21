# Creating a scene

## Three Js

```ts
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";

// Creating a canvas
const scene = new Scene();
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Render the scene and camera using webGL
const renderer = new WebGLRenderer({ alpha: true });
render.setSize(window.innerWidth, window.innerHeight);

const container = document.gerElementById("root");

if (container) {
  container.appendChild(renderer.domElement);
}
```

## Fiber

```tsx
export default function R3F() {
  return (
    <Canvas>
      <></>
    </Canvas>
  );
}
```

# Adding a new mesh

Every mesh must have a geometry and a material to render.

## Three Js

```js
const cube = new Mesh();

const geometry = new BoxGeometry();
const material = new MeshStandardMaterial();

cube.geometry = geometry;
cube.material = material;

// Camera default z is 0, which is the exact same as the cube
camera.position.z = 5;

scene.add(cube);
```

## Fiber

Every root children of the Canvas component is equivalent to `scene.add()` in Three Js. In this example, we can see the mesh being added.

```tsx
export default function R3F() {
  return (
    <Canvas>
      <mesh>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
    </Canvas>
  );
}
```

Any nested children will also be added in the same way. For example, this

```tsx
export default function R3F() {
  return (
    <Canvas>
      <mesh>
        <mesh></mesh>
      </mesh>
    </Canvas>
  );
}
```

will translate to

```js
const cube = new Mesh();
const secondMesh = new Mesh();

scene.add(cube);
cube.add(secondMesh);
```

Or if using groups, which is recommended over nested meshes, as group allows you to control all children meshes at once:

```js
const group = new Group();
group.add(mesh);
```

```tsx
<Canvas>
  <group>
    <mesh></mesh>
    <mesh></mesh>
  </group>
</Canvas>
```

### Camera

In the Canvas comonent, camera is set to z 5 and using Perspective Camera by default.

We can also override default camera properties through the camera props in Canvas

```tsx
    <Canvas camera={{position:[0,0,10]}}>

```

We can also use camera as a jsx component through the drei library

```tsx
<Canvas>
  // makeDefault prop override the default camera in Canvas
  <PerspectiveCamera makeDefault fov={75} position={[0, 0, 10]} />
</Canvas>
```

# Properties of components (attaching)

Any child with the `attach` prop will be added as a property of the mesh instead of its child

```js
mesh.someProperty = someProperty;
```

```tsx
<mesh><someProperty attach='someProperty'></mesh>
```

This is actually what happens with geometry and material:

```js
mesh.geometry = geometry;
mesh.material = material;
```

```tsx
<mesh>
  <boxGeometry attach="geometry" />
  <meshStandardMaterial attach="material" />
</mesh>
```

However, in the case of geometry and material, we don't need to specify the attach prop since they are commonly used, and so three fiber has handled it by default.

Also, instead of using attach, we can also just use it as a prop on the component itself

```tsx
<mesh>
  <meshStandardMaterial color={'blue'} />
</mesh>

// instead of
<mesh>
  <meshStandardMaterial>
    <color args={["blue"]} attach='color' />
  </meshStandardMaterial>
</mesh>


```

# Naming

Every three js classes that exist is represented by a camel case fiber component. The reason fiber components start with lower case is because it follows React convention, where every primitive components are lower case, eg: divs

# Arguments

Any arguments for classes in three js can be inserted into the `args` prop in fiber.

```js
// Initialising with a size
const geometry = new BoxGeometry(2, 2, 2);
```

```tsx
<boxGeometry args={[2, 2, 2]} />
```

# Componetizing

Componetizing is usually done with classes in three js, for example, we componetize our cube mesh:

```js
class Cube extends Mesh {
  constructor() {
    super();

    const geometry = new BoxGeometry();
    const material = new MeshStandardMaterial();

    cube.geometry = geometry;
    cube.material = material;
  }
}
const cube = new Cube();
scene.add(cube);
```

And in fiber it's of course just another component

```tsx
const Cube = () => {
  <mesh>
    <boxGeometry />
    <meshStandardMaterial />
  </mesh>;
};

export default function R3F() {
  return (
    <Canvas>
      <Cube />
    </Canvas>
  );
}
```

# Animation

In three js, we typically use the animate function

```js
class Cube extends Mesh {
  constructor() {
    super();

    const geometry = new BoxGeometry();
    const material = new MeshStandardMaterial();

    cube.geometry = geometry;
    cube.material = material;
  }

  // update will be called every frame
  update() {
    this.rotation.x += 0.01;
  }
}

const cube = new Cube();

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  cube.update();
}

animate();
```

In fiber, we use the `useFrame` hook, which will be called every single frame.

```tsx
const Cube = () => {
// Gets reference to our cube mesh
const cubeRef=useRef<Mesh>(null!)

  // Runs every frame
  useFrame(()=>{
    if(!cubeRef.current){
      return
    }

    cubeRef.current.rotation.x+=0.01
  })

  <mesh ref={cubeRef}>
    <boxGeometry />
    <meshStandardMaterial />
  </mesh>;
};

export default function R3F() {
  return (
    <Canvas>
      <Cube />
    </Canvas>
  );
}
```

React Spring library could also help animate more declaratively for fiber
