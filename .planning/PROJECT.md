# 3D Fireworks Simulation & FPS Engine

## What This Is

An interactive, first-person-shooter (FPS) style WebGL application built with Three.js. It allows the user to explore a 3D night sky environment using WASD keys and mouse-look, serving as a pristine backdrop for an advanced, choreographed fireworks system.

## Core Value

Fluid, immersive first-person navigation inside a beautiful, highly performant WebGL environment that highlights the fireworks simulation beautifully.

## Requirements

### Validated
(None yet — ship to validate)

### Active
- [ ] Implement an Entity-Component-System (ECS) styled loop.
- [ ] Add PointerLockControls for first-person mouse look.
- [ ] Add WASD movement logic responsive to camera orientation.
- [ ] Create a dark night sky immersive space.
- [ ] Implement the `Shell` and `Star` simulation based on class design.

### Out of Scope
- [ ] Rigid body physics and gravity applied to the player (the user is an ethereal flying observer traversing the void).
- [ ] Multi-player networking (strictly a standalone front-end visual experience).

## Context
A web-based interactive animation originally scoped around drone formations and fireworks bursts (`idea-design`). The user wants to fly around in the fireworks show, rather than consume it from a static camera view.

## Constraints
- **Tech stack**: Vanilla JavaScript + Three.js + Vite. No heavy UI frameworks (React/Vue) unless strictly for standalone HTML overlay panels.
- **Performance**: High priority. WebGL geometry batching must be used for thousands of firework particles to maintain 60 FPS.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Night sky void environment | User explicitly requested focusing on the dark night sky rather than a ground plane for navigation. | — Pending |
| Three.js PointerLockControls | Proven, standard system for FPS control rather than custom dragging logic. | — Pending |

---
*Last updated: 2026-04-14 after initialization*
