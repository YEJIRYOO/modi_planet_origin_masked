import React from 'react';
import { ArrowLeft, Close } from '@src/lib/newAssets';

interface TrainingDetailHeaderProps {
  title: string;
  onClickClose?: () => void;
  onClickBack?: () => void;
}

function TrainingDetailHeader({
  title,
  onClickClose,
  onClickBack,
}: TrainingDetailHeaderProps) {
  return (
    <header className="top-0 left-0 right-0 z-100">
      <div className="h-[64px] px-[20px] flex items-center m-0-auto max-w-[1920px] justify-between">
        <div className="flex items-center ">
          <div className="w-[40px] h-[40px] bg-brand rounded-full relative top-[1px] mr-[20px]">
            <button
              onClick={onClickBack}
              className=" w-[40px] h-[40px] rounded-full border-brand border flex-center bg-brand_4 relative -top-[1px]"
            >
              <ArrowLeft className="w-[24px] h-[24px] [&_path]:fill-brand" />
            </button>
          </div>
          <h1 className="h4-b">{title}</h1>
        </div>

        <button
          onClick={onClickClose}
          className=" w-[40px] h-[40px] rounded-full border-form-border border flex-center bg-white "
        >
          <Close className="w-[18px] h-[18px] [&_path]:fill-black" />
        </button>
      </div>
    </header>
  );
}

export default TrainingDetailHeader;
