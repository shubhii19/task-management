// import { useEffect, useState } from "react";
// import axios from "../api/axios";
// import TaskForm from "../components/TaskForm";

// export default function Dashboard() {
//   const [tasks, setTasks] = useState([]);

//   const fetchTasks = async () => {
//     const res = await axios.get("/tasks");
//     setTasks(res.data);
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const color = {
//     Low: "bg-green-100",
//     Medium: "bg-yellow-100",
//     High: "bg-red-100"
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

//       {/* CREATE TASK */}
//       <TaskForm refresh={fetchTasks} />

//       {/* TASK LIST */}
//       {tasks.length === 0 ? (
//         <p>No tasks yet</p>
//       ) : (
//         <div className="grid grid-cols-3 gap-4">
//           {tasks.map((task) => (
//             <div
//               key={task._id}
//               className={`p-4 rounded shadow ${color[task.priority]}`}
//             >
//               <h2 className="font-bold">{task.title}</h2>
//               <p>{task.description}</p>
//               <p className="text-sm">Status: {task.status}</p>

//               <button
//                 onClick={async () => {
//                   await axios.put(`/tasks/${task._id}`, {
//                     status:
//                       task.status === "Pending"
//                         ? "Completed"
//                         : "Pending"
//                   });
//                   fetchTasks();
//                 }}
//                 className="text-blue-600 text-sm mt-2 block"
//               >
//                 Mark as{" "}
//                 {task.status === "Pending"
//                   ? "Completed"
//                   : "Pending"}
//               </button>

//               <button
//                 onClick={async () => {
//                   if (window.confirm("Delete task?")) {
//                     await axios.delete(`/tasks/${task._id}`);
//                     fetchTasks();
//                   }
//                 }}
//                 className="text-red-600 text-sm mt-1"
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }









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

  const priorities = ["Low", "Medium", "High"];

  const colors = {
    Low: "bg-green-100 border-green-400",
    Medium: "bg-yellow-100 border-yellow-400",
    High: "bg-red-100 border-red-400"
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Task Management Dashboard
      </h1>

      {/* CREATE TASK */}
      <div className="max-w-xl mx-auto mb-8">
        <TaskForm refresh={fetchTasks} />
      </div>

      {/* PRIORITY COLUMNS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {priorities.map((priority) => (
          <div
            key={priority}
            className={`border rounded-lg p-4 ${colors[priority]}`}
          >
            <h2 className="text-lg font-semibold mb-4 text-center">
              {priority} Priority
            </h2>

            {tasks.filter((t) => t.priority === priority).length === 0 ? (
              <p className="text-sm text-center text-gray-500">
                No tasks
              </p>
            ) : (
              tasks
                .filter((t) => t.priority === priority)
                .map((task) => (
                  <div
                    key={task._id}
                    className="bg-white p-3 rounded shadow mb-3"
                  >
                    <h3 className="font-semibold">{task.title}</h3>
                    <p className="text-sm text-gray-600">
                      {task.description}
                    </p>

                    <p className="text-xs mt-1">
                      Status:{" "}
                      <span
                        className={
                          task.status === "Completed"
                            ? "text-green-600"
                            : "text-gray-700"
                        }
                      >
                        {task.status}
                      </span>
                    </p>

                    {/* STATUS TOGGLE */}
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
                      className="text-blue-600 text-xs mt-2 block"
                    >
                      Mark as{" "}
                      {task.status === "Pending"
                        ? "Completed"
                        : "Pending"}
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={async () => {
                        if (window.confirm("Delete this task?")) {
                          await axios.delete(`/tasks/${task._id}`);
                          fetchTasks();
                        }
                      }}
                      className="text-red-500 text-xs mt-1"
                    >
                      Delete
                    </button>
                  </div>
                ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
