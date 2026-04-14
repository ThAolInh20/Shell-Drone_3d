# Codebase Structure

## Root Level
- `package.json` / `package-lock.json`: Dependency manifests (Vite, Three.js).
- `index.html`: The HTML entry point. Contains the mounting root for the canvas element.
- `public/`: Hosts static assets that are served exactly as they are without processing.

## `/src/`
The main source code directory containing all application logic.

### `/src/assets/`
Images, textures, models, and SVGs used within the application.
- Example: `hero.png`, `vite.svg`

### `/src/config/`
Houses constants and shared parameters. For instances, definitions for Glitter Modes, Colors, Strobe Configurations, and Physics Constants.

### `/src/core/`
The web-graphics and engine boilerplate wrappers.
- `CameraManager.js`, `Clock.js`, `Renderer.js`, `SceneManager.js`

### `/src/entities/`
The actual visual objects to be rendered on screen. Defined in `idea-design/SHELL_CLASS_DESIGN.md`. Expected to contain `Shell.js`, `Star.js`, `Drone.js`.

### `/src/systems/`
Encapsulations for frame-by-frame updates separated by logical domains.
- `InputSystem.js`, `MovementSystem.js`, `PhysicSystem.js`

### `/src/main.js`
The entry point. Currently acts as a boilerplate Three.js setup but will transition into orchestrating `Core` and `Systems`.

### `/src/style.css`
Base styling to remove body margins, ensure the canvas takes up the full un-scrollable viewport, and format any HTML UI overlays.

## `/idea-design/`
Holds markdown files representing initial brainstorming and architecture specs, such as `SHELL_CLASS_DESIGN.md`. Essential for understanding the target direction.
