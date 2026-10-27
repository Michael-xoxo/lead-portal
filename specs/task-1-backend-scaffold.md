# SPEC: Task 1.1 - Backend Foundation & Lead Schema

## GOAL
Set up a clean Express server that connects to MongoDB and defines the Mongoose schema for incoming leads.

## ACCEPTANCE CRITERIA
1. Server listens on port 5000 and responds with status 200 to GET /health.
2. Mongoose connects successfully to MongoDB Atlas using process.env.MONGO_URI.
3. Lead model created in `models/Lead.js` with fields:
   - name: String, required
   - email: String, required
   - projectType: String, required
   - budget: Number, optional
   - status: String, enum: ['new', 'contacted', 'closed'], default: 'new'
   - timestamps: true
4. `package.json` contains a `dev` script using `nodemon server.js`.
5. `.gitignore` exists and excludes `node_modules` and `.env`.

## CONSTRAINTS
- No frontend files.
- No extra dependencies without approval.
- Do not commit `.env`.

## STOPPING CONDITIONS
- Stop if MongoDB connection fails.
- Stop if more than 4 code files need to be created (`server.js`, `models/Lead.js`, `.gitignore`, `.env.example`).

## VERIFICATION STEPS
1. Run `npm run dev`.
2. Access `GET http://localhost:5000/health` and verify `{"status": "ok"}`.
3. Terminal displays successful database connection log.