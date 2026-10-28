import os

from dotenv import load_dotenv
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict
from sqlalchemy import create_engine, String, Boolean
from sqlalchemy.orm import (
    DeclarativeBase,
    Mapped,
    Session,
    mapped_column,
    sessionmaker,
)

app = FastAPI(title="Todo API")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://todo-application-sable-nine.vercel.app/",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Read database configuration from .env
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is missing from .env")

# Connect to PostgreSQL
engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
)


# Define the database table structure
class Base(DeclarativeBase):
    pass


class Todo(Base):
    __tablename__ = "todos"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    completed: Mapped[bool] = mapped_column(
        Boolean, default=False, nullable=False
    )


# Create the table if it doesn't exist
Base.metadata.create_all(bind=engine)


# Request and response schemas
class TodoCreate(BaseModel):
    title: str


class TodoResponse(BaseModel):
    id: int
    title: str
    completed: bool

    model_config = ConfigDict(from_attributes=True)





# Provide a database session for each request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def home():
    return {"message": "Todo API with PostgreSQL is running"}


@app.get("/todos", response_model=list[TodoResponse])
def get_todos(db: Session = Depends(get_db)):
    return db.query(Todo).order_by(Todo.id).all()


@app.post("/todos", response_model=TodoResponse, status_code=201)
def create_todo(todo: TodoCreate, db: Session = Depends(get_db)):
    title = todo.title.strip()

    if not title:
        raise HTTPException(
            status_code=400,
            detail="Task title cannot be empty",
        )

    new_todo = Todo(title=title, completed=False)

    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)

    return new_todo


@app.put("/todos/{todo_id}", response_model=TodoResponse)
def toggle_todo(todo_id: int, db: Session = Depends(get_db)):
    todo = db.get(Todo, todo_id)

    if todo is None:
        raise HTTPException(
            status_code=404,
            detail="Todo not found",
        )

    todo.completed = not todo.completed

    db.commit()
    db.refresh(todo)

    return todo


@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    todo = db.get(Todo, todo_id)

    if todo is None:
        raise HTTPException(
            status_code=404,
            detail="Todo not found",
        )

    db.delete(todo)
    db.commit()

    return {"message": "Todo deleted successfully"}
