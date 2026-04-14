# Architecture

## High-Level Paradigm: Entity-Component-System (ECS) Hybrid
The rendering and logic structure leans towards an ECS-like approach, or at least a strict separation of concerns, heavily customized for 3D/Canvas graphics. 

### 1. Core (`src/core/`)
Manages the global state, the WebGL context, and the foundational Three.js engine lifecycle.
- **Renderer (`Renderer.js`)**: Encapsulates Three.js `WebGLRenderer` configuration.
- **SceneManager (`SceneManager.js`)**: Manages the main Three.js `Scene` instance.
- **CameraManager (`CameraManager.js`)**: Manages the `PerspectiveCamera` and its behaviors (resizing, basic transforms).
- **Clock (`Clock.js`)**: Manages the requestAnimationFrame loop, delta time tracking, and synchronization for the animation sequence.

### 2. Systems (`src/systems/`)
Handles logic and mutations on the entities based on delta time over the application loop.
- **InputSystem (`InputSystem.js`)**: Handles user interactions.
- **MovementSystem (`MovementSystem.js`)**: Processes updates to object transforms.
- **PhysicSystem (`PhysicSystem.js`)**: Processes drag, gravity (e.g., $0.9 px/s^2$), limits, and velocity impacts on entities (like fireworks and drones).

### 3. Entities
Based on the design documents, these will map directly to visual components.
- **Shell**: The main controller for a single firework event. Modifies the launch/burst mechanics.
- **Star**: Individual particles spawned upon a firework burst.
- **Drone / FormationV2**: Objects that handle complex choreographed drone actions prior to or alongside the burst mechanics.

## Sequence Flow
1. **Bootstrap**: `main.js` instantiates Core components.
2. **Launch Phase**: An Entity (e.g. `Shell`) is instantiated, initiating a comet launch.
3. **Loop**: The `Clock` dictates frame updates. The `Systems` update velocities, positions, physics, and lifetimes.
4. **Render**: The `Renderer` draws the Scene from the perspective of the `CameraManager`.
