// LogoutButton.jsx
import { getAuth, signOut } from "firebase/auth";
// import { useAuth } from '../../context/AuthContext';

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      console.log("User logged out");
      // optional: redirect to login page
      window.location.href = "/";
    } catch (err) {
      console.error("Logout error:", err.message);
      alert("Something went wrong during logout.");
    }
  };

  return (
    <>
      <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md mt-4"
    >
      Logout
    </button>
    </>
    
  );
}
