import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'react-feather';

import SubButton from '@components/ui_old/button/sub-button';
import { CursorInfo } from '@services/old/generated/graphql';
import useTranslator from '@hooks/useTranslator';

export interface ICursorPath {
  beforeAfterPath: string;
  listPath: string;
}

interface IButtonSection {
  cursorPath: ICursorPath;
  cursorInfo: CursorInfo;
}

export function CursorButtonSection({
  cursorInfo: { before, after },
  cursorPath: { beforeAfterPath, listPath },
}: IButtonSection) {
  const navigate = useNavigate();
  const { t } = useTranslator();
  const onPrevNextClick = (id: string | null | undefined) => {
    if (!id) {
      return;
    }
    return () => {
      navigate(`${beforeAfterPath}/${id}`);
    };
  };

  const onListClick = () => {
    navigate(listPath);
  };

  return (
    <Fragment>
      <div
        className="flex items-center absolute top-0 left-0 bottom-0"
        role={before ? 'button' : 'none'}
        onClick={onPrevNextClick(before)}
      >
        <ChevronLeft size="20" className="inline mr-3 sm:mr-0" />
        <p>{t('PRE_CONTENT')}</p>
      </div>

      <SubButton
        type="red"
        onClick={onListClick}
        className="p-[15px_25px] sm:w-[70px] sm:h-[40px] sm:text-14 !w-auto"
      >
        {t('CONTENT_LIST')}
      </SubButton>

      <div
        className="flex items-center absolute top-0 right-0 bottom-0"
        role={after ? 'button' : 'none'}
        onClick={onPrevNextClick(after)}
      >
        <p className="whitespace-nowrap">{t('NEXT_CONTENT')}</p>
        <ChevronRight size="20" className="inline ml-3 sm:ml-0" />
      </div>
    </Fragment>
  );
}

export default CursorButtonSection;
