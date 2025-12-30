import { useEffect, useState } from "react";
import axios from "../api/axios";

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

      <div className="grid grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className={`p-4 rounded shadow ${color[task.priority]}`}
          >
            <h2 className="font-bold">{task.title}</h2>
            <p>{task.description}</p>
            <p className="text-sm">{task.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
