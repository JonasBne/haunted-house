import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();

export const createFloor = () => {
  const geo = new THREE.PlaneGeometry(20, 20);
  const material = new THREE.MeshStandardMaterial({ color: '#a9c388' });

  return new THREE.Mesh(geo, material);
};

const createWalls = () => {
  const wallsTexture = textureLoader.load(
    '../../static/textures/bricks/color.jpg',
  );

  const wallSizes = {
    width: 4,
    height: 3,
    depth: 4,
  };

  const walls = new THREE.Mesh(
    new THREE.BoxGeometry(wallSizes.width, wallSizes.height, wallSizes.depth),
    new THREE.MeshStandardMaterial({ map: wallsTexture }),
  );

  walls.position.y = wallSizes.height / 2;

  return walls;
};

const createRoof = () => {
  const roofSizes = {
    radius: 3.5,
    height: 1,
    radialSegments: 4,
  };

  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(
      roofSizes.radius,
      roofSizes.height,
      roofSizes.radialSegments,
    ),
    new THREE.MeshStandardMaterial({ color: '#b35f45' }),
  );

  // walls sizes + half height of the roof
  roof.position.y = 3 + roofSizes.height / 2;
  // 360 degrees is 2 times PI so in this case we need to rotate only 1/4th of PI
  roof.rotation.y = Math.PI / 4;

  return roof;
};

const createDoor = () => {
  const doorTexture = textureLoader.load(
    '../../static/textures/door/color.jpg',
  );

  const doorSizes = {
    width: 1.4,
    height: 2.3,
  };

  const door = new THREE.Mesh(
    new THREE.PlaneGeometry(doorSizes.width, doorSizes.height),
    new THREE.MeshStandardMaterial({ map: doorTexture }),
  );

  // depth of walls divided by two but with a little extra to avoid flickering
  door.position.z = 2.01;
  door.position.y = doorSizes.height / 2;

  return door;
};

// keep the geometries and materials separate for performance
// reuse them multiple times instead of initializing new instances each time
const createBush = () => {
  const bushSizes = {
    radius: 1,
    widthSegments: 16,
    heightSegments: 16,
  };

  return new THREE.Mesh(
    new THREE.SphereGeometry(
      bushSizes.radius,
      bushSizes.widthSegments,
      bushSizes.heightSegments,
    ),
    new THREE.MeshStandardMaterial({ color: '#89c854' }),
  );
};

export const createHouse = () => {
  const house = new THREE.Group();

  const walls = createWalls();
  const roof = createRoof();
  const door = createDoor();

  const bush1 = createBush();
  bush1.scale.set(0.5, 0.5, 0.5);
  bush1.position.set(1.25, 0.1, 2);

  const bush2 = createBush();
  bush2.scale.set(0.25, 0.25, 0.25);
  bush2.position.set(1.7, 0.1, 2.2);

  const bush3 = createBush();
  bush3.scale.set(0.6, 0.6, 0.6);
  bush3.position.set(-1.35, 0.1, 2);

  const bush4 = createBush();
  bush4.scale.set(0.2, 0.2, 0.2);
  bush4.position.set(-2, 0.1, 2.3);

  const bush5 = createBush();
  bush5.scale.set(0.2, 0.2, 0.2);
  bush5.position.set(-1.8, 0.1, 2.5);

  house.add(walls, roof, door);
  house.add(bush1, bush2, bush3, bush4, bush5);

  return house;
};
