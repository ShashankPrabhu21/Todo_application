# Todo Application

A full-stack Todo List application built with **React**, **Vite**,
**FastAPI**, **SQLAlchemy**, and **PostgreSQL**. Users can create tasks,
view saved tasks, mark tasks as completed, and delete tasks.

## Live Demo

-   **Frontend:** https://todo-application-sable-nine.vercel.app/
-   **Backend API:** https://fastapi-todo-api-c2j7.onrender.com
-   **API documentation (Swagger):**
    https://fastapi-todo-api-c2j7.onrender.com/docs

> The backend is hosted on Render and the PostgreSQL database is hosted
> on Neon. On a free hosting plan, the backend may take a little time to
> respond after inactivity.

## Features

-   Create a Todo task
-   View tasks saved in the database
-   Mark a task as completed or incomplete
-   Delete a task
-   Persistent PostgreSQL storage
-   React frontend connected to a FastAPI REST API
-   Cloud deployment using Vercel, Render, and Neon

## Tech Stack

**Frontend:** React, Vite, JavaScript, CSS\
**Backend:** Python, FastAPI, SQLAlchemy, Psycopg, Uvicorn\
**Database:** PostgreSQL on Neon\
**Deployment:** Vercel (frontend), Render (backend)\
**Version control:** Git and GitHub

## Project Structure

``` text
Todo_application/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── App.css
│   ├── package.json
│   └── ...
├── .gitignore
└── README.md
```

Your project may contain additional files depending on your local setup.

## API Endpoints

  -----------------------------------------------------------------------
  Method                  Endpoint                Description
  ----------------------- ----------------------- -----------------------
  `GET`                   `/todos`                Retrieve all Todo tasks

  `POST`                  `/todos`                Create a Todo task

  `PUT`                   `/todos/{todo_id}`      Toggle/update a task's
                                                  completion status

  `DELETE`                `/todos/{todo_id}`      Delete a Todo task
  -----------------------------------------------------------------------

Interactive API documentation: [Swagger
UI](https://fastapi-todo-api-c2j7.onrender.com/docs).

### Example: Create a Todo

Send a `POST` request to `/todos` with this JSON body:

``` json
{
  "title": "Complete my project"
}
```

## Run the Project Locally

### Prerequisites

-   Python 3.10 or later
-   Node.js and npm
-   PostgreSQL, either locally or through Neon

### 1. Clone the repository

``` bash
git clone https://github.com/ShashankPrabhu21/Todo_application.git
cd Todo_application
```

### 2. Set up the backend

Create and activate a virtual environment from the project root.

**Windows (PowerShell):**

``` powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Install backend dependencies:

``` powershell
cd backend
pip install -r requirements.txt
```

Create a `.env` file inside `backend/`:

``` env
DATABASE_URL=postgresql+psycopg://USER:PASSWORD@HOST/DATABASE
```

Replace the placeholders with your own PostgreSQL connection details.
Use the connection string format expected by your application.

**Never commit your `.env` file or publish database credentials.**

Start FastAPI from the `backend/` directory:

``` powershell
uvicorn main:app --reload
```

The API should be available at `http://127.0.0.1:8000`. Open
`http://127.0.0.1:8000/docs` to explore the API.

The backend must be able to connect to a working PostgreSQL database. If
SQLAlchemy creates tables during startup, configure the database
connection before starting the server.

### 3. Set up the frontend

Open a new terminal at the project root:

``` powershell
cd frontend
npm install
```

Create a `.env` file inside `frontend/`:

``` env
VITE_API_URL=http://127.0.0.1:8000
```

Start Vite:

``` powershell
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Environment Variables

  Variable         Used by    Purpose
  ---------------- ---------- ---------------------------------
  `DATABASE_URL`   Backend    PostgreSQL connection string
  `VITE_API_URL`   Frontend   Base URL of the FastAPI backend

For the deployed frontend, `VITE_API_URL` should be:

``` text
https://fastapi-todo-api-c2j7.onrender.com
```

Do not append `/todos` to the base URL because the frontend adds
endpoint paths itself. Variables prefixed with `VITE_` are exposed to
browser code, so **never put passwords, database URLs, or private API
keys in `VITE_` variables**.

Configure `DATABASE_URL` as a backend environment variable in Render and
keep the Neon connection string private.

## Deployment Overview

1.  **Database --- Neon:** Create a PostgreSQL database and obtain its
    connection string.

2.  **Backend --- Render:** Connect the GitHub repository, set the root
    directory to `backend`, use `pip install -r requirements.txt` as the
    build command, and use the following start command:

    ``` bash
    uvicorn main:app --host 0.0.0.0 --port $PORT
    ```

    Add `DATABASE_URL` to the Render environment variables.

3.  **Frontend --- Vercel:** Import the GitHub repository and configure
    the project/root directory as `frontend`. Add `VITE_API_URL` with
    the Render backend base URL, then deploy or redeploy.

4.  **CORS:** Ensure the backend allows the exact deployed frontend
    origin. Match the protocol and hostname, and do not add a trailing
    slash to the origin.

## Troubleshooting

-   **Frontend says it cannot connect to FastAPI:** Check `VITE_API_URL`
    in Vercel, redeploy after changing it, and inspect the browser
    console and Render runtime logs.
-   **`GET //todos` returns 404:** Remove trailing slashes from the API
    base URL before appending `/todos`.
-   **CORS or `OPTIONS` errors:** Add the exact Vercel frontend origin
    to the backend CORS allowlist and redeploy the backend.
-   **Database connection or SSL errors:** Verify `DATABASE_URL`, Neon
    availability, and Render runtime logs. Never share the full
    connection string publicly.
-   **First request is slow:** A free Render service may need to wake
    after inactivity.

## Security Notes

-   Keep `.env` files out of Git.
-   Commit a `.env.example` file with placeholders only, never real
    credentials.
-   Store `DATABASE_URL` in Render's environment settings.
-   Expose only non-sensitive frontend configuration through `VITE_`
    variables.
-   Restrict CORS to the frontend origins you intend to allow.

## Author

**Shashank Prabhu**

-   GitHub: [ShashankPrabhu21](https://github.com/ShashankPrabhu21)
-   Repository:
    [Todo_application](https://github.com/ShashankPrabhu21/Todo_application)
