'use client';
import { useState, useEffect } from 'react';

export default function PriceCalculator() {
  const [guests, setGuests] = useState(5);
  const [hours, setHours] = useState(5);
  const [total, setTotal] = useState(0);

  const calcPrice = () => {
    const base = 5000;
    const guestCost = guests * 50;
    const timeCost = hours * 100;
    const finalTotal = base + guestCost + timeCost;
    setTotal(finalTotal);
  };

  useEffect(() => {
    calcPrice();
  }, [guests, hours]);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-6 pb-3">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          Event Price Calculator
        </h3>
      </div>
      <div className="px-6 pb-6 space-y-3 pt-0">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-2">
              Number of Guests: {guests}
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Duration: {hours} hours
            </label>
            <input
              type="range"
              min="0"
              max="24"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0h</span>
              <span>12h</span>
              <span>24h</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-700 mb-1">
            {formatPrice(total)}
          </div>
          <p className="text-blue-600 font-medium text-sm">Total Event Cost</p>
        </div>
      </div>
    </div>
  );
}