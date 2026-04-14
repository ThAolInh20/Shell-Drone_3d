import { Clock } from './core/Clock.js';
import { CameraManager } from './core/CameraManager.js';
import { SceneManager } from './core/SceneManager.js';
import { Renderer } from './core/Renderer.js';
import { InputSystem } from './systems/InputSystem.js';
import { MovementSystem } from './systems/MovementSystem.js';
import './style.css';

// Initialize Core ECS Boilerplate
const clock = new Clock();
const renderer = new Renderer();
const cameraManager = new CameraManager();
const sceneManager = new SceneManager();

// Initialize Systems
const inputSystem = new InputSystem(cameraManager.instance, document.body);
const movementSystem = new MovementSystem(inputSystem, cameraManager.instance);

// Inject pointer lock controls into scene
sceneManager.instance.add(inputSystem.controls.getObject());

function animate() {
  requestAnimationFrame(animate);

  clock.update();
  
  // Systems update
  movementSystem.update(clock.deltaTime);

  // Render loop
  renderer.render(sceneManager.instance, cameraManager.instance);
}

// Start simulation
animate();