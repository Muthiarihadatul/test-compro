"use client";

import { X } from "lucide-react";

type Author = {
  name: string;
  affiliation: string;
  department: string;
  totalArticle: number;
  totalCitation: number;
  hIndexScopus: number;
  hIndexGoogle: number;
  hIndexWos: number;
};

export default function AuthorPopup({
  author,
  onClose,
}: {
  author: Author;
  onClose: () => void;
}) {
  return (
    <>
      {/* BACKDROP (fade in) */}
      <div
        onClick={onClose}
        className="
          fixed inset-0 z-40
          bg-black/40
          backdrop-blur-[1px]
          transition-opacity duration-300
          opacity-100
        "
      />

      {/* POPUP (fade + scale) */}
      <div
        className="
          fixed z-50
          top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2
          w-[320px]
          rounded-xl
          bg-white
          shadow-2xl
          overflow-hidden

          transition-all duration-300 ease-out
          scale-100 opacity-100
        "
      >
        {/* HEADER */}
        <div className="bg-red-700 text-white px-4 py-3 flex justify-between items-center">
          <span className="text-sm font-semibold">
            Author Information
          </span>
          <button
            onClick={onClose}
            className="hover:opacity-80 transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-4 text-sm text-gray-700 space-y-2">
          <p><b>Name:</b> {author.name}</p>
          <p><b>Affiliation:</b> {author.affiliation}</p>
          <p><b>Department:</b> {author.department}</p>
          <p><b>Total Article:</b> {author.totalArticle}</p>
          <p><b>Total Citation:</b> {author.totalCitation}</p>
          <p><b>h-index Scopus:</b> {author.hIndexScopus}</p>
          <p><b>h-index Google:</b> {author.hIndexGoogle}</p>
          <p><b>h-index WoS:</b> {author.hIndexWos}</p>
        </div>
      </div>
    </>
  );
}
