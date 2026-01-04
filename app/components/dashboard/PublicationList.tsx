'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Pagination from './Pagination'; // pastikan path sesuai
import { ChevronDown } from 'lucide-react';

/* =======================
   TYPES
======================= */
type Publication = {
  id: number;
  title: string;
  authors: string;
  journal: string;
  cited: number;
};

/* =======================
   COMPONENT
======================= */
export default function PublicationList() {
  const sortRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const [selected, setSelected] = useState<number[]>([]);
  const [openExport, setOpenExport] = useState(false);
  const [exportType, setExportType] = useState<'csv' | 'pdf' | null>(null);
  const [sortBy, setSortBy] = useState<'title' | 'cited' | null>(null);
  const [openSort, setOpenSort] = useState(false);

  const [query, setQuery] = useState('');

  const allSelected = selected.length === publications.length;

  const exportLabel =
    exportType === 'csv' ? 'Export CSV' :
    exportType === 'pdf' ? 'Export PDF' :
    'Export';

  const sortLabel =
    sortBy === 'title' ? 'Title (A–Z)' :
    sortBy === 'cited' ? 'Most Cited' :
    'Sort by';

  /* =======================
     AMBIL QUERY DARI URL
  ======================== */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get('q') ?? '');
  }, []);

  /* =======================
     FETCH PUBLICATIONS
  ======================== */
  useEffect(() => {
    if (!query) {
      setPublications([]);
      return;
    }

    async function fetchPublications() {
      setLoading(true);
      try {
        const base = process.env.NEXT_PUBLIC_API_BASE_URL;
        if (!base) throw new Error('NEXT_PUBLIC_API_BASE_URL belum diset');

        const res = await fetch(`${base}/search?q=${encodeURIComponent(query)}`);
        
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json?.message || 'API error');
        }

        setPublications(
          (json ?? []).map((t: any) => ({
            id: t.id,
            title: t.title,
            authors: Array.isArray(t.authors) ? t.authors.join(', ') : t.authors,
            journal: t.publicationName + ', ' + t.year,
            cited: t.citation,
          }))
        );
      } catch (err) {
        console.error('Failed to fetch publications:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPublications();
  }, [query]);

  /* =======================
     OUTSIDE CLICK HANDLER
  ======================== */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setOpenSort(false);
      if (exportRef.current && !exportRef.current.contains(e.target as Node)) setOpenExport(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /* =======================
     RESET PAGE WHEN SORT CHANGES
  ======================== */
  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy]);

  /* =======================
     SORTING
  ======================== */
  const sortedPublications = [...publications].sort((a, b) => {
    if (!sortBy) return 0;
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'cited') return b.cited - a.cited;
    return 0;
  });

  /* =======================
     PAGINATION
  ======================== */
  const totalPages = Math.ceil(sortedPublications.length / ITEMS_PER_PAGE);

  const paginatedPublications = sortedPublications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  /* =======================
     SELECTION HANDLERS
  ======================== */
  const toggleSelectAll = () => {
    setSelected(allSelected ? [] : publications.map(p => p.id));
  };

  const toggleSelect = (id: number) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const selectedData = sortedPublications.filter(p => selected.includes(p.id));

  /* =======================
     EXPORT CSV
  ======================== */
  const exportCSV = () => {
    const headers = ['Title', 'Authors', 'Journal', 'Cited'];
    const rows = selectedData.map((p) => [
      p.title,
      p.authors,
      p.journal,
      p.cited,
    ]);

    const csvContent =
      [headers, ...rows]
        .map((row) => row.map((v) => `"${v}"`).join(','))
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'publications_metadata.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  /* =======================
     EXPORT PDF
  ======================== */
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Publication Metadata', 14, 15);

    autoTable(doc, {
      startY: 20,
      head: [['Title', 'Authors', 'Journal', 'Cited']],
      body: selectedData.map((p) => [p.title, p.authors, p.journal, p.cited]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [157, 0, 9] },
    });

    doc.save('publications_metadata.pdf');
  };

  /* =======================
     UI
  ======================== */
  if (loading) return <p>Loading publications...</p>;
  if (!publications.length) return <p>No publications found for "{query}"</p>;

  return (
    <section className="space-y-4">
      {/* TOP BAR */}
      <div className="flex justify-between items-center">
        {/* SELECT ALL */}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={toggleSelectAll}
            className="accent-[#9D0009]"
          />
          Select All
          {selected.length > 0 && <span className="text-gray-500">(Selected {selected.length})</span>}
        </label>

        <div className="flex gap-2">
          {/* SORT */}
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setOpenSort(!openSort)}
              className="flex items-center gap-2 bg-red-700 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-red-800 transition-all"
            >
              {sortLabel}
              <ChevronDown className={`w-4 h-4 transition-transform ${openSort ? 'rotate-180' : ''}`} />
            </button>
            <div className={`absolute right-0 mt-2 w-44 bg-red-50 rounded-2xl shadow-[0_10px_30px_rgba(157,0,9,0.18)] overflow-hidden z-30 transition-all ${openSort ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}`}>
              <button onClick={() => { setSortBy('title'); setOpenSort(false); }} className="w-full text-left px-4 py-3 text-sm text-red-800 hover:bg-red-700 hover:text-white">Title (A–Z)</button>
              <button onClick={() => { setSortBy('cited'); setOpenSort(false); }} className="w-full text-left px-4 py-3 text-sm text-red-800 hover:bg-red-700 hover:text-white">Most Cited</button>
            </div>
          </div>

          {/* EXPORT */}
          <div className="relative" ref={exportRef}>
            <button
              onClick={() => setOpenExport(!openExport)}
              disabled={selected.length === 0}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${selected.length === 0 ? 'bg-red-300 text-white/70 cursor-not-allowed' : 'bg-red-700 text-white hover:bg-red-800'}`}
            >
              {exportLabel}
              <ChevronDown className={`w-4 h-4 transition-transform ${openExport ? 'rotate-180' : ''}`} />
            </button>
            <div className={`absolute right-0 mt-2 w-44 bg-red-50 rounded-2xl shadow-[0_10px_30px_rgba(157,0,9,0.18)] overflow-hidden z-30 transition-all ${openExport && selected.length > 0 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}`}>
              <button onClick={() => { setExportType('csv'); exportCSV(); setOpenExport(false); }} className="w-full text-left px-4 py-3 text-sm text-red-800 hover:bg-red-700 hover:text-white">Export CSV</button>
              <button onClick={() => { setExportType('pdf'); exportPDF(); setOpenExport(false); }} className="w-full text-left px-4 py-3 text-sm text-red-800 hover:bg-red-700 hover:text-white">Export PDF</button>
            </div>
          </div>
        </div>
      </div>

      {/* LIST */}
      {paginatedPublications.map(pub => (
        <article key={pub.id} className="flex gap-3 border-b pb-3">
          <input type="checkbox" checked={selected.includes(pub.id)} onChange={() => toggleSelect(pub.id)} className="accent-[#9D0009]" />
          <div>
            <Link href="/metadata" className="text-blue-600 text-sm font-medium hover:underline">{pub.title}</Link>
            <p className="text-xs text-gray-600">{pub.authors}</p>
            <p className="text-xs text-gray-500">{pub.journal}</p>
            <p className="text-xs text-blue-600">Cited by {pub.cited}</p>
          </div>
        </article>
      ))}

      {/* PAGINATION */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </section>
  );
}
