import TrainingContainer from '@src/pages/training/training-container';
import { useQs } from '@hooks/useQs';
import { useEffect } from 'react';
import Loading from '@components/ui_old/loading/loading';
import Button from '@components/ui_old/button/button';
import i18n from '@src/lib/i18n';
import useTranslator from '@hooks/useTranslator';
import { LocaleHandler } from '@lib/utils/locale';
import { useProfile } from '@services/api';
import { useProfileStore } from '@src/store/zustand';
import PostMessageSender from '@src/lib/utils/PostMessageSender';

function TrainingPage() {
  const {
    path: { locale },
  } = useQs();
  const { profile, loading, error } = useProfile();
  const setProfile = useProfileStore((state) => state.setProfile);

  const { t } = useTranslator();
  const postMessageSender = PostMessageSender.getInstance();

  useEffect(() => {
    if (locale) {
      LocaleHandler.applyLocale(i18n, locale);
      LocaleHandler.cleanLocaleFromUrl();
    }
  }, [locale]);

  useEffect(() => {
    if (profile) {
      setProfile({
        ...profile,
      });
    }
  }, [profile]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    const onClick = () => {
      postMessageSender.sendCloseTrainingPopup();
    };
    return (
      <div className="h-screen w-screen flex-center">
        <div className="flex-center flex-col">
          <p className="p3-m mb-[20px]">{t('COMMON_ERROR_MSG')}</p>
          <Button className="w-[150px]" onClick={onClick}>
            닫기
          </Button>
        </div>
      </div>
    );
  }

  return <TrainingContainer />;
}

export default TrainingPage;
