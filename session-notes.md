# Session Notes

## Task 1.1 - Backend Foundation & Lead Schema

### Architectural Decision Made
- Configured Mongoose connection in `server.js` to asynchronously establish connection to MongoDB Atlas and attach event listeners (`connected`, `error`, `disconnected`) before initiating `app.listen`, ensuring the service does not accept incoming HTTP traffic until the persistence layer is verified. Additionally, implemented resilient URI resolution (`process.env.MONGO_URI || process.env.MONGODB_URI`) to support standard environment naming conventions seamlessly.

### Friction Point or Bug Encountered
- The Atlas onboarding configuration populated `.env` with `MONGODB_URI` instead of `MONGO_URI`, causing the initial server bootstrap to halt due to an undefined connection string. Resolving `mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI` resolved the discrepancy without requiring manual modification of the user's generated environment file.

## Task 1.2 - Lead Ingestion & Retrieval API Routes

### Architectural Decision Made
- Encapsulated all CRUD persistence and input validation logic (`createLead`, `getLeads`, `deleteLead`) in `controllers/leadController.js` decoupled from Express routing in `routes/leadRoutes.js`, combining explicit conditional checks for required fields (`name`, `email`, `projectType`) and `mongoose.Types.ObjectId.isValid(id)` checks with Mongoose `ValidationError` handling to return clean `400` and `404` responses without third-party validation dependencies.

### Friction Point or Bug Encountered
- Initial verification failed because the MongoDB Atlas cluster rejected the TLS handshake (`ERR_SSL_TLSV1_ALERT_INTERNAL_ERROR` / SSL alert number 80) due to the client IP address not being whitelisted in Atlas Network Access. Halting execution per Rule 5 and updating the Atlas IP access list (`0.0.0.0/0`) resolved the connection error and allowed full end-to-end verification.

## Task 1.3 - Frontend Client Scaffold & API Handshake

### Architectural Decision Made
- Configured Vite's development server proxy in `client/vite.config.js` to forward both `/api` and `/health` paths (`changeOrigin: true`) to `http://localhost:5000`, allowing the React frontend (`client/src/App.jsx`) to perform relative `fetch('/health')` and `fetch('/api/...')` calls without hardcoded origins or cross-origin preflight overhead during local development.

### Friction Point or Bug Encountered
- Because React CSR apps serve an empty `<div id="root"></div>` shell over raw `curl http://localhost:5173/`, verifying the rendered `"Backend Status: Connected (ok)"` string required executing a headless Chromium DOM dump (`chrome.exe --headless=new --dump-dom`) alongside `curl` proxy checks so the `useEffect` fetch lifecycle could complete and populate the DOM.

## Task 1.4 - Interactive Lead Capture Form

### Architectural Decision Made
- Implemented `LeadForm` (`client/src/components/LeadForm.jsx`) using a unified controlled `formData` state object (`useState(INITIAL_FORM_STATE)`) with explicit `isLoading`, `successMessage`, and `errorMessage` states, attaching `noValidate` to the `<form>` element while preserving semantic `required` attributes on inputs so invalid submissions reliably trigger the React `onSubmit` flow and render backend HTTP `400` validation errors in an accessible `role="alert"` banner without clearing existing user input.

### Friction Point or Bug Encountered
- During automated headless Chrome DevTools Protocol (CDP) verification, connecting to `pages[0]` from `/json` initially attached to an internal browser target rather than the React page tab, returning empty evaluation objects (`{}`). Filtering `/json/list` specifically for `type === 'page'` matching the Vite `localhost` origin resolved target selection and verified the full invalid, in-flight loading, and valid submission states against MongoDB Atlas.

## Task 1.5 - Admin Dashboard & Lead Management

### Architectural Decision Made
- Implemented view switching in `client/src/App.jsx` via local `activeTab` state (`'client' | 'admin'`) rather than introducing a client-side routing dependency (`react-router-dom`), so `AdminDashboard` (`client/src/components/AdminDashboard.jsx`) mounts cleanly when selected, fetches fresh lead data via `GET /api/leads`, and performs optimistic-free confirmed state updates (`prevLeads.filter((lead) => lead._id !== id)`) only after receiving HTTP `200` from `DELETE /api/leads/:id`.

### Friction Point or Bug Encountered
- Strict scope rules confined styling changes to `AdminDashboard.css` and `App.jsx` without modifying `App.css`. Because `App.jsx` statically imports `AdminDashboard.jsx` (which imports `AdminDashboard.css`), housing the `.view-switcher` and `.tab-btn` styles inside `AdminDashboard.css` ensured the navigation toggle remained styled across both active views while respecting the file scope constraint.
