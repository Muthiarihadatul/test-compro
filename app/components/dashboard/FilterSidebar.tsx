'use client';

import { useState } from 'react';

export type FilterParams = {
  yearFrom?: string;
  yearTo?: string;
  author?: string;
};

export default function FilterSidebar({
  onApply,
}: {
  onApply: (filters: FilterParams) => void;
}) {
  const [yearMode, setYearMode] = useState<'range' | 'single'>('range');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');
  const [author, setAuthor] = useState('');

  const clearFilter = () => {
    setYearMode('range');
    setYearFrom('');
    setYearTo('');
    setAuthor('');
    onApply({});
  };

  const handleApply = () => {
    // kalau single → samakan
    if (yearMode === 'single' && yearFrom) {
      onApply({
        yearFrom,
        yearTo: yearFrom,
        author,
      });
    } else {
      onApply({
        yearFrom,
        yearTo,
        author,
      });
    }
  };

  return (
    <div className="p-4 space-y-4 rounded-xl">
      <h2 className="font-semibold">Filter</h2>

      {/* YEAR */}
      <section>
        <p className="text-sm font-medium mb-1">Year</p>

        <div className="flex gap-4 text-sm">
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              checked={yearMode === 'range'}
              onChange={() => setYearMode('range')}
              className="accent-red-700"
            />
            Range
          </label>

          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              checked={yearMode === 'single'}
              onChange={() => setYearMode('single')}
              className="accent-red-700"
            />
            Single
          </label>
        </div>

        {yearMode === 'range' ? (
          <div className="flex gap-2 mt-2">
            <input
              value={yearFrom}
              onChange={(e) => setYearFrom(e.target.value)}
              className="w-1/2 border rounded-lg px-2 py-1 text-sm text-center"
              placeholder="2000"
            />
            <input
              value={yearTo}
              onChange={(e) => setYearTo(e.target.value)}
              className="w-1/2 border rounded-lg px-2 py-1 text-sm text-center"
              placeholder="2025"
            />
          </div>
        ) : (
          <div className="mt-2">
            <input
              value={yearFrom}
              onChange={(e) => setYearFrom(e.target.value)}
              className="w-full border rounded-lg px-2 py-1 text-sm text-center"
              placeholder="2000"
            />
          </div>
        )}
      </section>

      {/* AUTHOR */}
      <section>
        <p className="text-sm font-medium">Author</p>
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border rounded-lg px-2 py-1 text-sm mt-1"
          placeholder="Author name"
        />
      </section>

      {/* AFFILIATION (STATIC) */}
      <section>
        <p className="text-sm font-medium">Affiliation</p>
        <input
          readOnly
          value="Telkom University"
          className="w-full border rounded-lg px-2 py-1 text-sm mt-1 bg-gray-50"
        />
      </section>

      {/* ACTION */}
      <div className="space-y-2 text-center">
        <button
          onClick={handleApply}
          className="w-full bg-red-700 hover:bg-red-800 text-white py-2 rounded-xl text-sm"
        >
          Apply
        </button>

        <span
          onClick={clearFilter}
          className="text-sm text-red-700 cursor-pointer hover:underline"
        >
          Clear
        </span>
      </div>
    </div>
  );
}
