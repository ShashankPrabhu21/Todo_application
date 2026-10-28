# FastAPI React Todo App

A full-stack Todo List application built with React, FastAPI, and PostgreSQL. Users can create tasks, mark tasks as completed, and delete tasks.

## Tech Stack

- **Frontend:** React, Vite, JavaScript, CSS
- **Backend:** Python, FastAPI
- **Database:** PostgreSQL
- **ORM:** SQLAlchemy
- **Database Driver:** Psycopg
- **Version Control:** Git and GitHub

## Features

- Add new tasks
- View all saved tasks
- Mark tasks as completed
- Delete tasks
- Store tasks in PostgreSQL
- REST API built with FastAPI

## Project Structure

```text
FastApi-Project/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   ├── package.json
│   └── index.html
├── .gitignore
└── README.md
```

## Run Locally

### Prerequisites

- Python 3.10 or a compatible version
- Node.js and npm
- PostgreSQL

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Todo_application
```

Replace the repository URL with your actual GitHub URL.

### 2. Set up the backend

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment on Windows:

```powershell
.venv\Scripts\Activate.ps1
or
.venv/scripts/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file in the backend folder and configure your PostgreSQL connection:

```env
DATABASE_URL=your_postgresql_connection_string
```

Create the `todo_db` database in PostgreSQL if it does not already exist.

Start the API:

```bash
python -m uvicorn main:app --reload
```

API: http://127.0.0.1:8000

API documentation: http://127.0.0.1:8000/docs

### 3. Set up the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, usually http://localhost:5173.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/todos` | Get all tasks |
| POST | `/todos` | Create a task |
| PUT | `/todos/{todo_id}` | Toggle task completion |
| DELETE | `/todos/{todo_id}` | Delete a task |

## Deployment

Deployment instructions and live demo links will be added after the application is deployed.

## Author

Shashank Prabhu

shashankprabhus@gmail.com