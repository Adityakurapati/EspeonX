"use client";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { Zap, Gamepad, Trophy, Users, LogOut } from "lucide-react";

const Sidebar = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);

      // Clear session storage, local storage, and cookies
      sessionStorage.clear();
      localStorage.clear();
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      // Redirect to login page
      router.push("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 p-5 flex flex-col justify-between shadow-lg">
      <div>
        <h1 className="text-white text-2xl font-bold mb-6">Poke Fon</h1>
        <ul className="space-y-4">
          <li
            onClick={() => navigateTo("/tournament_dashboard")}
            className="text-white flex items-center gap-3 cursor-pointer hover:text-gray-300"
          >
            <Zap size={20} />
            DashBoard
          </li>
          <li
            onClick={() => navigateTo("/home")}
            className="text-white flex items-center gap-3 cursor-pointer hover:text-gray-300"
          >
            <Zap size={20} />
            Trading
          </li>
          <li
            onClick={() => navigateTo("/tournaments")}
            className="text-white flex items-center gap-3 cursor-pointer hover:text-gray-300"
          >
            <Gamepad size={20} />
            Tournaments
          </li>
          <li
            onClick={() => navigateTo("/voting")}
            className="text-white flex items-center gap-3 cursor-pointer hover:text-gray-300"
          >
            <Trophy size={20} />
            Voting
          </li>
          <li
            onClick={() => navigateTo("/reward_automate")}
            className="text-white flex items-center gap-3 cursor-pointer hover:text-gray-300"
          >
            <Users size={20} />
            Reward Automate
          </li>
        </ul>
      </div>
      <button
        onClick={handleSignOut}
        className="text-white flex items-center gap-3 cursor-pointer hover:text-red-400"
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
