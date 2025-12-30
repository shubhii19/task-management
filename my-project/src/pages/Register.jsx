import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    await axios.post("/auth/register", { name, email, password });
    navigate("/");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input
          placeholder="Name"
          className="border p-2 w-full mb-3"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-green-500 text-white w-full p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
