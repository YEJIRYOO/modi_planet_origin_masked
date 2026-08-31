import ClassifierCard from '@src/pages/training/image/components/classfier-card';
import Button from '@components/ui_old/button/button';
import { useMyModelImageClassifier } from '@src/store/zustand';
import { useMemo } from 'react';
import { MIN_COUNT_CLASSIFIERS } from '@src/lib/constants/etc';
import useTranslator from '@hooks/useTranslator';

interface IDataArea {}

function DataArea({}: IDataArea) {
  const [
    classifiers,
    addClassifier,
    deleteClassifier,
    addClassifierImgUrls,
    updateClassifierLabel,
    deleteClassifierImgUrl,
  ] = useMyModelImageClassifier((state) => [
    state.classifiers,
    state.addClassifier,
    state.deleteClassifier,
    state.addClassifierImgUrls,
    state.updateClassifierLabel,
    state.deleteClassifierImgUrl,
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

  const addImageUrls = (targetUuid: string) => (imgUrls: Array<string>) => {
    addClassifierImgUrls(targetUuid, imgUrls);
  };

  const updateLabel = (targetUuid: string) => (label: string) => {
    updateClassifierLabel(targetUuid, label);
  };

  const deleteImageUrl = (targetUuid: string) => (itemIndex: number) => {
    deleteClassifierImgUrl(targetUuid, itemIndex);
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
              index={index}
              onClickDelete={onClickDelete(classifier.uuid)}
              dataset={classifier.dataset}
              addImageUrls={addImageUrls(classifier.uuid)}
              label={classifier.label}
              updateLabel={updateLabel(classifier.uuid)}
              deleteImageUrl={deleteImageUrl(classifier.uuid)}
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
