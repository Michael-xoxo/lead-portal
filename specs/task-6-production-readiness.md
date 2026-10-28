# SPEC: Task 1.6 - Production Readiness, Static Build & Deployment Config

## GOAL
Hardcode zero secrets, ensure robust production asset serving / CORS configuration in `server.js`, provide unified root build/start scripts in `package.json`, and verify end-to-end production compilation.

## ACCEPTANCE CRITERIA
1. `package.json` in root updated with:
   - `"build"`: Installs client dependencies and builds production assets (`cd client && npm install && npm run build`).
   - `"start"`: Runs `node server.js` for production execution.
2. `server.js` production configuration:
   - When `process.env.NODE_ENV === 'production'`, serves static files from `path.join(__dirname, 'client/dist')`.
   - Wildcard fallback (`*`) in production routes non-API GET requests to `client/dist/index.html` to support client-side view rendering.
3. CORS configuration in `server.js`:
   - Supports `process.env.CLIENT_ORIGIN` if defined, defaulting to standard dev origins without breaking Vite proxy.
4. Git & Security Audit:
   - Verify `.env` is strictly ignored and untracked.
   - Verify `git status` displays no leaked credential files.
5. Production Build Verification:
   - Running `npm run build` from root completes without errors and populates `client/dist`.

## CONSTRAINTS
- Do not remove or alter existing API endpoints (`/api/leads`, `/health`).
- Do not introduce heavy containerization or Docker setups (keep deployment zero-overhead).

## STOPPING CONDITIONS
- Stop if production build script fails to compile `client/dist`.
- Stop if `.env` or credential strings are tracked in git history.

## BLAST RADIUS
MEDIUM (Touches root `package.json` scripts and adds production static middleware to `server.js`).

## VERIFICATION STEPS
1. Run root `npm run build` -> confirm `client/dist/index.html` and bundled assets generate cleanly.
2. Verify git cleanliness -> confirm `.env` is untracked and only `.env.example` exists in version control.
3. Test production execution locally (`NODE_ENV=production node server.js`) -> confirm accessing `http://localhost:5000/` serves the React production bundle, and `/api/leads` remains fully functional.
4. Update `session-notes.md` per Rule 7 with final project architectural takeaways.