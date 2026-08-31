import { useMemo } from 'react';
import BoardItem from '@components/ui_old/board/board-item';
import { useNavigate } from 'react-router-dom';

import { NoticeConnectionQuery } from '@services/gen/gen';
import BoardMessage from '@components/ui_old/board/board-message';
import SpinnerLoader from '@components/ui_old/loading/spinner-loader';
import useTranslator from '@hooks/useTranslator';

interface INoticeComponent {
  dataList: NoticeConnectionQuery['noticeConnection']['nodes'] | null;
  pageNumber: number;
  first: number;
  totalCount: number;
  isLoading: boolean;
  isError: any;
}

export function NoticeComponent({
  pageNumber,
  first,
  dataList,
  totalCount,
  isError,
  isLoading,
}: INoticeComponent) {
  const navigate = useNavigate();
  const { t } = useTranslator();

  const onNoticeClick = (id: string) => {
    navigate(`/cs/notice/${id}`);
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
    return <BoardMessage text={t('NO_NOTICE')} />;
  }

  return (
    <div className="mb-[70px] min-h-[300px]">
      {dataList && dataList.length > 0 ? (
        dataList.map(({ id, title, content, createdAt, isNew }, index) => (
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
        ))
      ) : (
        <BoardMessage text={t('NO_NOTICE')} />
      )}
    </div>
  );
}

export default NoticeComponent;
