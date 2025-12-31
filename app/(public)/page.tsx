"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query.trim()) return;

    router.push(`/dashboard?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="text-center max-w-2xl mx-auto">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <Image
          src="/pubhub-logo.png"
          alt="Pub-Hub Logo"
          width={400}
          height={400}
          priority
          className="object-contain"
        />
      </div>

      {/* Tagline */}
      <h1 className="text-xl md:text-2xl font-bold text-red-700 mb-4">
        Let’s connect research in one place
      </h1>

      {/* Description */}
      <p className="text-gray-600 mb-8 leading-relaxed">
        Centralize lecturers’ publications of Telkom University from multiple academic sources.
      </p>

      {/* 🔍 Search */}
      <div className="w-full max-w-4xl mx-auto px-4">
        <form
          onSubmit={handleSearch}
          className="
            flex flex-col
            md:flex-row
            items-stretch md:items-center
            gap-4
            justify-center
          "
        >
          {/* Search Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Documents"
            className="
              w-full md:flex-1
              md:min-w-[320px]
              px-6 py-3
              rounded-full
              border border-red-700
              text-gray-600
              focus:outline-none focus:ring-2 focus:ring-red-700
            "
          />

          {/* Search Button */}
          <button
            type="submit"
            className="
              flex items-center justify-center gap-2
              px-8 py-3
              rounded-full
              bg-red-700
              text-white
              font-medium
              hover:bg-red-800
              transition
              focus:outline-none focus:ring-2 focus:ring-red-700
            "
          >
            <i className="fas fa-search" />
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
