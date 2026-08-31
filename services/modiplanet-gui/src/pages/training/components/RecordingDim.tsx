import useTranslator from '@src/components/hooks/useTranslator';
import ButtonUI from '@src/components/ui/Button/ButtonUI';
import { Recording, Warning } from '@src/lib/newAssets';

interface RecordingDim {
  onCancel: () => void;
}

export default function RecordingDim({ onCancel }: RecordingDim) {
  const { t } = useTranslator();

  return (
    <div className="flex flex-col fixed inset-0 bg-black bg-opacity-50 z-[200000] items-center justify-center">
      <Recording className="mb-5" />
      <p className="h5-b text-white whitespace-pre mb-[20px]">
        {t('RECORDING_DESC')}
      </p>
      <div className="flex items-center text-white mb-[48px]">
        <Warning className="mr-2" />
        <p className="p2-r">{t('DO_NOT_STOP_MONITOR')}</p>
      </div>
      <ButtonUI
        color="secondary"
        onClick={onCancel}
        className="mt-4 w-[174px] px-4 py-2 text-white rounded-[10px]"
      >
        {t('CANCEL')}
      </ButtonUI>
    </div>
  );
}
