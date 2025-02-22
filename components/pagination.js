import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, setCurrentPage }) {
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="disabled:opacity-50"
        aria-label="Previous Page"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="disabled:opacity-50"
        aria-label="Next Page"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}