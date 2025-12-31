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

type SortKey = 'title' | 'cited' | null;

/* =======================
   DATA (DUMMY)
======================= */
const publications: Publication[] = [
  {
    id: 1,
    title:
      'Machine Learning Methods in Smart Lighting Towards Achieving User Comfort: A Survey',
    authors: 'AG Putrada, M Abdurahman, D Perdana, HH Nuha',
    journal: 'IEEE Access, Vol. 10, 2022',
    cited: 164,
  },
  {
    id: 2,
    title: 'Deep Learning-Based Energy Optimization in Smart Buildings',
    authors: 'M Rihadatul Aisyi, R Raihan, A Nugraha',
    journal: 'Energy and Buildings, Elsevier, 2021',
    cited: 92,
  },
  {
    id: 3,
    title: 'Internet of Things Architecture for Smart City Applications',
    authors: 'D Perdana, S Hidayat, A Fauzan',
    journal: 'Journal of Smart Cities, 2020',
    cited: 210,
  },
  {
    id: 4,
    title: 'A Comparative Study of CNN and Vision Transformer for Image Classification',
    authors: 'M Aisyah, R Setiawan, N Ramadhan',
    journal: 'International Journal of Computer Vision, 2023',
    cited: 57,
  },
  {
    id: 5,
    title: 'Natural Language Processing for Academic Document Classification',
    authors: 'R Zain, H Nuha, A Wijaya',
    journal: 'ACM Transactions on Information Systems, 2022',
    cited: 134,
  },
  {
    id: 6,
    title: 'Blockchain-Based Secure Data Sharing in Healthcare Systems',
    authors: 'S Pratama, A Kurniawan, M Fikri',
    journal: 'IEEE Transactions on Healthcare Informatics, 2021',
    cited: 76,
  },
  {
    id: 7,
    title: 'Audio-Based Image Captioning for Accessibility of Visually Impaired Users',
    authors: 'M Rihadatul Aisyi, R Zain',
    journal: 'International Conference on AI for Accessibility, 2024',
    cited: 18,
  },
  {
    id: 8,
    title: 'Performance Evaluation of RESTful API Testing Using Automation Tools',
    authors: 'A Saputra, D Prakoso',
    journal: 'Journal of Software Engineering, 2020',
    cited: 65,
  },
];




