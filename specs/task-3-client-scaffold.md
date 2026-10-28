# SPEC: Task 1.3 - Frontend Client Scaffold & API Handshake

## GOAL
Scaffold a minimal React application using Vite in a `/client` directory, configure a development proxy to the Express server, and verify client-to-server communication via a health check component.

## ACCEPTANCE CRITERIA
1. A fresh React application exists in `/client` created using standard Vite (`react` template, pure JavaScript).
2. `client/vite.config.js` configures a server proxy forwarding `/api` and `/health` requests to `http://localhost:5000`.
3. `client/src/App.jsx` executes a `useEffect` fetch call on mount to `/health`.
4. The client UI renders the server status:
   - Displays "Checking server status..." while pending.
   - Displays "Backend Status: Connected (ok)" on success.
   - Displays "Backend Status: Disconnected" on fetch error.
5. `client/package.json` contains standard scripts (`dev`, `build`).

## CONSTRAINTS
- Strict directory scope: All changes confined to `/client` and root `.gitignore`.
- Do not modify existing backend files (`server.js`, `controllers/`, `routes/`, `models/`).
- Do not install heavy component libraries (use standard semantic HTML and basic CSS).

## STOPPING CONDITIONS
- Stop if port collisions prevent Vite or Express from starting.
- Stop if changes are demanded inside root backend logic.

## BLAST RADIUS
LOW (Adding an isolated frontend folder; backend code remains untouched).

## VERIFICATION STEPS
1. Run backend server (`npm run dev` in root on port 5000).
2. Run frontend client (`npm run dev` in `/client` on port 5173).
3. Access `http://localhost:5173` via curl or browser check -> verify the rendered HTML/DOM contains "Backend Status: Connected (ok)".