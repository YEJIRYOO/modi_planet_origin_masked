import useTranslator from '@src/components/hooks/useTranslator';
import { useProfileStore } from '@src/store/zustand/user';

export default function WelcomeHeader() {
  const { t } = useTranslator();
  const profile = useProfileStore((state) => state.profile);

  if (!profile) return null;

  return (
    <h1 className="flex items-center h4-b text-font-main mb-[30px]">
      {t('WELCOME_MSG_NEW', { NICKNAME: profile.nickname || 'MODI' })}
      <img src="/assets/learning-space/emoji-hi.svg" />
    </h1>
  );
}
