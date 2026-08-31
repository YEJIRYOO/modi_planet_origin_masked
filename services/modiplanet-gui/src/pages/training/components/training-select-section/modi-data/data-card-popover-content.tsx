import { useState } from 'react';
import useTranslator from '@hooks/useTranslator';
import { ModiData } from '@src/lib/types/modi-data';

interface DataCardPopoverContentProps {
  data: ModiData;
  onRenameClick: () => void;
  onDeleteClick: () => void;
}

function DataCardPopoverContent({
  data,
  onRenameClick,
  onDeleteClick,
}: DataCardPopoverContentProps) {
  const { t } = useTranslator();

  const handleDownloadClick = () => {
    const json = JSON.stringify(data.data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.name}.modi`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="border bg-white rounded-20 p-[16px] shadow-sm">
      <button
        onClick={handleDownloadClick}
        className="w-[160px] h-[40px] px-[15px] flex items-center text-font-sub_1 rounded-10 duration-200 hover:bg-form-form "
      >
        {t('DOWNLOAD')}
      </button>
      <button
        onClick={onRenameClick}
        className="w-[160px] h-[40px] px-[15px] flex items-center text-font-sub_1 rounded-10 duration-200 hover:bg-form-form "
      >
        {t('RENAME')}
      </button>
      <button
        onClick={onDeleteClick}
        className="w-[160px] h-[40px] px-[15px] flex items-center text-font-sub_1 rounded-10 duration-200 hover:bg-form-form "
      >
        {t('DELETE')}
      </button>
    </div>
  );
}

export default DataCardPopoverContent;
