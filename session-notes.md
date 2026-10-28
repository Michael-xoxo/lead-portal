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
