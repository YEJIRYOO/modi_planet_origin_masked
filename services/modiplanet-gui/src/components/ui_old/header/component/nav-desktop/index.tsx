import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import useTranslator from '@hooks/useTranslator';
import useLinkValidation from '@hooks/useLinkValidation';
import { Badge } from '../badge';
import OnlyPCWarningModal from '@components/ui/common/Modal/OnlyPCWarningModal';

export function NavDesktop() {
  const { t } = useTranslator();
  const { onClickCodeEditor, onClickLearningSpace, warningModalProps } =
    useLinkValidation();
  const { pathname } = useLocation();

  const currentPath = pathname.split('/')[1] || '';
  return (
    <>
      <nav className="center flex-1 h-full flex items-center duration-200 tb:hidden mb:hidden box-border">
        <ul className="h-full flex items-center flex-1 p3-r sd:p4-r">
          <li className="mr-[24px] sd:mr-[12px] h-full flex items-center -mb-[1px] border-y-[3px] border-transparent relative z-[1000]">
            <span
              role="button"
              onClick={onClickCodeEditor}
              className="whitespace-nowrap"
            >
              {t('GNB_CODE_EDITOR')}
            </span>
          </li>

          <li className="mr-[24px] sd:mr-[12px] h-full flex items-center -mb-[1px] relative z-[1000]">
            <Badge className={undefined} />
            <span
              role="button"
              onClick={onClickLearningSpace}
              className={`whitespace-nowrap relative h-full flex-center ${
                currentPath === 'learning-space' && 'text-brand p3-r'
              }`}
            >
              {t('LEARNING_SPACE')}
              {currentPath === 'learning-space' && (
                <div className="left-0 right-0 h-[4px] bg-brand absolute bottom-0" />
              )}
            </span>
          </li>

          <li className="mr-[24px] sd:mr-[12px] h-full flex items-center -mb-[1px] relative z-[1000]">
            <Link
              to="/materials"
              className={`whitespace-nowrap relative h-full flex-center ${
                currentPath === 'materials' && 'text-brand p3-r'
              }`}
            >
              {t('EDU_RESOURCES')}

              {currentPath === 'materials' && (
                <div className="left-0 right-0 h-[4px] bg-brand absolute bottom-0" />
              )}
            </Link>
          </li>

          <li className="mr-[24px] sd:mr-[12px] h-full flex items-center -mb-[1px] relative z-[1000]">
            <Link
              to="/cs"
              className={`whitespace-nowrap relative h-full flex-center ${
                currentPath === 'cs' && 'text-brand p3-r'
              }`}
            >
              {t('NOTICE')}
              {currentPath === 'cs' && (
                <div className="left-0 right-0 h-[4px] bg-brand absolute bottom-0" />
              )}
            </Link>
          </li>
        </ul>
      </nav>
      <OnlyPCWarningModal {...warningModalProps} />
    </>
  );
}

export default NavDesktop;
