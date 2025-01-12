'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  return (
    <nav aria-label="Navigation des pages" className="flex justify-center mt-8">
      <ul className="flex items-center gap-1">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg hover:bg-violet-100 disabled:opacity-50 disabled:hover:bg-transparent"
            aria-label="Page précédente"
          >
            ←
          </button>
        </li>
        
        {getPageNumbers().map((pageNumber, index) => (
          <li key={index}>
            {pageNumber === '...' ? (
              <span className="px-3 py-2">...</span>
            ) : (
              <button
                onClick={() => onPageChange(Number(pageNumber))}
                className={`px-3 py-2 rounded-lg ${
                  currentPage === pageNumber
                    ? 'bg-violet-600 text-white'
                    : 'hover:bg-violet-100'
                }`}
                aria-current={currentPage === pageNumber ? 'page' : undefined}
              >
                {pageNumber}
              </button>
            )}
          </li>
        ))}
        
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg hover:bg-violet-100 disabled:opacity-50 disabled:hover:bg-transparent"
            aria-label="Page suivante"
          >
            →
          </button>
        </li>
      </ul>
    </nav>
  );
}
