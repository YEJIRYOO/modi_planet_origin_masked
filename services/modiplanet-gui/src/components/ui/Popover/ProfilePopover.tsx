import { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import { DEFAULT_PROFILE_IMAGE } from '@lib/constants/etc';
import { useNavigate } from 'react-router-dom';
import useTranslator from '@hooks/useTranslator';
import { useUser } from '@services/api';
import { useProfileStore } from '@src/store/zustand';
import { useSignOutController } from '@src/components/hooks/user/useSignOutController';
import { RoleTypeEnum } from '@src/services/client-model/user';

interface ProfilePopoverProps {
  name: string;
  thumbnail: string;
  redirectUrlOnSignOut?: string;
}

export default function ProfilePopover({
  name,
  thumbnail,
  redirectUrlOnSignOut = '/',
}: ProfilePopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslator();
  const { onSignOut } = useSignOutController();
  const { user } = useUser();
  const isGuest = user?.roleType === RoleTypeEnum.GUEST;

  const onClickMypage = () => {
    navigate('/my-page');
    setIsOpen(false);
  };

  const onCompletedSignout = () => {
    setIsOpen(false);
    navigate(redirectUrlOnSignOut);
  };

  const onClickSignout = async () => {
    try {
      await onSignOut({
        onCompleted: onCompletedSignout,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const onClickHelp = async () => {
    navigate('/cs');
    setIsOpen(false);
  };

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
      placement="bottom-end"
      triggerScaleOnOpen={false}
      classNames={{
        content: 'p-0',
      }}
    >
      <PopoverTrigger>
        <div className="w-[27px] h-[27px] rounded-full cursor-pointer">
          <img
            className="w-full h-full align-top rounded-full object-cover"
            src={thumbnail ? `${thumbnail}` : DEFAULT_PROFILE_IMAGE}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="min-w-[230px]">
          <div className="flex flex-col items-center pt-[24px] px-[19px]">
            <div className="w-[88px] h-[88px] rounded-full mb-[10px]">
              <img
                className="w-full h-full align-top rounded-full object-cover"
                src={thumbnail ? `${thumbnail}` : DEFAULT_PROFILE_IMAGE}
              />
            </div>

            <p className="p3-b text-center mb-[30px]">{name}</p>
          </div>
          <div className="flex justify-center">
            <div
              className="w-[170px] flex justify-between items-center px-5 mb-10 cursor-pointer"
              role="button"
              onClick={onClickMypage}
            >
              <span className="p6-m text-font-main">{t('MY_PAGE')}</span>
              <span>&gt;</span>
            </div>
          </div>
          <hr />
          <div className="pt-4 pb-5 px-5 p6-m flex justify-between items-center gap-[16px] p4-r text-font-non">
            <span role="button" onClick={onClickSignout}>
              {t('SIGN_OUT')}
            </span>
            <span role="button" onClick={onClickHelp}>
              {t('GNB_HELP')}
            </span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
