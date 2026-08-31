import React from 'react';
import {
  Close,
  ButtonModule,
  DialModule,
  EnvironmentModule,
  IMUModule,
  JoystickModule,
  TofModule,
} from '@src/lib/newAssets';
import ChartImage from './ChartImage';
import { ModiRecordedData } from '@src/lib/types/modi-data';

interface IThumbnailImage {
  data: ModiRecordedData;
  isGridView: boolean;
  deleteImageUrl: () => void;
}

function ThumbnailImage({ data, isGridView, deleteImageUrl }: IThumbnailImage) {

  const moduleIcons = {
    BUTTON: ButtonModule,
    DIAL: DialModule,
    ENVIRONMENT: EnvironmentModule,
    IMU: IMUModule,
    JOYSTICK: JoystickModule,
    TOF: TofModule,
  };
  const ModuleIcon = data ? moduleIcons[data.name] : null;

  const onClickDelete = (e) => {
    e.stopPropagation();
    deleteImageUrl();
  };

  return (
    <div
      className={`w-[70px] h-[70px] relative flex-[0_0_auto] ${
        isGridView ? 'mr-[28px]' : ''
      }`}
    >
      <div className="w-[70px] h-[70px] rounded-16 flex items-center justify-center bg-white relative border border-form-border">
        {data ? (
          <ChartImage cardData={data} width={70} height={35} />
        ) : (
          <div>Loading...</div>
        )}
        {ModuleIcon && (
          <div className="absolute top-2 left-2 z-10">
            <ModuleIcon className="w-[24px] h-[24px]" />
          </div>
        )}
      </div>

      {isGridView && (
        <button
          onClick={onClickDelete}
          className="absolute -top-[7px] -right-[11px] w-[24px] h-[24px] rounded-full border flex-center bg-white"
        >
          <Close className="w-[15px] h-[15px] [&_path]:stroke-black" />
        </button>
      )}
    </div>
  );
}

export default ThumbnailImage;
