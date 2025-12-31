'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';


export default function SearchBar({
  initialQuery,
}: {
  initialQuery: string;
}) {
  const [value, setValue] = useState(initialQuery);

  return (
    <form className="flex max-w-full gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search documents"
        className="flex-1 rounded-full border px-4 py-2 text-sm focus:ring-2 focus:ring-red-600"
      />
      <button className="bg-red-700 text-white px-5 py-2 rounded-full text-sm">
        <Search size={16} />
      </button>
    </form>
  );
}
