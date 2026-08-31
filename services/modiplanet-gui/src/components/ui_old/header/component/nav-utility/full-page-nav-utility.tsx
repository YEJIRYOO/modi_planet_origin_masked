import { useMatch } from 'react-router-dom';
import Profile from '@components/ui_old/header/component/profile';
import LangSelect from '@components/ui_old/header/component/lang-select';
import useTranslator from '@hooks/useTranslator';

//새로운 페이지(e.g. 학습공간)에서의 header nav utility
export function FullPageNavUtility() {
  const { t } = useTranslator();
  const isCourseDetailPage = useMatch(
    '/course-group/:courseGroupId/course/:courseId',
  );

  return (
    <div className="flex justify-end items-center gap-[30px]">
      {!isCourseDetailPage && (
        <LangSelect
          confirmBeforeChange={{
            message: t('CHANGE_LANG_MSG'),
            okLabel: t('YES'),
            cancelLabel: t('NO'),
          }}
        />
      )}
      <Profile redirectUrlOnSignOut="/learning-space" />
    </div>
  );
}

export default FullPageNavUtility;
