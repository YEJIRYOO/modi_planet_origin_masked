import React, { ChangeEvent, useState } from 'react';
import moment from 'moment/moment';
import { useTranslation } from 'react-i18next';
import CheckboxUI from '@components/ui/Checkbox/CheckboxUI';
import { storeDoNotShowPopupV3Timestamp } from '@src/lib/utils/utils';
interface IPopupControl {
  onClose: () => void;
}

function PopupControl({ onClose }: IPopupControl) {
  const { t } = useTranslation();
  const [isCheck, setIsCheck] = useState(false);

  const onClickCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setIsCheck(e.target.checked);
  };

  const onClickClose = () => {
    if (isCheck) {
      storeDoNotShowPopupV3Timestamp(moment().utc().format());
    }
    onClose();
  };

  return (
    <div className="font-regular text-[clamp(14px,2vh,18px)] tb:text-[13.5px] mb:text-[13.5px] bg-white flex items-center justify-between h-[clamp(34px,8vh,72px)] tb:h-[48px] mb:h-[48px] px-[clamp(8px,3vh,24px)] tb:px-[12px] mb:px-[12px]">
      <div>
        <label className="flex items-center gap-1" role="button">
          <CheckboxUI id="do-not-show-popup-v3" onChange={onClickCheck} />
          {t('DO_NOT_OPEN_A_DAY')}
        </label>
      </div>
      <div className="" role="button" onClick={onClickClose}>
        {t('CLOSE')}
      </div>
    </div>
  );
}

export default PopupControl;
