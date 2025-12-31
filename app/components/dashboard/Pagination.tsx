'use client';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: (number | 'ellipsis')[] = [];

    const delta = 2; // jumlah page di kiri & kanan current
    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

    pages.push(1);

    if (rangeStart > 2) {
      pages.push('ellipsis');
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (rangeEnd < totalPages - 1) {
      pages.push('ellipsis');
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav className="flex justify-center items-center gap-2 text-sm mt-6">
      {/* PREV */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="
          px-3 py-1 rounded-full
          bg-gray-100 hover:bg-gray-200
          disabled:opacity-40 disabled:cursor-not-allowed
        "
      >
        Prev
      </button>

      {/* PAGE NUMBERS */}
      {getPages().map((page, i) =>
        page === 'ellipsis' ? (
          <span key={i} className="px-2 text-gray-400">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              px-3 py-1 rounded-full transition
              ${
                page === currentPage
                  ? 'bg-red-700 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }
            `}
          >
            {page}
          </button>
        )
      )}

      {/* NEXT */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="
          px-3 py-1 rounded-full
          bg-gray-100 hover:bg-gray-200
          disabled:opacity-40 disabled:cursor-not-allowed
        "
      >
        Next
      </button>
    </nav>
  );
}
