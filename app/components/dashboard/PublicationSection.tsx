'use client';

import { useState, useEffect } from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline';
import SearchBar from './SearchBar';
import PublicationList from './PublicationList';
import FilterSidebar from './FilterSidebar';

export default function PublicationSection() {
  const [openFilter, setOpenFilter] = useState(false);
  const [query, setQuery] = useState('');

  // ambil query langsung dari URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get('q') ?? '');
  }, []);

  return (
    <section className="flex flex-col gap-4">
      {/* SEARCH */}
      <SearchBar initialQuery={query} />

      {/* MOBILE FILTER BUTTON */}
      <div className="md:hidden flex justify-end">
        <button
          onClick={() => setOpenFilter(!openFilter)}
          className="flex items-center gap-2 border rounded-full px-4 py-2 text-sm"
        >
          <FunnelIcon className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* MOBILE FILTER DROPDOWN */}
      {openFilter && (
        <div className="md:hidden">
          <FilterSidebar />
        </div>
      )}

      {/* LIST */}
      <PublicationList />
    </section>
  );
}
