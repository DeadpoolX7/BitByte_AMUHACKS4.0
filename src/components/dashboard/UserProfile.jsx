import { useAuth } from '../../context/AuthContext';
import { LogOut } from 'lucide-react';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      navigate('/signin');
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-sm rounded-lg shadow-sm">
      <div className="flex items-center gap-3">
        <img 
          src={user?.photoURL} 
          alt={user?.displayName}
          className="w-10 h-10 rounded-full border-2 border-green-500"
        />
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{user?.displayName}</span>
          <span className="text-sm text-gray-500">{user?.email}</span>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
        title="Logout"
      >
        <LogOut size={20} />
      </button>
    </div>
  );
}