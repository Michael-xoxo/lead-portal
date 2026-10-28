# SPEC: Task 1.5 - Admin Dashboard & Lead Management

## GOAL
Build an administrative dashboard component in React that fetches all captured leads from `GET /api/leads`, displays them in a clean data table/list with status badges, and supports instant deletion via `DELETE /api/leads/:id`.

## ACCEPTANCE CRITERIA
1. Create `client/src/components/AdminDashboard.jsx` and its companion styles `AdminDashboard.css`.
2. Add a simple navigation toggle in `client/src/App.jsx` to switch views between "Client Form" and "Admin Dashboard" using local state (`activeTab`).
3. `AdminDashboard.jsx` fetches leads from `GET /api/leads` on mount:
   - Displays "Loading leads..." during fetch.
   - Displays "No inquiries yet." if the returned array is empty.
   - Displays an error alert if the network call fails.
4. Render leads in a responsive table/grid displaying:
   - Name
   - Email
   - Project Type
   - Budget (formatted with currency symbol or "N/A" if omitted)
   - Date submitted (readable format)
   - Status badge (e.g., green/neutral badge for "new")
5. Implement Delete Lead functionality:
   - Each row has a "Delete" button.
   - Clicking sends `DELETE /api/leads/:id`.
   - On HTTP 200, updates local React state immediately to remove the lead from the DOM.
   - If deletion fails, displays an inline error without altering the list.

## CONSTRAINTS
- Strict client-side boundary: Confine changes to `client/src/components/AdminDashboard.jsx`, `client/src/components/AdminDashboard.css`, and `client/src/App.jsx`.
- Zero changes to backend files (`server.js`, `controllers/`, `routes/`, `models/`).
- Do not install `react-router-dom` or heavy UI libraries (use standard React state and semantic HTML/CSS).

## STOPPING CONDITIONS
- Stop if backend `GET` or `DELETE` endpoints return unexpected payload structures.
- Stop if third-party UI dependencies are demanded.

## BLAST RADIUS
LOW (Adding isolated admin component within `/client`).

## VERIFICATION STEPS
1. Verify `npm run lint` and `npm run build` succeed in `/client`.
2. Open `http://localhost:5173`, switch to the "Admin Dashboard" tab:
   - Confirm Alice Smith's lead (created in Task 1.4) appears with correct details.
3. Click "Delete" on that lead:
   - Confirm the lead row disappears immediately from the UI.
4. Run `curl http://localhost:5000/api/leads` in terminal -> confirm the database collection is empty `[]`.