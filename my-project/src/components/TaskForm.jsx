import { useState } from "react";
import axios from "../api/axios";

export default function TaskForm({ refresh }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("/tasks", {
      title,
      description,
      dueDate,
      priority
    });

    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("Low");

    refresh();
  };

  return (
    <form className="bg-white p-4 rounded shadow mb-6" onSubmit={handleSubmit}>
      <h2 className="font-bold mb-3">Create Task</h2>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="date"
        className="border p-2 w-full mb-2"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <select
        className="border p-2 w-full mb-3"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </form>
  );
}
