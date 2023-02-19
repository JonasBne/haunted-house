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

export const createHouse = () => {
  const house = new THREE.Group();
  const walls = createWalls();
  const roof = createRoof();
  const door = createDoor();

  house.add(walls);
  house.add(roof);
  house.add(door);

  return house;
};