/* =======================
   COMPONENT
======================= */
export default function PublicationList() {
  const sortRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const [selected, setSelected] = useState<number[]>([]);
  const [openExport, setOpenExport] = useState(false);
  const [exportType, setExportType] = useState<'csv' | 'pdf' | null>(null);
  const [sortBy, setSortBy] = useState<'title' | 'cited' | null>(null);
  const [openSort, setOpenSort] = useState(false);

  const allSelected = selected.length === publications.length;

  const exportLabel = (() => {
    if (exportType === 'csv') return 'Export CSV';
    if (exportType === 'pdf') return 'Export PDF';
    return 'Export';
    })();


  const sortLabel = (() => {
    if (sortBy === 'title') return 'Title (A–Z)';
    if (sortBy === 'cited') return 'Most Cited';
    return 'Sort by';
    })();


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
        if (
        sortRef.current &&
        !sortRef.current.contains(e.target as Node)
        ) {
        setOpenSort(false);
        }

        if (
        exportRef.current &&
        !exportRef.current.contains(e.target as Node)
        ) {
        setOpenExport(false);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
    }, []);


    /* RESET PAGE WHEN SORT CHANGES */
    useEffect(() => {
        setCurrentPage(1);
    }, [sortBy]);

    /* =======================
        SORT
    ======================= */
    const sortedPublications = [...publications].sort((a, b) => {
        if (!sortBy) return 0;
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        if (sortBy === 'cited') return b.cited - a.cited;
        return 0;
    });

    /* =======================
        PAGINATION
    ======================= */
    const totalPages = Math.ceil(
        sortedPublications.length / ITEMS_PER_PAGE
    );

    const paginatedPublications = sortedPublications.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );



  const selectedData = sortedPublications.filter((p) =>
    selected.includes(p.id)
  );

  /* =======================
      SELECT HANDLERS
  ======================= */
  const toggleSelectAll = () => {
    setSelected(allSelected ? [] : publications.map((p) => p.id));
  };

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };



  /* =======================
      EXPORT CSV
  ======================= */
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

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'publications_metadata.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  /* =======================
      EXPORT PDF
  ======================= */
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text('Publication Metadata', 14, 15);

    autoTable(doc, {
      startY: 20,
      head: [['Title', 'Authors', 'Journal', 'Cited']],
      body: selectedData.map((p) => [
        p.title,
        p.authors,
        p.journal,
        p.cited,
      ]),
      styles: { fontSize: 8 },
      headStyles: {
        fillColor: [157, 0, 9], // #9D0009
      },
    });

    doc.save('publications_metadata.pdf');
  };

  /* =======================
      UI
  ======================= */
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
          {selected.length > 0 && (
            <span className="text-gray-500">
              (Selected {selected.length})
            </span>
          )}
        </label>

        <div className="flex gap-2">
          {/* SORT */}
            <div className="flex gap-2">
            {/* SORT */}
            <div className="relative" ref={sortRef}>
                {/* BUTTON */}
                <button
                onClick={() => setOpenSort(!openSort)}
                className="
                    flex items-center gap-2
                    bg-red-700 text-white
                    px-4 py-1.5 rounded-full
                    text-sm font-medium
                    transition-all duration-200
                    hover:bg-red-800
                "
                >
                {sortLabel}
                <ChevronDown
                className={`
                    w-4 h-4 transition-transform duration-200
                    ${openSort ? 'rotate-180' : ''}
                `}
                />
                </button>

                {/* DROPDOWN */}
                <div
                className={`
                    absolute right-0 mt-2 w-44
                    bg-red-50
                    rounded-2xl
                    shadow-[0_10px_30px_rgba(157,0,9,0.18)]
                    overflow-hidden z-30
                    transform transition-all duration-200 ease-out
                    ${openSort
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}
                `}
                >
                {/* ITEM */}
                <button
                    onClick={() => {
                    setSortBy('title');
                    setOpenSort(false);
                    }}
                    className="
                    w-full text-left px-4 py-3 text-sm
                    text-red-800
                    transition-colors duration-150
                    hover:bg-red-700 hover:text-white
                    "
                >
                    Title (A–Z)
                </button>

                <button
                    onClick={() => {
                    setSortBy('cited');
                    setOpenSort(false);
                    }}
                    className="
                    w-full text-left px-4 py-3 text-sm
                    text-red-800
                    transition-colors duration-150
                    hover:bg-red-700 hover:text-white
                    "
                >
                    Most Cited
                </button>
                </div>
            </div>
            </div>



          {/* EXPORT */}
            <div className="relative" ref={exportRef}>
            {/* BUTTON */}
            <button
                onClick={() => setOpenExport(!openExport)}
                disabled={selected.length === 0}
                className={`
                flex items-center gap-2
                px-4 py-1.5 rounded-full
                text-sm font-medium
                transition-all duration-200
                ${selected.length === 0
                    ? 'bg-red-300 text-white/70 cursor-not-allowed'
                    : 'bg-red-700 text-white hover:bg-red-800'}
                `}
            >
                {exportLabel}
                <ChevronDown
                className={`
                    w-4 h-4 transition-transform duration-200
                    ${openExport ? 'rotate-180' : ''}
                `}
                />

            </button>

            {/* DROPDOWN */}
            <div
                className={`
                absolute right-0 mt-2 w-44
                bg-red-50
                rounded-2xl
                shadow-[0_10px_30px_rgba(157,0,9,0.18)]
                overflow-hidden z-30
                transform transition-all duration-200 ease-out
                ${openExport && selected.length > 0
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}
                `}
            >
                <button
                onClick={() => {
                    setExportType('csv');
                    exportCSV();
                    setOpenExport(false);
                }}
                className="
                    w-full text-left px-4 py-3 text-sm
                    text-red-800
                    transition-colors duration-150
                    hover:bg-red-700 hover:text-white
                "
                >
                Export CSV
                </button>

                <button
                onClick={() => {
                    setExportType('pdf');
                    exportPDF();
                    setOpenExport(false);
                }}
                className="
                    w-full text-left px-4 py-3 text-sm
                    text-red-800
                    transition-colors duration-150
                    hover:bg-red-700 hover:text-white
                "
                >
                Export PDF
                </button>
            </div>
            </div>



        </div>
      </div>

      {/* LIST */}
      {paginatedPublications.map((pub) => (
        <article key={pub.id} className="flex gap-3 border-b pb-3">
          <input
            type="checkbox"
            checked={selected.includes(pub.id)}
            onChange={() =>
              setSelected((prev) =>
                prev.includes(pub.id)
                  ? prev.filter((i) => i !== pub.id)
                  : [...prev, pub.id]
              )
            }
            className="accent-[#9D0009]"
          />

          <div>
            <Link href="/metadata" className="text-blue-600 text-sm font-medium hover:underline">
              {pub.title}
            </Link>
            <p className="text-xs text-gray-600">{pub.authors}</p>
            <p className="text-xs text-gray-500">{pub.journal}</p>
            <p className="text-xs text-blue-600">
              Cited by {pub.cited}
            </p>
          </div>
        </article>
      ))}

      {/* PAGINATION */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}