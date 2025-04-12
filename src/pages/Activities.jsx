import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { db } from '../libs/firebase';
import { collection, addDoc, updateDoc, doc, increment } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

export default function Activities() {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPoints, setShowPoints] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const calculatePoints = (activity) => {
    const pointsMap = {
      'planted_tree': 100,
      'recycling': 50,
      'public_transport': 30,
      'others': 20
    };
    return pointsMap[activity] || 20;
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      
      // Calculate points
      const points = calculatePoints(data.activityType);

      // Add activity to Firestore
      await addDoc(collection(db, 'activities'), {
        userId: user.uid,
        activity: data.activity,
        activityType: data.activityType,
        date: data.date,
        points,
        createdAt: new Date()
      });

      // Update user's total points
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        totalPoints: increment(points)  // Use the imported increment
      });

      // Show points popup
      setEarnedPoints(points);
      setShowPoints(true);
      setTimeout(() => setShowPoints(false), 3000);

      reset();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit activity');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <h2 className="text-3xl font-bold text-center mb-6">🌱 Log Your Eco Activity</h2>

      {showPoints && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg animate-bounce">
          🎉 You earned {earnedPoints} points!
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="bg-base-200 p-6 rounded-xl shadow space-y-4">
        <div>
          <label className="label">Activity Type</label>
          <select 
            {...register('activityType', { required: true })}
            className="select select-bordered w-full"
          >
            <option value="planted_tree">Planted a Tree</option>
            <option value="recycling">Recycling</option>
            <option value="public_transport">Used Public Transport</option>
            <option value="others">Other Activity</option>
          </select>
        </div>

        <div>
          <label className="label">Description</label>
          <input
            {...register('activity', { required: true })}
            className="input input-bordered w-full"
            placeholder="What did you do?"
          />
        </div>

        <div>
          <label className="label">Date</label>
          <input
            type="date"
            {...register('date', { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-success w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Activity ✅'}
        </button>
      </form>
    </div>
  );
}
