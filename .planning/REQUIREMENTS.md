# Requirements

## Functional Requirements
1. **First-Person Controls**
   - The user must be able to click the screen to lock the pointer and look around 360 degrees using the mouse.
   - Using the W, A, S, D keys, the user must navigate forward, left, backward, right relative to where they are currently looking.
2. **Environment**
   - The scene must render a dark background resembling a night sky (can be pitch black or very dark blue with subtle stars).
3. **Core Architecture**
   - The game loop and Three.js initialization must follow the established Core and System structure.

## Non-Functional Requirements
1. **Performance**
   - Movement code must run coupled to delta-time, ensuring consistent movement speed regardless of framerate.
2. **Clean code**
   - No spaghetti Three.js code residing entirely within `main.js`. It must be properly segregated into `SceneManager`, `Renderer`, etc.
