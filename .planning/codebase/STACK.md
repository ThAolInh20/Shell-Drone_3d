# Tech Stack

## Core Language
- **JavaScript (ES Modules)**: The primary language used for logic.

## Build Tooling & Environment
- **Vite (v8+)**: Fast frontend build tool and development server, chosen for its fast HMR and optimized production builds.
- **Node.js**: The underlying runtime for the build and dev tools.

## Graphics & Rendering
- **Three.js (v0.183+)**: The core 3D library used to render the webGL animation for particles, drones, and fireworks. It provides the abstractions (Scenes, Cameras, Renderers) on top of raw WebGL.

## UI & Styling
- **CSS3 / Vanilla CSS**: Standard stylesheets (`src/style.css`) used for layout outside the canvas and setting the web app baseline. HTML5 and CSS are kept minimal, delegating rendering to the Three.js Canvas.

## Target Platform
- **Modern Web Browsers**: Relying on WebGL support.
