"use client";

import React, { useState } from 'react';
import { Calendar, Clock, X, Check } from 'lucide-react';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (scheduledDate: string) => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;
    const fullIso = `${date}T${time}:00`;
    onConfirm(fullIso);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-card-DEFAULT border border-card-border p-6 rounded-2xl shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-white text-base flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent-purple" />
            <span>Schedule Message Delivery</span>
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-gray-400">
          Select a future date and time when your message should be delivered to Otajon's studio inbox.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Target Date</label>
            <div className="relative">
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-accent-purple"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">Target Time</label>
            <input
              type="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-accent-purple"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-accent-purple to-accent-blue text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-accent-purple/20 mt-2"
          >
            <Check className="w-4 h-4" />
            <span>Confirm Schedule</span>
          </button>
        </form>
      </div>
    </div>
  );
};
