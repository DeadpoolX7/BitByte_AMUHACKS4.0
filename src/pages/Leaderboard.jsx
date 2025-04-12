import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../libs/firebase';
import { doc, getDoc } from 'firebase/firestore';

const mockData = [
  { name: "Ayaan", points: 1980 },
  { name: "Neha", points: 1725 },
  { name: "Kabir", points: 1590 },
  { name: "Zoya", points: 1430 },
  { name: "Ravi", points: 1320 },
];

export default function Leaderboard() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData({
            name: userSnap.data().name,
            points: userSnap.data().totalPoints
          });
        }
      }
    };

    fetchUserData();
  }, [user]);

  // Combine mock data with user data and sort
  const leaderboardData = [...mockData];
  if (userData) {
    leaderboardData.push(userData);
    leaderboardData.sort((a, b) => b.points - a.points);
  }

  return (
    <div className="min-h-screen w-full p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">🏆 Leaderboard</h1>
        <div className="w-full bg-base-100 rounded-lg shadow-xl">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Eco Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((user, index) => (
                <tr 
                  key={user.name}
                  className={userData && user.name === userData.name ? 'bg-green-100' : ''}
                >
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
