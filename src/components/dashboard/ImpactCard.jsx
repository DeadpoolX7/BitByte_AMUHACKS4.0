import React from 'react';
import { Leaf } from 'lucide-react';

export default function ImpactCard() {
  return (
    <div className="bg-white shadow rounded-xl p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h2 className="text-md font-medium text-gray-700">Total Impact</h2>
        <Leaf className="text-green-600" />
      </div>
      <p className="text-3xl font-bold text-gray-900">245 kg</p>
      <p className="text-sm text-gray-500">CO₂ saved this month</p>
      <p className="text-sm text-green-600">↑ +12% from last month</p>
    </div>
  );
}
