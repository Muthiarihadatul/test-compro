'use client';

import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function SearchBar({
  initialQuery,
}: {
  initialQuery: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [value, setValue] = useState(initialQuery);

  // sync input ← URL
  useEffect(() => {
    setValue(initialQuery);
  }, [initialQuery]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams();
    if (value.trim()) {
      params.set('q', value);
    }

    // -----
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-full gap-2"
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search documents"
        className="flex-1 rounded-full border px-4 py-2 text-sm focus:ring-2 focus:ring-red-600"
      />

      <button
        type="submit"
        className="bg-red-700 text-white px-5 py-2 rounded-full text-sm"
      >
        <Search size={16} />
      </button>
    </form>
  );
}
