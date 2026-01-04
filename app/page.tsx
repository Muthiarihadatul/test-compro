"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search } from "lucide-react";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/dashboard?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-6">
      
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center"
      />
      <div className="absolute inset-0 bg-white/70" />

      {/* CONTENT */}
      <main className="relative z-10 w-full max-w-2xl text-center">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/pubhub-logo.png"
            alt="Pub-Hub Logo"
            width={400}
            height={400}
            priority
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

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Documents"
            className="
              w-full md:w-96
              px-6 py-3
              rounded-full
              border border-red-700
              focus:outline-none focus:ring-2 focus:ring-red-700
            "
          />

          <button
            type="submit"
            className="
              bg-red-700 text-white px-5 py-2 rounded-full text-sm flex items-center gap-2 shadow-md hover:bg-red-800 active:scale-95 active:shadow-sm transition-all duration-150
            "
          >
            
            <i className="fas fa-search" />
            Search
          </button>
        </form>

      </main>
    </div>
  );
}
