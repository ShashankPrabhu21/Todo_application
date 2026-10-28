import { useEffect, useState } from "react";
import "./App.css";

const API_URL =   import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchTodos() {
    try {
      setError("");
      const response = await fetch(`${API_URL}/todos`);

      if (!response.ok) {
        throw new Error("Could not fetch tasks");
      }

      setTodos(await response.json());
    } catch {
      setError("Cannot connect to FastAPI. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  async function addTodo(e) {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      setError("");

      const response = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error("Could not add task");
      }

      const newTodo = await response.json();
      setTodos((current) => [...current, newTodo]);
      setTitle("");
    } catch {
      setError("Failed to add task. Please try again.");
    }
  }

  async function toggleTodo(id) {
    try {
      setError("");

      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error("Could not update task");
      }

      const updatedTodo = await response.json();

      setTodos((current) =>
        current.map((todo) =>
          todo.id === id ? updatedTodo : todo
        )
      );
    } catch {
      setError("Failed to update task.");
    }
  }

  async function deleteTodo(id) {
    try {
      setError("");

      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Could not delete task");
      }

      setTodos((current) =>
        current.filter((todo) => todo.id !== id)
      );
    } catch {
      setError("Failed to delete task.");
    }
  }

  const completedCount = todos.filter(
    (todo) => todo.completed
  ).length;

  return (
    <main className="app">
      <section className="todo-card">
        <h1 className="h1">My Todo List</h1>
        <p className="subtitle">
          Stay organized, one task at a time.
        </p>

        <form onSubmit={addTodo} className="todo-form">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What do you need to do?"
            aria-label="New task"
          />
          <button type="submit">Add</button>
        </form>

        {error && <p className="error">{error}</p>}

        <div className="summary">
          {todos.length} tasks · {completedCount} completed
        </div>

        {loading ? (
          <p>Loading tasks...</p>
        ) : todos.length === 0 ? (
          <p className="empty">No tasks yet. Add your first task!</p>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id} className="todo-item">
                <label className="task-label">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span className={todo.completed ? "done" : ""}>
                    {todo.title}
                  </span>
                </label>

                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(todo.id)}
                  aria-label={`Delete ${todo.title}`}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
