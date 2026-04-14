# Conventions

## Module System
- **ES Modules**: `import` and `export` are exclusively used. Files have the `.js` extension (as defined by `type: module` in `package.json`).

## Naming Standards
- **Classes / Entities**: PascalCase for class files and constructor names (e.g., `CameraManager`, `MovementSystem`, `Shell`).
- **Instances / Variables**: camelCase (e.g., `cameraManager`, `starLifeVariation`).
- **Constants**: UPPER_SNAKE_CASE for global constants or immutable configs (e.g., `GRAVITY`, `COLOR.Gold`).

## Three.js Interactions
- Three.js objects generally shouldn't have arbitrary logic attached directly to their instances. Custom properties (like life, velocity) should be managed via wrapping entity objects (`Star`, `Shell`), maintaining a clear boundary between logical objects and rendering components (`Mesh`, `Material`).

## Code Structure Rules
- **No Globals**: Avoid writing variables to `window`. Systems and Managers should be cleanly instantiable to allow testability.
- **Factory/Builder Preference**: Use factories and builder patterns for entities with large parameter combinations over massive constructors (as called out in `SHELL_CLASS_DESIGN.md`).
- **Lifecycle Methods**: Objects that update per frame should expose an `.update(deltaTime)` method, consumed by the main loop.
