"use client";
import { useState } from "react";
import HTTPWrapper from "../../utils/HTTPWrapper";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Popup from "../components/Popup";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const [popup, setPopup] = useState("");

  const showPopup = (msg: string) => setPopup(msg);
  const closePopup = () => setPopup("");

  const handleRegister = async () => {
    if (!email.trim() || !password.trim()) {
      showPopup("Please enter both email and password.");
      setMessage("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await HTTPWrapper.post("/auth/login", {
        email,
        password,
      });
      if (response?.status) {
        showPopup("✅ Login successfully!");
        setMessage("✅ Login successfully!");
        if (response?.token) {
          Cookies.set("token", response?.token, {
            expires: 7,
            secure: true,
            sameSite: "strict",
          });
        }
        router.push('/authorisedSection/authorisedDashboard');
        setEmail("");
        setPassword("");
      } else {
        showPopup(`Login failed : ${response.data?.message}`);
        setMessage(response.data?.message || "Login failed!");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        showPopup(`Login failed : ${error.message}`);
        setMessage(error.message || "Something went wrong!");
      } else {
        showPopup("Login failed for unknown reason");
        setMessage("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white px-6">
      {popup && <Popup message={popup} onClose={closePopup} />}
      <div className="bg-gray-800/70 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-md bg-gray-900 border border-gray-600 outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded-md bg-gray-900 border border-gray-600 outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-cyan-600 hover:bg-cyan-500 py-3 rounded-lg text-white font-semibold transition-all disabled:opacity-50"
        >
          {loading ? "Logging..." : "Login"}
        </button>

        {message && (
          <p className="text-center mt-4 text-gray-300">{message}</p>
        )}
      </div>
    </main>
  );
}
