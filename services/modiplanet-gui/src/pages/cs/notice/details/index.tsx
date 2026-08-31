import { useEffect, useMemo } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { i18n } from 'i18next';

import { useNoticeLazyQuery, LanguageType } from '@src/services/gen/gen';
import BoardTitleSection from '@components/ui_old/board/board-title-section';
import FilesSection from '@components/ui_old/board/files-section';
import CursorButtonSection, {
  ICursorPath,
} from '@components/ui_old/board/cursor-button-section';
import { useParams } from 'react-router-dom';
import EditorContent from '@components/ui_old/editor/editor-content';
import useTranslator from '@hooks/useTranslator';

function useBoardNotice(i18n: i18n) {
  const { id } = useParams();
  const [noticeQuery, { data, loading, error }] = useNoticeLazyQuery({
    variables: {
      input: {
        id: id as string,
        language: (i18n.language.toUpperCase() === 'ES'
          ? 'EN'
          : i18n.language.toUpperCase()) as LanguageType,
      },
    },
    fetchPolicy: 'no-cache',
  });

  const notice = useMemo(() => {
    if (!data) {
      return null;
    }
    return data.notice;
  }, [data]);

  useEffect(() => {
    noticeQuery();
  }, [i18n.language]);

  return { notice, loading, error };
}

export default function NoticeDetailsPage() {
  const { t, i18n } = useTranslator();

  const { notice, loading, error } = useBoardNotice(i18n);

  if (loading || !notice) {
    return null;
  }

  if (error) {
    alert(error.message);
  }

  const { title, createdAt, viewCount, attachments, content, cursorInfo } =
    notice;

  const cursorPath: ICursorPath = {
    beforeAfterPath: '/cs/notice',
    listPath: '/cs',
  };

  return (
    <div className="bg-form-bg sm:pt-[40px]">
      <div className="container pt-[90px] pb-[120px] sm:pt-0 sm:pb-10">
        {/* 타이틀 */}
        <div className="mb-[30px]">
          <p className="text-20 text-black-6 leading-[1] font-[400] mb-5 sm:text-16 sm:mb-[10px]">
            {t('GNB_ANNOUNCE')}
          </p>

          <BoardTitleSection
            title={title}
            createdAt={createdAt}
            viewCount={viewCount}
          />
        </div>

        {/* 컨텐츠 , 파일 */}
        <div className="bg-white rounded-20 p-10 sm:p-[15px] sm:text-14">
          <div className="mb-10 min-height-[600px]">
            <div className="mb-4">
              {attachments && attachments.length > 0 && (
                <FilesSection files={attachments} />
              )}
            </div>
            <EditorContent>{ReactHtmlParser(content)}</EditorContent>
          </div>
        </div>

        {/* 페이지 이동 버튼 */}
        <div className="flex justify-center items-center relative mt-10 text-font-sub_2 sm:text-14">
          <CursorButtonSection
            cursorInfo={cursorInfo}
            cursorPath={cursorPath}
          />
        </div>
      </div>
    </div>
  );
}
