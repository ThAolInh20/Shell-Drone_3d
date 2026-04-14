# Testing

## Current State
- The codebase currently lacks an automated testing framework (e.g., Jest, Vitest, Cypress). 
- Testing is entirely manual via the Vite preview (`npm run dev`).

## Future Testing Strategy (Recommended)
1. **Unit Testing**: Introduce a test harness (like Vitest, which pairs excellently with Vite) to validate non-graphical logic:
   - Physic calculations (e.g., gravity impacts on vectors).
   - Shell parameter generation factories.
2. **Visual/Integration Testing**: 
   - Use mock renderers or isolated scenes to simulate entity movement.
   - For UI overlays or graphical anomalies, utilize visual regression testing or manual play-testing loops.

## Manual Verification Methods
- The `SHELL_CLASS_DESIGN.md` requires testing specific shell types. When doing manual QA, run through all 18 shell variant generators to verify performance, look, and feel.
