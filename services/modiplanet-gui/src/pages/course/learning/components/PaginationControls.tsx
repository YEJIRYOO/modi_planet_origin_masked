import { useState, useEffect, useCallback } from 'react';
import Chevron from '@src/lib/newAssets/chevron';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onPageChange?: (page: number) => void;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  onPageChange,
}: PaginationControlsProps) {
  const [inputValue, setInputValue] = useState(String(currentPage));

  useEffect(() => {
    setInputValue(String(currentPage));
  }, [currentPage]);

  const commitPage = useCallback(() => {
    const parsed = Number(inputValue);
    if (!Number.isNaN(parsed) && parsed >= 1 && parsed <= totalPages) {
      onPageChange?.(parsed);
    } else {
      setInputValue(String(currentPage));
    }
  }, [inputValue, totalPages, currentPage, onPageChange]);

  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  return (
    <div className="flex items-center gap-[16px]">
      <button disabled={isPrevDisabled} onClick={onPrevPage}>
        <Chevron.ChevronLeft
          className={`w-[24px] h-[24px] ${
            isPrevDisabled ? 'text-font-non' : 'text-font-main'
          }`}
        />
      </button>
      <div className="flex items-center gap-1 text-[14px]">
        <input
          type="text"
          inputMode="numeric"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={commitPage}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commitPage();
          }}
          className="w-[40px] h-[24px] text-center text-[#2B2929] border border-[#DDDDDD] rounded-[8px] outline-none text-[16px]"
        />
        <span className="text-[#999999]">/</span>
        <input
          type="text"
          value={totalPages}
          disabled
          className="w-[40px] h-[24px] text-center text-[#666666] border border-[#DDDDDD] rounded-[8px] bg-form-form text-[16px]"
        />
      </div>
      <button disabled={isNextDisabled} onClick={onNextPage}>
        <Chevron.ChevronRight
          className={`w-[24px] h-[24px] ${
            isNextDisabled ? 'text-font-non' : 'text-font-main'
          }`}
        />
      </button>
    </div>
  );
}
