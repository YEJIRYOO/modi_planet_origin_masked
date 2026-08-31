import React from 'react';
import { Close } from '@src/lib/newAssets';
import TooltipUI from '@src/components/ui/Tooltip/TooltipUI';
import useTranslator from '@src/components/hooks/useTranslator';

interface TrainingHomeHeaderProps {
  title: string;
  onClickClose?: () => void;
}

function TrainingHomeHeader({ title, onClickClose }: TrainingHomeHeaderProps) {
  const { t } = useTranslator();
  return (
    <header className="top-0 left-0 right-0 z-100">
      <div className="h-[64px] px-[20px] flex items-center m-0-auto max-w-[1920px] justify-between">
        <div className="flex items-center gap-2">
          <h1 className="h4-b">{title}</h1>
          <TooltipUI
            showArrow={true}
            placement="top-start"
            crossOffset={-9}
            closeDelay={0}
            content={
              <div className="px-1 py-2">
                <p className="p6-sb text-font-sub">
                  {t('DATA_DELETION_WARNING')}
                </p>
              </div>
            }
          >
            <div className="w-[14px] h-[14px] relative group cursor-pointer">
              <img
                src="/assets/mypage/info.svg"
                alt="info"
                className="w-[14px] h-[14px] absolute group-hover:hidden"
              />
              <img
                src="/assets/mypage/info-active.svg"
                alt="info active"
                className="w-[14px] h-[14px] absolute hidden group-hover:block"
              />
            </div>
          </TooltipUI>
        </div>

        <button
          onClick={onClickClose}
          className=" w-[40px] h-[40px] rounded-full border-form-border border flex-center bg-white"
        >
          <Close className="w-[18px] h-[18px] [&_path]:fill-black" />
        </button>
      </div>
    </header>
  );
}

export default TrainingHomeHeader;
