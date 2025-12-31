import { useEffect, useState } from "react";
import axios from "../api/axios";
import TaskForm from "../components/TaskForm";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const color = {
    Low: "bg-green-100",
    Medium: "bg-yellow-100",
    High: "bg-red-100"
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

      {/* CREATE TASK */}
      <TaskForm refresh={fetchTasks} />

      {/* TASK LIST */}
      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className={`p-4 rounded shadow ${color[task.priority]}`}
            >
              <h2 className="font-bold">{task.title}</h2>
              <p>{task.description}</p>
              <p className="text-sm">Status: {task.status}</p>

              <button
                onClick={async () => {
                  await axios.put(`/tasks/${task._id}`, {
                    status:
                      task.status === "Pending"
                        ? "Completed"
                        : "Pending"
                  });
                  fetchTasks();
                }}
                className="text-blue-600 text-sm mt-2 block"
              >
                Mark as{" "}
                {task.status === "Pending"
                  ? "Completed"
                  : "Pending"}
              </button>

              <button
                onClick={async () => {
                  if (window.confirm("Delete task?")) {
                    await axios.delete(`/tasks/${task._id}`);
                    fetchTasks();
                  }
                }}
                className="text-red-600 text-sm mt-1"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
