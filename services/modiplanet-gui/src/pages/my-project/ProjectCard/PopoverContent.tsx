import { ProjectListItemModel } from '@services/client-model/project';
import useTranslator from '@src/components/hooks/useTranslator';

interface PopoverContentProps {
  data: ProjectListItemModel;
  onRenameClick: () => void;
  onDeleteClick: () => void;
  onCopyClick: () => void;
}

function PopoverContent({
  data,
  onRenameClick,
  onDeleteClick,
  onCopyClick,
}: PopoverContentProps) {
  const { t } = useTranslator();

  const handleDownloadClick = () => {
    const blob = new Blob([data.jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const extension = data.runType === 'UPLOAD' ? 'bk' : 'abk';
    link.download = `${data.title}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="border bg-white rounded-20 p-[16px] shadow-sm">
      <button
        onClick={onDeleteClick}
        className="w-full h-[40px] px-[15px] flex items-center text-font-sub_1 rounded-10 duration-200 hover:bg-form-form whitespace-nowrap"
      >
        {t('DELETE')}
      </button>
      <button
        onClick={onCopyClick}
        className="w-full h-[40px] px-[15px] flex items-center text-font-sub_1 rounded-10 duration-200 hover:bg-form-form whitespace-nowrap"
      >
        {t('DUPLICATE')}
      </button>
      <button
        onClick={onRenameClick}
        className="w-full h-[40px] px-[15px] flex items-center text-font-sub_1 rounded-10 duration-200 hover:bg-form-form whitespace-nowrap"
      >
        {t('RENAME')}
      </button>
      <button
        onClick={handleDownloadClick}
        className="w-full h-[40px] px-[15px] flex items-center text-font-sub_1 rounded-10 duration-200 hover:bg-form-form whitespace-nowrap"
      >
        {t('SAVE_PC')}
      </button>
    </div>
  );
}

export default PopoverContent;
