## Quick Order – Expo + TypeScript
node >= 20

### This App Include:
- Main feature of quick order 
- Debounced search
- 2 unit tests for cart logic (total amount / total quantity). 
- Persist cart data.

### Run
- npm install
- npm start

### Test
- npm test

### Architecture
- Cart logic in useCart hook
- UI components are stateless
- Screen handles orchestration only

### Trade-offs / Improvements
- Add Rx validation before checkout
- Better UI components
- Zustand for global state if app grows
- E2E tests