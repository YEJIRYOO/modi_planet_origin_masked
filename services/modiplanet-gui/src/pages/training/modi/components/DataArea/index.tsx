import ClassifierCard from '@src/pages/training/modi/components/ClassfierCard';
import Button from '@components/ui_old/button/button';
import { useMyModelModiClassifier } from '@src/store/zustand';
import { useMemo } from 'react';
import { MIN_COUNT_CLASSIFIERS } from '@src/lib/constants/etc';
import useTranslator from '@hooks/useTranslator';
import { ModiRecordedData } from '@src/lib/types/modi-data';

interface DataArea {
  isDimmed: boolean;
}

function DataArea({ isDimmed }: DataArea) {
  const [
    classifiers,
    addClassifier,
    deleteClassifier,
    addClassifierModiData,
    updateClassifierLabel,
    deleteClassifierModiUrl,
  ] = useMyModelModiClassifier((state) => [
    state.classifiers,
    state.addClassifier,
    state.deleteClassifier,
    state.addClassifierModiData,
    state.updateClassifierLabel,
    state.deleteClassifierModiUrl,
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

  const addModiData = (targetUuid: string) => (modiData: Array<ModiRecordedData>) => {
    addClassifierModiData(targetUuid, modiData);
  };

  const updateLabel = (targetUuid: string) => (label: string) => {
    updateClassifierLabel(targetUuid, label);
  };

  const deleteModiUrl = (targetUuid: string) => (itemIndex: number) => {
    deleteClassifierModiUrl(targetUuid, itemIndex);
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
              uuid={classifier.uuid}
              index={index}
              onClickDelete={onClickDelete(classifier.uuid)}
              dataset={classifier.dataset}
              addModiData={addModiData(classifier.uuid)}
              label={classifier.label}
              updateLabel={updateLabel(classifier.uuid)}
              deleteModiUrl={deleteModiUrl(classifier.uuid)}
              isDimmed={isDimmed}
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
