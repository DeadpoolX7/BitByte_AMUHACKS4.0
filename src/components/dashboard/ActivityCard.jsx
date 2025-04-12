import React from 'react';
import { CalendarDays } from 'lucide-react';

export default function ActivityCard() {
  return (
    <div className="bg-white shadow rounded-xl p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h2 className="text-md font-medium text-gray-700">Activities</h2>
        <CalendarDays className="text-blue-600" />
      </div>
      <p className="text-3xl font-bold text-gray-900">23</p>
      <p className="text-sm text-gray-500">Activities this month</p>
      <p className="text-sm text-blue-600 underline">5 streaks in a row</p>
    </div>
  );
}
