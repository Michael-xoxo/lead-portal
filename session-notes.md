# Session Notes

## Task 1.1 - Backend Foundation & Lead Schema

### Architectural Decision Made
- Configured Mongoose connection in `server.js` to asynchronously establish connection to MongoDB Atlas and attach event listeners (`connected`, `error`, `disconnected`) before initiating `app.listen`, ensuring the service does not accept incoming HTTP traffic until the persistence layer is verified. Additionally, implemented resilient URI resolution (`process.env.MONGO_URI || process.env.MONGODB_URI`) to support standard environment naming conventions seamlessly.

### Friction Point or Bug Encountered
- The Atlas onboarding configuration populated `.env` with `MONGODB_URI` instead of `MONGO_URI`, causing the initial server bootstrap to halt due to an undefined connection string. Resolving `mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI` resolved the discrepancy without requiring manual modification of the user's generated environment file.
