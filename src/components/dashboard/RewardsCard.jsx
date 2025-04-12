import React from 'react';
import { Gift } from 'lucide-react';

export default function RewardsCard() {
  return (
    <div className="bg-white shadow rounded-xl p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h2 className="text-md font-medium text-gray-700">Rewards</h2>
        <Gift className="text-purple-600" />
      </div>
      <p className="text-3xl font-bold text-gray-900">1250 points</p>
      <p className="text-sm text-gray-500">Redeemable now</p>
    </div>
  );
}
