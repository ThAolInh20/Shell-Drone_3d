# Project Roadmap

**Current Priority:** Phase 1

---

## Phase 1: Engine Initialization & Navigation
**Goal:** Establish the Three.js foundational systems and allow the user to look around and move in the night sky.
- Implement the Core managers: `SceneManager` (with night sky environment), `CameraManager`, `Renderer`, `Clock`.
- Wire `main.js` to the ECS loop.
- Implement `InputSystem` (PointerLock mouse look + keyboard listening).
- Implement `MovementSystem` (WASD direction translation relative to camera look vector).

## Phase 2: Fireworks Engine Integration
**Goal:** Port the `idea-design/SHELL_CLASS_DESIGN.md` theory into working classes.
- Build the `ParticleFactory` and implement `InstancedMesh` logic for performance.
- Implement the `Shell` launch and `burst()` trajectory physics.
- Wire `PhysicSystem` to update shell and particle properties based on `deltaTime`.

## Phase 3: Polish, UI, & Choreography
**Goal:** Allow users to trigger fireworks on click or run pre-programmed shows.
- Implement interactive UI triggers over the Canvas.
- Refine the visuals of the stars (glows, trails).
- Add drone formation support if required.
