import React from 'react';
import useTranslator from '@hooks/useTranslator';
import { useNavigate, useParams } from 'react-router-dom';
import { useLibrary } from '@src/pages/materials/hooks/useLibrary';
import CursorButtonSection, {
  ICursorPath,
} from '@components/ui_old/board/cursor-button-section';
import BoardTitleSection from '@components/ui_old/board/board-title-section';
import FilesSection from '@components/ui_old/board/files-section';
import EditorContent from '@components/ui_old/editor/editor-content';
import ReactHtmlParser from 'react-html-parser';
import { useProfileStore } from '@src/store/zustand';

interface IMaterialDetailsContainer {}

function MaterialDetailsContainer({}: IMaterialDetailsContainer) {
  const { t, i18n } = useTranslator();
  const { id } = useParams();
  const { library, loading, error } = useLibrary(id || '', i18n);
  const clearProfile = useProfileStore((state) => state.clearProfile);
  const navigate = useNavigate();

  if (error) {
    alert(t('COMMON_ERROR_MSG'));
    clearProfile();
    navigate('/');
  }

  if (loading || !library) {
    return null;
  }

  const { title, createdAt, viewCount, attachments, content, cursorInfo } =
    library;

  const cursorPath: ICursorPath = {
    beforeAfterPath: '/materials',
    listPath: '/materials',
  };

  return (
    <div className="bg-form-bg sm:pt-[40px]">
      <div className="container pt-[90px] pb-[120px] sm:pt-0 sm:pb-10">
        {/* 타이틀 */}
        <div className="mb-[40px]">
          <p className="text-20 text-black-6 leading-[1] font-[400] mb-5 sm:text-16 sm:mb-[10px]">
            {t('EDU_RESOURCES')}
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

export default MaterialDetailsContainer;
