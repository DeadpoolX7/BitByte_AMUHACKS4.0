import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../libs/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { Leaf, LogIn, ChevronRight, Shield, Award, Users } from "lucide-react";
export default function SignIn() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          totalPoints: 0,
          recentActivities: [],
          joinDate: new Date().toISOString(),
          level: 1,
        });
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Benefits data
  const benefits = [
    {
      icon: <Leaf className="w-6 h-6 text-green-600" />,
      title: "Track Eco Activities",
      description: "Log your daily sustainable actions"
    },
    {
      icon: <Award className="w-6 h-6 text-green-600" />,
      title: "Earn Rewards",
      description: "Convert your green habits into valuable rewards"
    },
    {
      icon: <Users className="w-6 h-6 text-green-600" />,
      title: "Join Community",
      description: "Connect with other eco-conscious individuals"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-green-900 to-gray-900 flex items-center justify-center p-4 relative">
      {/* Add a subtle texture overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
      
      {/* Make the card stand out more with stronger shadow */}
      <div className="relative w-full max-w-6xl grid md:grid-cols-2 shadow-2xl shadow-green-900/20 rounded-2xl overflow-hidden">
        {/* Left side - Sign in form */}
        <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8 flex items-center">
            <div className="bg-green-100 p-2 rounded-lg mr-3">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">EcoRewards</h1>
          </div>

          <h2 className="text-3xl font-extrabold mb-2 text-gray-900">Welcome Back!</h2>
          <p className="text-gray-600 mb-8">Sign in to continue your sustainable journey</p>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <button
            onClick={login}
            disabled={isLoading}
            className={`
              flex items-center justify-center w-full py-4 px-6 mb-4
              rounded-lg text-base font-medium transition-all
              border border-gray-300 shadow-sm
              ${isLoading
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 hover:shadow'
              }
            `}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </div>
            ) : (
              <>
                <div className="bg-white rounded p-1 mr-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"

                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"

                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"

                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"

                    />
                  </svg>
                </div>
                Sign in with Google
              </>
            )}
          </button>

          <button
            onClick={login}
            disabled={isLoading}
            className={`
              flex items-center justify-center w-full py-4 px-6 mb-6
              rounded-lg text-base font-medium transition-all
              ${isLoading
                ? 'bg-green-200 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl'
              }
              text-white
            `}
          >
            <LogIn className="mr-2 h-5 w-5" />
            {isLoading ? 'Signing in...' : 'Continue with Google'}
          </button>

          <div className="flex items-center mt-4 space-x-2 text-sm">
            <Shield className="h-4 w-4 text-gray-500" />
            <p className="text-gray-500">
              We respect your privacy and never share your data
            </p>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              By signing in, you agree to our{' '}
              <Link to="/terms" className="text-green-600 hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-green-600 hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </div>

        {/* Right side - Info/Illustration */}
        <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-green-600 to-emerald-700 p-12 text-white">
          <div>
            <h2 className="text-3xl font-bold mb-6">Join Our Eco-Conscious Community</h2>
            <p className="text-green-100 text-lg mb-8">
              Start earning rewards for your sustainable lifestyle choices today.
            </p>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-4 p-2 bg-white bg-opacity-20 rounded-lg">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-green-100">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <div className="flex -space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-green-500 bg-green-400 flex items-center justify-center">
                  <img
                    src={`https://api.dicebear.com/7.x/personas/svg?seed=user${i}`}
                    alt="Community Member"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-green-500 bg-green-600 flex items-center justify-center text-sm font-medium">
                +12k
              </div>
            </div>
            <p className="text-sm text-green-100">
              Join 12,000+ eco-warriors making a difference together
            </p>
          </div>

          <Link
            to="/learn-more"
            className="inline-flex items-center mt-8 text-white hover:text-green-100 transition-colors group"
          >
            Learn more about EcoRewards
            <ChevronRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}