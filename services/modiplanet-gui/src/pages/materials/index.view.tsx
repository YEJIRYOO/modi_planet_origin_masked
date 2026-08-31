import React, { useMemo } from 'react';
import BoardItem from '@components/ui_old/board/board-item';
import { useNavigate } from 'react-router-dom';

import { TBoardDataConnection } from '@services/old/schema/types';
import BoardMessage from '@components/ui_old/board/board-message';
import SpinnerLoader from '@components/ui_old/loading/spinner-loader';
import useTranslator from '@hooks/useTranslator';
import { useProfileStore } from '@src/store/zustand';
import { LibraryNode } from '@src/services/gen/gen';
import { useDisclosure } from '@nextui-org/react';
import LoginAlertModal from '@components/ui/common/Modal/LoginAlertModal';

interface INoticeComponent {
  dataList: LibraryNode[] | null;
  pageNumber: number;
  first: number;
  totalCount: number;
  isLoading: boolean;
  isError: any;
}

export function MaterialsComponent({
  pageNumber,
  first,
  dataList,
  totalCount,
  isError,
  isLoading,
}: INoticeComponent) {
  const navigate = useNavigate();
  const { t } = useTranslator();

  const {
    isOpen: isLoginAlertOpen,
    onOpen: onLoginAlertOpen,
    onClose: onLoginAlertClose,
  } = useDisclosure();
  const profile = useProfileStore((state) => state.profile);

  const handleLoginAlertConfirm = () => {
    onLoginAlertClose();
    navigate('/signin');
  };

  const onNoticeClick = (id: string) => {
    if (profile) {
      navigate(`/materials/${id}`);
    } else {
      onLoginAlertOpen();
    }
  };

  const itemIndex = useMemo((): number => {
    if (!dataList) return 0;
    return totalCount - first * pageNumber;
  }, [dataList, totalCount, first, pageNumber]);

  if (isLoading) {
    return (
      <div className="relative w-full h-[300px] flex-center">
        <SpinnerLoader className="w-[100px] h-[100px]" />
      </div>
    );
  }

  if (isError) {
    return <BoardMessage text={t('NO_MATERIALS')} />;
  }

  return (
    <>
      <div className="mb-[70px] min-h-[300px]">
        {dataList &&
          dataList.length > 0 &&
          dataList.map((data, index) => {
            if (!data) return null;
            const { id, title, content, createdAt, isNew } = data;
            return (
              <BoardItem
                id={id}
                key={index}
                title={title}
                createdAt={createdAt}
                isNew={isNew}
                pageNumber={pageNumber}
                first={first}
                itemIndex={itemIndex - index}
                onClick={onNoticeClick}
              />
            );
          })}

        {dataList && dataList.length === 0 && (
          <BoardMessage text={t('NO_MATERIALS')} />
        )}
      </div>
      <LoginAlertModal
        isOpen={isLoginAlertOpen}
        onClose={onLoginAlertClose}
        onConfirm={handleLoginAlertConfirm}
      />
    </>
  );
}

export default MaterialsComponent;
