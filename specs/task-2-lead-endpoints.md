# SPEC: Task 1.2 - Lead Ingestion & Retrieval API Routes

## GOAL
Implement RESTful API endpoints for creating, fetching, and deleting leads following the MVC controller-router pattern.

## ACCEPTANCE CRITERIA
1. `POST /api/leads` accepts `{ name, email, projectType, budget }`, saves to MongoDB via `Lead` model, and returns status 201 with the created lead object.
2. `POST /api/leads` rejects missing required fields with status 400 and an error message.
3. `GET /api/leads` returns status 200 with an array of all leads, sorted by `createdAt` descending (newest first).
4. `DELETE /api/leads/:id` removes the document by ID and returns status 200 with confirmation `{ message: "Lead deleted successfully" }`. Returns 404 if ID is not found.
5. All route logic is encapsulated in `controllers/leadController.js` and exported to `routes/leadRoutes.js`.
6. `server.js` mounts the router at `/api/leads`.

## CONSTRAINTS
- Strict file scope: Create only `controllers/leadController.js` and `routes/leadRoutes.js`. Modify only `server.js` to mount the router.
- No frontend code.
- No third-party validation libraries (rely on Mongoose schema errors and standard conditional checks).

## STOPPING CONDITIONS
- Stop if an unhandled promise rejection crashes the Node process during verification.
- Stop if changes are required outside `controllers/`, `routes/`, or `server.js`.

## BLAST RADIUS
MEDIUM (Modifying `server.js` pipeline and reading/writing live database collections).

## VERIFICATION STEPS
1. Send a POST request via curl with valid lead JSON -> verify HTTP 201 and returned document ID.
2. Send a POST request via curl with invalid data (missing email) -> verify HTTP 400.
3. Send a GET request via curl -> verify HTTP 200 and lead array containing the document.
4. Send a DELETE request via curl -> verify HTTP 200 and subsequent GET returns an empty list.