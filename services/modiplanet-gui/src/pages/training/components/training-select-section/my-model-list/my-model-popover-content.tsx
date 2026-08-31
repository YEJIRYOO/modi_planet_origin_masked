import useTranslator from '@hooks/useTranslator';

interface IMyModelPopoverContent {
  onClickDelete: () => void;
  onClickRename: () => void;
}

function MyModelPopoverContent({
  onClickDelete,
  onClickRename,
}: IMyModelPopoverContent) {
  const { t } = useTranslator();

  return (
    <div className="border bg-white rounded-20 p-[16px] shadow-sm">
      <button
        onClick={onClickDelete}
        className="min-w-[132px] h-[40px] px-[15px] flex items-center text-font-sub_1 rounded-10 duration-200 hover:bg-form-form "
      >
        {t('DELETE')}
      </button>
      <button
        onClick={onClickRename}
        className="min-w-[132px] h-[40px] px-[15px] flex items-center text-font-sub_1 rounded-10 duration-200 hover:bg-form-form "
      >
        {t('RENAME')}
      </button>
    </div>
  );
}

export default MyModelPopoverContent;
