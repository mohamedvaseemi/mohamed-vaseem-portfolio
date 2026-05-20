"use client";

import { useState, useEffect } from "react";
import HTTPWrapper from "../../utils/HTTPWrapper";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Popup from "../components/Popup";

interface DecodedToken {
  authorised?: boolean;
  username?: string;
}

export default function RegisterPage() {
  const router = useRouter();

  // Form states
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Page visibility control
  const [pageLoading, setPageLoading] = useState(true);

  const [popup, setPopup] = useState("");

  const showPopup = (msg: string) => setPopup(msg);
  const closePopup = () => setPopup("");

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.replace("/authorisedSection/login");
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);

      // ❌ INVALID TOKEN DATA
      if (!decoded?.authorised || !decoded?.username) {
        router.replace("/authorisedSection/login");
        return;
      }

      // ✅ AUTH OK
      setPageLoading(false);
    } catch (error) {
      // ❌ DECODE FAILED
      router.replace("/authorisedSection/login");
    }
  }, [router]);

  if (pageLoading) return <div className="text-white"></div>;


  const handleRegister = async () => {
    if (!organization.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setMessage("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await HTTPWrapper.post("/auth/register", {
        organization,
        email,
        password,
      });

      if (response?.status) {
        showPopup("✅ Registered successfully!");
        setMessage("✅ Registered successfully!");

        if (response?.token) {
          Cookies.set("token", response.token, {
            expires: 7,
            secure: true,
            sameSite: "strict",
          });
        }

        router.push("/authorisedSection/authorisedDashboard");

        setOrganization("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        showPopup(`Registration failed : ${response.message}`);
        setMessage(response.message || "Registration failed!");
      }
    } catch (error: unknown) {
      showPopup(`Registration failed : ${(error as Error).message}`);
      setMessage("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#020617] text-[#f0f4ff] selection:bg-[#14a800]/30 px-6">
      {popup && <Popup message={popup} onClose={closePopup} />}
      <div className="bg-gray-800/70 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>

        <input
          type="text"
          placeholder="Organization"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          className="w-full p-3 mb-4 rounded-md bg-gray-900 border border-gray-600 outline-none focus:ring-2 focus:ring-cyan-500"
        />

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
          className="w-full p-3 mb-4 rounded-md bg-gray-900 border border-gray-600 outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded-md bg-gray-900 border border-gray-600 outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-cyan-600 hover:bg-cyan-500 py-3 rounded-lg text-white font-semibold transition-all disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {message && (
          <p className="text-center mt-4 text-gray-300">{message}</p>
        )}
      </div>
    </main>
  );
}