import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Award, BarChart2, CheckCircle, Leaf, Users, Zap } from 'lucide-react';

export default function HomePage() {
  const { user } = useAuth();
  const [animatedCount, setAnimatedCount] = useState(0);

  // Animate the eco-actions counter
  useEffect(() => {
    const target = 27500;
    const duration = 2000;
    const steps = 50;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setAnimatedCount(target);
        clearInterval(timer);
      } else {
        setAnimatedCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  // Testimonials data
  const testimonials = [
    {
      name: "Emma Chen",
      role: "EcoRewards User",
      content: "I've earned enough points for 3 free eco-friendly products in just 2 months. The dashboard makes tracking my impact super easy!",
    },
    {
      name: "Marcus Johnson",
      role: "Premium Member",
      content: "The point boost feature on Premium is amazing. I've redeemed twice as many rewards as my friends on the free plan.",
    },
    {
      name: "Sarah Miller",
      role: "Community Leader",
      content: "The leaderboard feature keeps my whole neighborhood competitive about reducing our carbon footprint. It's addictive!",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-100 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute top-40 -left-20 w-80 h-80 bg-emerald-100 rounded-full opacity-40 blur-3xl"></div>

        <div className="container mx-auto px-4 pt-20 pb-24 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 text-left">
              <div className="inline-block px-4 py-1 mb-4 rounded-full bg-green-100 text-green-800 font-medium text-sm">
                🌍 Make sustainability rewarding
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Get <span className="text-green-600">Rewarded</span> for Eco-Friendly Choices
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                <span className="font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent px-1 hover:scale-105 inline-block transition-transform">
                  EcoRewards
                </span>
                {" "}turns your sustainable daily habits into points you can redeem for amazing eco-friendly products and exclusive discounts.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                {user ? (
                  <Link
                    to="/dashboard"
                    className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center"
                  >
                    Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                ) : (
                  <Link
                    to="/signin"
                    className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center"
                  >
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                )}
                <Link
                  to="/learn-more"
                  className="px-8 py-4 bg-white hover:bg-gray-50 text-green-600 font-semibold rounded-lg border border-green-200 shadow hover:shadow-md transition-all"
                >
                  Learn More
                </Link>
              </div>

              <div className="flex items-center space-x-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-green-100 flex items-center justify-center">
                      <img
                        src={`https://api.dicebear.com/7.x/personas/svg?seed=user${i}`}
                        alt="Community Member"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-gray-700 font-medium">Joined by <span className="text-green-600 font-bold">12,000+</span> eco-warriors</p>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl p-4 mb-4">
                  <img
                    src="/api/placeholder/600/400"
                    alt="EcoRewards Dashboard"
                    className="rounded-xl w-full"
                  />
                </div>

                <div className="absolute -right-4 -bottom-4 bg-white p-4 rounded-xl shadow-lg">
                  <div className="flex items-center">
                    <div className="mr-3 bg-green-100 rounded-full p-3">
                      <Leaf className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Total Eco Actions</p>
                      <p className="text-2xl font-bold text-gray-800">{animatedCount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -left-4 -top-4 bg-white p-4 rounded-xl shadow-lg">
                  <div className="flex items-center">
                    <div className="mr-3 bg-green-100 rounded-full p-3">
                      <Award className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Rewards Claimed</p>
                      <p className="text-2xl font-bold text-gray-800">8,740</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How EcoRewards Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Track, earn and redeem - our platform makes sustainable living both fun and rewarding
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Leaf className="h-10 w-10 text-green-600" />,
                title: "Log Eco Activities",
                description: "Record your sustainable actions through our simple activity logging system"
              },
              {
                icon: <Zap className="h-10 w-10 text-green-600" />,
                title: "Earn Points",
                description: "Get instantly rewarded with points for every eco-friendly action you take"
              },
              {
                icon: <BarChart2 className="h-10 w-10 text-green-600" />,
                title: "Track Progress",
                description: "Monitor your impact and compare with others on our leaderboards"
              },
              {
                icon: <Award className="h-10 w-10 text-green-600" />,
                title: "Redeem Rewards",
                description: "Exchange your points for eco-friendly products and exclusive discounts"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-green-50 rounded-xl p-6 hover:shadow-lg transition-all">
                <div className="bg-white inline-block p-4 rounded-lg shadow-md mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Integration Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="bg-white rounded-2xl shadow-xl p-6 relative">
                <div className="p-4 bg-green-600 text-white rounded-lg mb-6 inline-block">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">AI-Powered Insights</h3>
                <p className="text-gray-600 mb-6">
                  Our smart dashboard uses AI to analyze your activities and provide personalized
                  recommendations to maximize your eco-impact and points.
                </p>

                <div className="p-4 bg-gray-50 rounded-lg mb-4">
                  <div className="flex items-start mb-4">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Zap className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-800">
                        <span className="font-semibold">Eco AI:</span> Based on your commuting habits, switching to a bike twice a week could earn you 450 extra points this month.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Zap className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-800">
                        <span className="font-semibold">Eco AI:</span> You're in the top 15% of water conservers in your area! Keep it up to maintain your leaderboard position.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Your Current Points</p>
                    <p className="text-2xl font-bold text-green-600">2,540</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Potential This Month</p>
                    <p className="text-2xl font-bold text-green-600">3,200</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="mb-6">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Smart Sustainability with AI Integration
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  Our AI doesn't just track—it helps you grow your impact through personalized insights and recommendations.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "Personalized Eco Recommendations",
                    description: "Get AI-powered suggestions to improve your sustainability habits based on your activity patterns."
                  },
                  {
                    title: "Impact Forecasting",
                    description: "See the projected environmental impact of your actions over time with our predictive analytics."
                  },
                  {
                    title: "Smart Point Opportunities",
                    description: "Receive alerts about high-value eco activities in your area to maximize your point earnings."
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4 mt-1">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start with our free plan or upgrade to unlock premium features
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Free</h3>
                <p className="text-gray-600 mb-6">Perfect for getting started with eco-friendly living</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-600">/month</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    "Activity logging & point tracking",
                    "Basic dashboard access",
                    "Community leaderboards",
                    "Limited AI requests",
                    "Standard reward redemption"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/signin"
                  className="block w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 text-center font-semibold rounded-lg transition-all"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden relative">
              <div className="absolute top-0 right-0 bg-green-600 text-white px-4 py-1 rounded-bl-lg text-sm font-semibold">
                POPULAR
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Pro</h3>
                <p className="text-gray-700 mb-6">For serious eco-warriors looking to maximize impact</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">$9.99</span>
                  <span className="text-gray-700">/month</span>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    "Everything in Free plan",
                    "Advanced AI model integration",
                    "30% point boost on all activities",
                    "Exclusive discounts in reward section",
                    "Premium support",
                    "Detailed impact analytics"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/signup-pro"
                  className="block w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white text-center font-semibold rounded-lg transition-all"
                >
                  Upgrade to Pro
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied eco-warriors making a difference
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-6">
                  <img
                    src={`https://api.dicebear.com/7.x/personas/svg?seed=${testimonial.name}`}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Start Your Eco-Friendly Journey Today</h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Join our growing community of eco-warriors making a difference one action at a time
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link
                to="/dashboard"
                className="px-8 py-4 bg-white text-green-700 hover:bg-gray-100 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center"
              >
                Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            ) : (
              <Link
                to="/signin"
                className="px-8 py-4 bg-white text-green-700 hover:bg-gray-100 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            )}

            <Link
              to="/our-impact"
              className="px-8 py-4 bg-transparent hover:bg-green-700 border border-white text-white font-semibold rounded-lg transition-all inline-flex items-center justify-center"
            >
              See Our Impact
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center space-x-8">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold">27K+</div>
              <div className="text-green-100">Active Users</div>
            </div>
            <div className="h-12 w-px bg-green-400"></div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold">18K+</div>
              <div className="text-green-100">Trees Planted</div>
            </div>
            <div className="h-12 w-px bg-green-400"></div>
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold">125K+</div>
              <div className="text-green-100">Rewards Claimed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">EcoRewards</h3>
              <p className="text-gray-400 mb-4">Making sustainability rewarding and accessible for everyone.</p>
              <div className="flex space-x-4">
                {/* Social icons would go here */}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2">
                <li><Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link to="/leaderboard" className="text-gray-400 hover:text-white transition-colors">Leaderboards</Link></li>
                <li><Link to="/rewards" className="text-gray-400 hover:text-white transition-colors">Rewards</Link></li>
                <li><Link to="/activity-log" className="text-gray-400 hover:text-white transition-colors">Activity Log</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/partners" className="text-gray-400 hover:text-white transition-colors">Partners</Link></li>
                <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} EcoRewards. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}