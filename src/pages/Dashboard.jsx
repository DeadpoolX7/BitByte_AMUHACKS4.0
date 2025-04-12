// src/pages/Dashboard.jsx
import { Leaf, CalendarDays, BadgeCheck, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const { user } = useAuth();
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState("");

  const fetchEcoInsight = async () => {
    setAiLoading(true);
    setAiMessage("");

    try {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_REACT_GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `Give a short, friendly, and motivating message to someone trying to reduce carbon emissions through daily eco activities. Suggest a creative eco tip too. Format it nicely.`
                }
              ]
            }
          ]
        }
      );
      const reply = res.data.candidates[0]?.content?.parts[0]?.text;
      setAiMessage(reply);
    } catch (err) {
      console.error("Gemini AI Error:", err);
      setAiMessage("Sorry, couldn't fetch insights. Try again later 🌧️");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Welcome, {user?.displayName}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Impact */}
          <div className="card bg-base-100 shadow-xl border border-green-300 w-full">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <h2 className="card-title text-white">Total Impact</h2>
                <Leaf className="text-green-500 bg-green-100 p-1 rounded-full" />
              </div>
              <p className="text-4xl font-bold text-green-600">245 kg</p>
              <p className="text-sm text-gray-400">CO₂ saved this month</p>
              <p className="text-green-500 text-sm">+12% from last month</p>
            </div>
          </div>

          {/* Activities */}
          <div className="card bg-base-100 shadow-xl border border-blue-300 w-full">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <h2 className="card-title text-white">Activities</h2>
                <CalendarDays className="text-blue-500 bg-blue-100 p-1 rounded-full" />
              </div>
              <p className="text-3xl font-bold text-blue-600">23</p>
              <p className="text-sm text-gray-400">Activities this month</p>
              <p className="text-blue-500 text-sm">5-day streak</p>
            </div>
          </div>

          {/* Rewards */}
          <div className="card bg-base-100 shadow-xl border border-purple-300 w-full">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <h2 className="card-title text-white">Rewards</h2>
                <BadgeCheck className="text-purple-500 bg-purple-100 p-1 rounded-full" />
              </div>
              <p className="text-3xl font-bold text-purple-600">1250 Points</p>
              <p className="text-sm text-gray-400">Redeem for eco-gifts</p>
            </div>
          </div>

          {/* Gemini AI Insights */}
          <div className="card bg-gradient-to-br from-base-100 to-emerald-900/10 shadow-2xl border-2 border-emerald-500/20 w-full col-span-1 md:col-span-2 lg:col-span-1 hover:scale-[1.02] transition-all duration-300">
  <div className="card-body space-y-4">
    <div className="flex items-center justify-between">
      <h2 className="card-title text-emerald-400 text-2xl font-extrabold tracking-tight">
        🧠 AI Eco Buddy
      </h2>
      <Sparkles className="text-emerald-400 bg-emerald-900/30 p-1.5 rounded-full w-8 h-8" />
    </div>

    <p className="text-emerald-300/80 text-sm font-medium">
      Need a boost or a tip? Let Gemini help you stay inspired 🌟
    </p>

    <button 
      onClick={fetchEcoInsight} 
      className="btn border-2 border-emerald-500 bg-emerald-500/10 hover:bg-emerald-500 
                text-emerald-400 hover:text-white px-6 py-2.5 rounded-xl
                transform hover:scale-105 transition-all duration-300 ease-out
                shadow-lg hover:shadow-emerald-500/25 font-semibold
                flex items-center gap-2 w-fit"
      disabled={aiLoading}
    >
      {aiLoading ? (
        <>
          <span className="loading loading-spinner loading-sm"></span>
          <span>Processing...</span>
        </>
      ) : (
        <>
          <Sparkles className="w-4 h-4" />
          <span>Inspire Me</span>
        </>
      )}
    </button>

    {aiMessage && (
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-lg blur-xl">
        </div>
        <div className="relative bg-base-200/80 backdrop-blur-sm p-4 rounded-lg border border-emerald-500/20 
                      shadow-xl font-medium text-sm text-emerald-50/90 leading-relaxed whitespace-pre-line">
          {aiMessage}
        </div>
      </div>
    )}
  </div>
</div>

        </div>
      </div>
    </div>
  );
}
