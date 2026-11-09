# Garbage Management MERN

## Requirements

- Node.js 18 or newer
- MongoDB running locally, or a MongoDB connection string

## Configure

In `backend`, copy `.env.example` to `.env` and set `CONNECTION_STRING` and `secret` for your environment. Keep the secret private. `API_URL` should remain `/api/v1` unless you also change the client API paths.

For initial administrator setup, temporarily set `ALLOW_ADMIN_REGISTRATION=true`, start the backend, and create one administrator with `POST http://localhost:4000/api/v1/admin` using `{ "email": "admin@example.com", "password": "a-strong-password" }`. Set the flag back to `false` afterward.

## Install and run

Open two terminals in the project directory:

```powershell
cd backend
npm install
npm run dev
```

```powershell
cd client
npm install
npm run dev
```

Open the Vite URL printed in the client terminal (usually `http://localhost:5173`). The Vite dev server forwards `/api` requests to the backend on port 4000.

The `db` folder contains sample MongoDB JSON exports. The current app uses the `smart-waste-management` database. The bundled demo account credentials are:

- Admin: `admin@gmail.com` / `test`
- User: `user@gmail.com` / `Test@100`
- Driver: `driver@gmail.com` / `Test@100`

Import the sample records only into an empty database; importing them may conflict with existing records.
