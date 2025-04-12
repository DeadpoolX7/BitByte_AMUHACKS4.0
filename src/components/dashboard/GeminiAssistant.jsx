import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Bot, Loader2, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function GeminiAssistant() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const { register, handleSubmit, reset } = useForm();

  const hiddenRoutes = ['/', '/signin'];
  if (hiddenRoutes.includes(location.pathname)) return null;

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    setAiResponse('');
    try {
      // Add context about EcoRewards to the prompt
      const contextualPrompt = `You are an AI assistant for EcoRewards, a platform that rewards users for eco-friendly activities. 
      On our platform:
      - Planting a tree earns 100 points
      - Recycling activities earn 50 points
      - Using public transport earns 30 points
      - Other eco-friendly activities earn 20 points
      
      User Question: ${data.prompt}
      
      Please provide a helpful response based on the EcoRewards platform and our point system.`;

      const res = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
        {
          contents: [{
            parts: [{
              text: contextualPrompt
            }]
          }]
        },
        {
          params: {
            key: import.meta.env.VITE_REACT_GEMINI_API_KEY
          }
        }
      );

      const reply = res.data.candidates[0]?.content?.parts[0]?.text;
      setAiResponse(reply || 'Sorry, I could not generate a response.');
    } catch (error) {
      console.error('Gemini API Error:', error);
      setAiResponse('Error connecting to AI service. Please try again later.');
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setOpen(true)} 
        className="fixed bottom-6 right-6 z-50 btn btn-circle bg-primary text-white shadow-lg hover:scale-105 transition-transform"
      >
        <Bot className="w-6 h-6" />
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 overflow-hidden" onClick={() => setOpen(false)}>
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />
          <div className="flex min-h-full items-center justify-center p-4">
            <div 
              className="bg-base-100 max-w-md w-full p-6 rounded-xl shadow-xl relative max-h-[90vh] flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setOpen(false)} 
                className="absolute top-3 right-3 text-gray-400 hover:text-white"
              >
                <X />
              </button>
              
              <div className="flex-none">
                <h2 className="text-lg font-bold text-center mb-2">
                  🌿 Eco AI Assistant
                </h2>
                <p className="text-sm text-center text-gray-400 mb-4">
                  Ask anything about eco-friendly actions or how to gain more points!
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                  <input 
                    {...register('prompt', { required: true })} 
                    className="input input-bordered w-full" 
                    placeholder="e.g. Best activities to save water?"
                  />
                  <button 
                    className="btn btn-primary w-full" 
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Ask AI 🤖'
                    )}
                  </button>
                </form>
              </div>

              {aiResponse && (
                <div className="mt-4 flex-1 overflow-y-auto">
                  <div className="p-3 bg-neutral text-white rounded-md">
                    <p className="text-sm whitespace-pre-wrap">{aiResponse}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
