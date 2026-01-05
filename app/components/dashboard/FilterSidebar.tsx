'use client';

import { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export type FilterParams = {
  yearFrom?: string;
  yearTo?: string;
  author?: string;
};

export default function FilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [yearMode, setYearMode] = useState<'range' | 'single'>('range');
  const [yearFrom, setYearFrom] = useState(searchParams.get('yearFrom') ?? '');
  const [yearTo, setYearTo] = useState(searchParams.get('yearTo') ?? '');
  const [author, setAuthor] = useState(searchParams.get('author') ?? '');

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString());

    // YEAR
    if (yearMode === 'single' && yearFrom) {
      params.set('yearFrom', yearFrom);
      params.set('yearTo', yearFrom);
    } else {
      yearFrom ? params.set('yearFrom', yearFrom) : params.delete('yearFrom');
      yearTo ? params.set('yearTo', yearTo) : params.delete('yearTo');
    }

    // AUTHOR
    author ? params.set('author', author) : params.delete('author');

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('yearFrom');
    params.delete('yearTo');
    params.delete('author');

    setYearFrom('');
    setYearTo('');
    setAuthor('');

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
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
          <input
            value={yearFrom}
            onChange={(e) => setYearFrom(e.target.value)}
            className="w-full border rounded-lg px-2 py-1 text-sm text-center mt-2"
            placeholder="2020"
          />
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
