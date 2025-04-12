// src/components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const links = [
  { name: "Dashboard", to: "/dashboard" },
  { name: "Activities", to: "/activities" },
  { name: "Leaderboard", to: "/leaderboard" },
  { name: "Rewards", to: "/rewards" },
];

export default function Sidebar() {
  const location = useLocation();

  /* const handleLogout = () => {
    // TODO: Integrate with Firebase later
    console.log("Logging out...");
    localStorage.removeItem("ecoUser");
    window.location.href = "/"; // Redirect to home/login
  }; */

  return (
    <div className="flex flex-col h-full ">
      <ul className="menu p-4 w-64 bg-green-800 text-base-content flex-grow">
        <h2 className="text-xl font-bold mb-4">🌿 EcoRewards</h2>
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={`flex items-center gap-3  text-xl px-3 py-2 my-2 rounded-md transition hover:bg-white hover:text-black ${
                location.pathname === link.to ? "bg-white text-black" : ""
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout Button */}
      <div className="p-4 w-64 bg-green-700 border-t">
        <LogoutButton />
      </div>
    </div>
  );
}
