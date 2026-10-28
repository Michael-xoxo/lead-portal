# SPEC: Task 1.4 - Interactive Lead Capture Form

## GOAL
Build a responsive, accessible lead qualification form component in React that captures prospective client details, submits them to `POST /api/leads`, and handles loading/error/success states cleanly.

## ACCEPTANCE CRITERIA
1. Create `client/src/components/LeadForm.jsx` and render it inside `client/src/App.jsx`.
2. Form contains controlled inputs for:
   - Full Name (text input, required)
   - Email Address (email input, required)
   - Project Type (select dropdown: "Web Application", "Landing Page", "API Integration", "Other", required)
   - Estimated Budget (number input, optional)
3. Form submission (`onSubmit`) sends a `POST` request to `/api/leads` with JSON payload.
4. Loading state handling:
   - Submit button is disabled and displays "Submitting..." while request is in flight.
5. Success state handling:
   - On HTTP 201 response, form inputs reset to initial values and a success alert displays "Inquiry received! We will be in touch shortly."
6. Error state handling:
   - On HTTP 400 or network failure, displays the error message returned from the backend in an error banner without wiping input fields.
7. Include clean, responsive layout styles in `client/src/components/LeadForm.css` (or `App.css`).

## CONSTRAINTS
- Strict frontend boundary: Confine code to `client/src/components/` and `client/src/App.jsx`.
- Zero changes to backend files (`server.js`, `controllers/`, `routes/`, `models/`).
- Use pure React standard hooks (`useState`); no external form libraries (Formik, React Hook Form) or CSS frameworks yet.

## STOPPING CONDITIONS
- Stop if backend API routes fail to accept valid form submissions.
- Stop if any external UI dependencies are demanded.

## BLAST RADIUS
LOW (Adding isolated frontend components within `/client`).

## VERIFICATION STEPS
1. Verify `npm run build` inside `/client` compiles with zero errors.
2. In the browser (or via headless script):
   - Submit an invalid empty form -> verify client/server validation stops submission and displays error.
   - Submit a valid form with name, email, project type, and budget -> verify success message renders and fields clear.
3. Query `curl http://localhost:5000/api/leads` -> confirm the new lead document exists in MongoDB Atlas with status "new".