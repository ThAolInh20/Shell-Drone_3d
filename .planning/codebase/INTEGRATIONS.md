# Integrations

## Current External Services & APIs
*This project currently has no active integrations with third-party web APIs, authentication services, or databases.*

## Asset & Media Loading
- Currently relies on static assets located in the `src/assets/` and `public/` directories.
- Three.js asset loaders (e.g. `TextureLoader`) will be used to integrate texture pipelines using these static assets.

## CI/CD Pipeline
- Given the state of the codebase, no continuous integration or continuous deployment workflows (like GitHub Actions) are defined.

## Build Process Integrations
- Handled fully by `Vite`, enabling HMR (Hot Module Replacement) and bundling. No custom webpack configuration is involved.
