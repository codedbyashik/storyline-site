'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function SortMenu({
  sortOption,
  setSortOption,
}: {
  sortOption: string;
  setSortOption: (v: 'recent' | 'oldest') => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative text-white">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl border border-white/20 hover:bg-white/20 transition backdrop-blur-md"
      >
        <span className="font-semibold">
          {sortOption === 'recent' ? 'Recent First' : 'Oldest First'}
        </span>
        <ChevronDown size={18} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 bg-black/80 backdrop-blur-xl border border-white/20 rounded-xl shadow-xl w-40">
          <button
            onClick={() => {
              setSortOption('recent');
              setOpen(false);
            }}
            className={`w-full text-left px-4 py-2 rounded-t-xl hover:bg-white/10 transition ${
              sortOption === 'recent' ? 'bg-white/10' : ''
            }`}
          >
            🔥 Recent First
          </button>
          <button
            onClick={() => {
              setSortOption('oldest');
              setOpen(false);
            }}
            className={`w-full text-left px-4 py-2 rounded-b-xl hover:bg-white/10 transition ${
              sortOption === 'oldest' ? 'bg-white/10' : ''
            }`}
          >
            🕰 Oldest First
          </button>
        </div>
      )}
    </div>
  );
}
