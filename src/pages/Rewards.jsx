// src/pages/Rewards.jsx
import { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';

const rewards = [
  {
    id: 1,
    name: "Eco-Friendly Water Bottle",
    description: "800ml stainless steel insulated bottle",
    cost: 500,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=300",
    category: "Essential"
  },
  {
    id: 2,
    name: "Plantable Notebook",
    description: "100% recycled paper with seed pages",
    cost: 350,
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=300",
    category: "Stationery"
  },
  {
    id: 3,
    name: "Eco Gift Card",
    description: "Redeem at eco-friendly stores",
    cost: 1000,
    image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&q=80&w=300",
    category: "Gift Card"
  },
  {
    id: 4,
    name: "Bamboo Utensil Set",
    description: "Portable cutlery set with case",
    cost: 450,
    image: "https://plus.unsplash.com/premium_photo-1736505437580-7d2dfc89994e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Essential"
  },
  {
    id: 5,
    name: "Solar Power Bank",
    description: "10000mAh eco-friendly charger",
    cost: 800,
    image: "https://plus.unsplash.com/premium_photo-1678865184075-b635d6eeec78?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Tech"
  },
  {
    id: 6,
    name: "Organic Cotton Tote",
    description: "Reusable shopping bag",
    cost: 250,
    image: "https://imgs.search.brave.com/a9-qwB9dOnRknBOMq0TguwPuTvSUKxA29SYjmQFN4YU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90b3Rl/YmFnZmFjdG9yeS5j/b20vY2RuL3Nob3Av/ZmlsZXMvbmF0dXJh/bC1jb3R0b24tdG90/ZS1iYWdfMTJkOTRm/YjMtYjhlYi00YTNk/LTgyNGItNmFkNTkw/OTBhYmMxLmpwZz92/PTE3Mzk5MjMyMjkm/d2lkdGg9NDYw",
    category: "Essential"
  }
];

export default function Rewards() {
  const [selectedReward, setSelectedReward] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleRedeem = (reward) => {
    setSelectedReward(reward);
    setShowConfirmation(true);
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">🎁 Rewards Shop</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((item) => (
            <div
              key={item.id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <figure className="px-4 pt-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded-xl h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="card-title">{item.name}</h2>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <span className="badge badge-accent">{item.category}</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-lg font-bold text-green-600">{item.cost} pts</p>
                  <button
                    onClick={() => handleRedeem(item)}
                    className="btn btn-primary btn-sm hover:scale-105 transition-transform"
                  >
                    Redeem Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Redemption Confirmation Modal */}
        {showConfirmation && selectedReward && (
          <div className="fixed inset-0 z-50 overflow-hidden" onClick={() => setShowConfirmation(false)}>
            <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />
            <div className="flex min-h-full items-center justify-center p-4">
              <div
                className="bg-base-100 max-w-md w-full p-6 rounded-xl shadow-xl relative animate-bounce-in"
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-center space-y-4">
                  <img
                    src={selectedReward.image}
                    alt={selectedReward.name}
                    className="w-32 h-32 object-cover rounded-lg mx-auto"
                  />
                  <h3 className="text-xl font-bold">{selectedReward.name}</h3>
                  <div className="flex items-center justify-center gap-2 text-amber-500">
                    <AlertCircle className="w-5 h-5" />
                    <p>Are you sure you want to redeem this reward?</p>
                  </div>
                  <p className="text-green-600 font-bold">{selectedReward.cost} points will be deducted</p>

                  <div className="flex gap-3 mt-6">
                    <button
                      className="btn btn-ghost flex-1"
                      onClick={() => setShowConfirmation(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary flex-1"
                      onClick={() => {
                        // Add redemption logic here
                        setShowConfirmation(false);
                      }}
                    >
                      Confirm Redemption
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="text-center mt-12 mb-8">
        <p className="text-lg text-gray-500 font-medium">
          ✨ More Eco-Friendly Rewards Coming Soon! 🌱
        </p>
      </div>
    </div>
  );
}
