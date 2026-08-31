import ClassifierCard from '@src/pages/training/voice/components/classfier-card';
import Button from '@components/ui_old/button/button';
import { useMyModelVoiceClassifier } from '@src/store/zustand/ai/my-model-voice-classifier';
import { useMemo } from 'react';
import { MIN_COUNT_CLASSIFIERS } from '@src/lib/constants/etc';
import useTranslator from '@hooks/useTranslator';

interface IDataArea {}

function DataArea({}: IDataArea) {
  const [
    classifiers,
    addClassifier,
    deleteClassifier,
    addClassifierVoiceUrls,
    updateClassifierLabel,
    deleteClassifierVoiceUrl,
    updateEditableVoiceUrl,
  ] = useMyModelVoiceClassifier((state) => [
    state.classifiers,
    state.addClassifier,
    state.deleteClassifier,
    state.addClassifierVoiceUrls,
    state.updateClassifierLabel,
    state.deleteClassifierVoiceUrl,
    state.updateEditableVoiceUrl,
  ]);
  const { t } = useTranslator();

  const isValidMinCountClassifiers = useMemo(() => {
    return classifiers.length > MIN_COUNT_CLASSIFIERS;
  }, [classifiers]);

  const onClickAdd = () => {
    addClassifier();
  };

  const onClickDelete = (targetUuid: string) => () => {
    if (!isValidMinCountClassifiers) return;

    deleteClassifier(targetUuid);
  };

  const addVoiceUrls = (targetUuid: string) => (voiceUrls: Array<string>) => {
    addClassifierVoiceUrls(targetUuid, voiceUrls);
  };

  const updateLabel = (targetUuid: string) => (label: string) => {
    updateClassifierLabel(targetUuid, label);
  };

  const deleteVoiceUrl = (targetUuid: string) => (itemIndex: number) => {
    deleteClassifierVoiceUrl(targetUuid, itemIndex);
  };

  const updateEditVoiceUrl = (targetUuid: string) => (voiceUrl: string) => {
    updateEditableVoiceUrl(targetUuid, voiceUrl);
  };

  const isMaxCountClassifiers = useMemo(() => {
    return classifiers.length >= 10;
  }, [classifiers]);

  return (
    <div className="w-[397px] shrink-0">
      <h2 className="p2-b mb-[20px]">{t('INPUT_DATA')}</h2>

      <div className="flex flex-col gap-[16px] mb-[30px]">
        {classifiers.map((classifier, index) => {
          return (
            <ClassifierCard
              key={classifier.uuid}
              classifierId={classifier.uuid}
              index={index}
              onClickDelete={onClickDelete(classifier.uuid)}
              dataset={classifier.dataset}
              addVoiceUrls={addVoiceUrls(classifier.uuid)}
              label={classifier.label}
              updateLabel={updateLabel(classifier.uuid)}
              deleteVoiceUrl={deleteVoiceUrl(classifier.uuid)}
              updateEditVoiceUrl={updateEditVoiceUrl(classifier.uuid)}
              editableVoiceUrl={classifier.editableVoiceUrl}
            />
          );
        })}
      </div>

      {!isMaxCountClassifiers && (
        <div className="flex-center">
          <Button
            onClick={onClickAdd}
            color="primary-line"
            isMini
            className="w-[140px]"
          >
            + {t('ADD_CLASS')}
          </Button>
        </div>
      )}
    </div>
  );
}

export default DataArea;
