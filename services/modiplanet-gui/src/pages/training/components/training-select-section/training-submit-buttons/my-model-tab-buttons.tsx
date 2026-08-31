import Button from '@components/ui_old/button/button';
import useTranslator from '@hooks/useTranslator';

interface IMyModelTabButtons {
  disabled: boolean;
  onRetrainingClick: () => void;
  onCreateAIBlock: () => void;
}

function MyModelTabButtons({
  disabled,
  onRetrainingClick,
  onCreateAIBlock,
}: IMyModelTabButtons) {
  const { t } = useTranslator();

  return (
    <div className="flex gap-x-[16px]">
      <Button
        onClick={onRetrainingClick}
        disabled={disabled}
        className="w-[174px]"
        color="dark"
      >
        {t('TRAIN')}
      </Button>

      <Button
        onClick={onCreateAIBlock}
        disabled={disabled}
        className="w-[174px]"
      >
        {t('IMPORT')}
      </Button>
    </div>
  );
}

export default MyModelTabButtons;
