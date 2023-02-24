import * as THREE from 'three';
import { colors } from '../consts';

const textureLoader = new THREE.TextureLoader();

export const createFloor = () => {
  const floorColorTexture = textureLoader.load(
    '../../static/textures/grass/color.jpg',
  );
  const floorAmbientOcclusionTexture = textureLoader.load(
    '../../static/textures/grass/ambientOcclusion.jpg',
  );
  const floorNormalTexture = textureLoader.load(
    '../../static/textures/grass/normal.jpg',
  );
  const floorRoughnessTexture = textureLoader.load(
    '../../static/textures/grass/roughness.jpg',
  );

  // repeat the texture in smaller sizes to avoid that really large grasses
  floorColorTexture.repeat.set(8, 8);
  floorAmbientOcclusionTexture.repeat.set(8, 8);
  floorNormalTexture.repeat.set(8, 8);
  floorRoughnessTexture.repeat.set(8, 8);

  // textures do not repeat by default so this has to be activated
  floorColorTexture.wrapS = THREE.RepeatWrapping;
  floorColorTexture.wrapT = THREE.RepeatWrapping;

  floorAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
  floorAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;

  floorNormalTexture.wrapS = THREE.RepeatWrapping;
  floorNormalTexture.wrapT = THREE.RepeatWrapping;

  floorRoughnessTexture.wrapS = THREE.RepeatWrapping;
  floorRoughnessTexture.wrapT = THREE.RepeatWrapping;

  const geo = new THREE.PlaneGeometry(20, 20);
  const material = new THREE.MeshStandardMaterial({
    map: floorColorTexture,
    aoMap: floorAmbientOcclusionTexture,
    normalMap: floorNormalTexture,
    roughnessMap: floorRoughnessTexture,
  });

  const floor = new THREE.Mesh(geo, material);

  floor.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2),
  );

  return floor;
};

const createWalls = () => {
  const bricksColorTexture = textureLoader.load(
    '../../static/textures/bricks/color.jpg',
  );
  const bricksAmbientOcclusionTexture = textureLoader.load(
    '../../static/textures/bricks/ambientOcclusion.jpg',
  );
  const bricksNormalTexture = textureLoader.load(
    '../../static/textures/bricks/normal.jpg',
  );
  const bricksRoughnessTexture = textureLoader.load(
    '../../static/textures/bricks/roughness.jpg',
  );

  const wallSizes = {
    width: 4,
    height: 3,
    depth: 4,
  };

  const walls = new THREE.Mesh(
    new THREE.BoxGeometry(wallSizes.width, wallSizes.height, wallSizes.depth),
    new THREE.MeshStandardMaterial({
      map: bricksColorTexture,
      aoMap: bricksAmbientOcclusionTexture,
      normalMap: bricksNormalTexture,
      roughnessMap: bricksRoughnessTexture,
    }),
  );

  walls.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2),
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
    new THREE.MeshStandardMaterial({ color: colors.roof }),
  );

  // walls sizes + half height of the roof
  roof.position.y = 3 + roofSizes.height / 2;
  // 360 degrees is 2 times PI so in this case we need to rotate only 1/4th of PI
  roof.rotation.y = Math.PI / 4;

  return roof;
};

const createDoor = () => {
  const doorColorTexture = textureLoader.load(
    '../../static/textures/door/color.jpg',
  );
  const doorAlphaTexture = textureLoader.load(
    '../../static//textures/door/alpha.jpg',
  );
  const doorAmbientOcclusionTexture = textureLoader.load(
    '/textures/door/ambientOcclusion.jpg',
  );
  const doorHeightTexture = textureLoader.load(
    '../../static//textures/door/height.jpg',
  );
  const doorNormalTexture = textureLoader.load(
    '../../static//textures/door/normal.jpg',
  );
  const doorMetalnessTexture = textureLoader.load(
    '../../static//textures/door/metalness.jpg',
  );
  const doorRoughnessTexture = textureLoader.load(
    '../../static//textures/door/roughness.jpg',
  );

  const doorSizes = {
    width: 2.2,
    height: 2.4,
  };

  const door = new THREE.Mesh(
    new THREE.PlaneGeometry(doorSizes.width, doorSizes.height, 100, 100),
    new THREE.MeshStandardMaterial({
      map: doorColorTexture,
      transparent: true,
      alphaMap: doorAlphaTexture,
      aoMap: doorAmbientOcclusionTexture,
      displacementMap: doorHeightTexture,
      displacementScale: 0.1,
      normalMap: doorNormalTexture,
      metalnessMap: doorMetalnessTexture,
      roughnessMap: doorRoughnessTexture,
    }),
  );

  door.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2),
  );

  // depth of walls divided by two but with a little extra to avoid flickering
  door.position.z = 2.01;
  door.position.y = doorSizes.height / 2 - 0.1;

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

  const bush = new THREE.Mesh(
    new THREE.SphereGeometry(
      bushSizes.radius,
      bushSizes.widthSegments,
      bushSizes.heightSegments,
    ),
    new THREE.MeshStandardMaterial({ color: colors.bush }),
  );

  return bush;
};

const createGrave = () => {
  const graveSizes = {
    width: 0.6,
    height: 0.8,
    depth: 0.2,
  };

  const grave = new THREE.Mesh(
    new THREE.BoxGeometry(
      graveSizes.width,
      graveSizes.height,
      graveSizes.depth,
    ),
    new THREE.MeshStandardMaterial({ color: colors.grave }),
  );

  return grave;
};

const createDoorLight = () => {
  const doorLight = new THREE.PointLight(colors.doorLight, 2, 10);
  doorLight.position.z = 2.2;
  doorLight.position.y = 2.7;

  return doorLight;
};

export const createGraves = () => {
  const graves = new THREE.Group();

  for (let i = 0; i < 60; i++) {
    // multiply random number with Math.PI to make sure it stays in a circle
    const angle = Math.random() * Math.PI * 2;
    // random radius to position it away from the house
    const radius = 3 + Math.random() * 6;
    const xPosition = Math.sin(angle) * radius;
    const zPosition = Math.cos(angle) * radius;

    const grave = createGrave();

    grave.castShadow = true;

    grave.position.set(xPosition, 0.3, zPosition);
    grave.rotation.z = (Math.random() - 0.5) * 0.4;
    grave.rotation.y = (Math.random() - 0.5) * 0.4;
    graves.add(grave);
  }

  return graves;
};

export const createGhosts = () => {
  const ghost1 = new THREE.PointLight(colors.ghost1, 2, 3);
  const ghost2 = new THREE.PointLight(colors.ghost2, 2, 3);
  const ghost3 = new THREE.PointLight(colors.ghost3, 2, 3);

  return {
    ghost1,
    ghost2,
    ghost3,
  };
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

  const doorLight = createDoorLight();

  house.add(walls, roof, door);
  house.add(bush1, bush2, bush3, bush4, bush5);
  house.add(doorLight);

  return house;
};
