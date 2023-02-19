import * as THREE from 'three';

export const createFloor = () => {
  const geo = new THREE.PlaneGeometry(20, 20);
  const material = new THREE.MeshStandardMaterial({ color: '#a9c388' });

  return new THREE.Mesh(geo, material);
};

export const createHouse = () => {
  const walls = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 5),
    new THREE.MeshStandardMaterial(),
  );

  walls.position.y = 0.5;

  const house = new THREE.Group();
  house.add(walls);

  return house;
};
