import * as THREE from 'three';

export class SceneManager {
  constructor() {
    this.instance = new THREE.Scene();
    
    // Set a very dark blue/black color for night sky void
    this.instance.background = new THREE.Color(0x050510);
    this.instance.fog = new THREE.FogExp2(0x050510, 0.002);
    
    // Create subtle background stars to give the void some reference points
    const starGeo = new THREE.BufferGeometry();
    const starCounts = 1500;
    const starPositions = new Float32Array(starCounts * 3);
    for(let i = 0; i < starCounts * 3; i++) {
        // Spread stars widely
        starPositions[i] = (Math.random() - 0.5) * 2000;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({color: 0x8888aa, size: 0.8, sizeAttenuation: true});
    const stars = new THREE.Points(starGeo, starMat);
    this.instance.add(stars);

    // Optional: subtle ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    this.instance.add(ambientLight);
  }
}
