import React, { useEffect, useMemo, useRef } from 'react';
import { useDisclosure } from '@nextui-org/react';
import OnlyPCWarningModal from '@components/ui/common/Modal/OnlyPCWarningModal';
import { isDesktop } from 'react-device-detect';
import { MOCKLY_URL } from '@src/lib/constants/urls';
import {
  MODI_DATA_RECORD_REQUEST,
  RELOAD_REQUEST,
  SIGN_OUT,
  VERIFY_SIGN_IN,
  PARENT_SET_LOCALE,
  PARENT_RELOAD_PATH,
} from '@src/lib/constants/etc';
import { useFirebaseEvent } from '@components/provider/firebase-provider';
import { useQs } from '@hooks/useQs';
import { LocaleHandler } from '@lib/utils/locale';
import { useProfileLazy } from '@services/api';
import { ProfileModel } from '@services/client-model/user';
import { useSignOutController } from '@hooks/user/useSignOutController';
import PostMessageSender from '@src/lib/utils/PostMessageSender';
import PostMessageReceiver from '@src/lib/utils/PostMessageReceiver';
import { useSessionOnetimeCode } from '@src/services/api/user/useSessionOnetimeCode';
import { ELangType } from '@src/lib/constants/enums';
import i18n from '@src/lib/i18n';
import { storeLangType } from '@src/lib/utils/utils';

function CodeEditorPage() {
  const iframeRef = useRef<null | HTMLIFrameElement>(null);
  const {
    path: { locale, projectId, mode },
  } = useQs();

  const mocklyURL = useMemo(() => {
    const params = new URLSearchParams();
    params.append('locale', LocaleHandler.getLocale(locale || ''));
    if (projectId) params.append('projectId', projectId);
    if (mode) params.append('mode', mode);

    return `${MOCKLY_URL}?${params.toString()}`;
  }, [locale, projectId, mode]);

  const postMessageSender = PostMessageSender.getInstance();
  const postMessageReceiver = PostMessageReceiver.getInstance();
  const { viewCodeEditorPageLog } = useFirebaseEvent();
  const { onSignOut } = useSignOutController();
  const {
    isOpen: isWarningOpen,
    onOpen: onWarningOpen,
    onClose: onWarningClose,
  } = useDisclosure();

  const { getProfile } = useProfileLazy();
  const { sessionOnetimeCode } = useSessionOnetimeCode();

  useEffect(() => {
    viewCodeEditorPageLog();
  }, []);

  useEffect(() => {
    checkDevice();

    function checkDevice() {
      if (!isDesktop) {
        onWarningOpen();
      }
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e: Event) => {
      e.returnValue = true;
      e.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const onVerifySignInCb = async () => {
      await getProfile({
        onCompleted: onSessionCode,
      });
    };

    const onSessionCode = async (profile: ProfileModel) => {
      await sessionOnetimeCode({
        onCompleted: (data: any) => {
          const code = data?.sessionOnetimeCode?.code;
          onCompletedGetProfile(profile, code);
        },
        onError: (error) => {
          console.error('세션 코드 쿼리 실패:', error);
        },
      });
    };

    const onSignOutCb = async () => {
      await onSignOut({});
    };

    const handleVerifySignIn = () => {
      onVerifySignInCb();
    };

    const handleReloadRequest = () => {
      window.location.reload();
    };

    const handleSignOut = () => {
      onSignOutCb();
    };

    const handleModiDataRecordRequest = () => {
      console.log('record start');
    };

    const handleParentSetLocale = (data: any) => {
      try {
        const { locale, projectId, mode } = data;

        const url = new URL(window.location.href);
        url.search = '';

        // locale 처리
        if (locale) {
          let langType: ELangType;
          switch (locale.toLowerCase()) {
            case 'ko':
            case 'kr':
              langType = ELangType.KO;
              break;
            case 'en':
              langType = ELangType.EN;
              break;
            case 'es':
              langType = ELangType.ES;
              break;
            case 'pl':
              langType = ELangType.PL;
              break;
            default:
              console.error(`Unknown locale: ${locale}`);
              langType = ELangType.EN;
          }

          url.searchParams.set('locale', langType);
          i18n.changeLanguage(langType);
          storeLangType(langType);
        }

        // projectId 처리
        if (projectId) {
          url.searchParams.set('projectId', projectId);
        }

        // mode 처리
        if (mode) {
          url.searchParams.set('mode', mode);
        }

        window.history.replaceState({}, '', url.toString());
      } catch (error) {
        console.error('Error handling PARENT_SET_LOCALE:', error);
      }
    };

    const handleParentReloadPath = (data: any) => {
      try {
        const { path, locale } = data;

        if (!path) {
          return;
        }

        // locale이 제공된 경우 로컬 상태에만 저장
        if (locale) {
          let langType: ELangType;
          switch (locale.toLowerCase()) {
            case 'ko':
            case 'kr':
              langType = ELangType.KO;
              break;
            case 'en':
              langType = ELangType.EN;
              break;
            case 'es':
              langType = ELangType.ES;
              break;
            case 'pl':
              langType = ELangType.PL;
              break;
            default:
              console.error(`Unknown locale: ${locale}`);
              langType = ELangType.EN;
          }

          // localStorage에만 저장
          storeLangType(langType);
        }

        // path로 이동 (새로고침)
        window.location.href = path;
      } catch (error) {
        console.error('Error handling PARENT_RELOAD_PATH:', error);
      }
    };

    postMessageReceiver.on(VERIFY_SIGN_IN, handleVerifySignIn);
    postMessageReceiver.on(RELOAD_REQUEST, handleReloadRequest);
    postMessageReceiver.on(SIGN_OUT, handleSignOut);
    postMessageReceiver.on(
      MODI_DATA_RECORD_REQUEST,
      handleModiDataRecordRequest,
    );
    postMessageReceiver.on(PARENT_SET_LOCALE, handleParentSetLocale);
    postMessageReceiver.on(PARENT_RELOAD_PATH, handleParentReloadPath);
    postMessageReceiver.init();

    return () => {
      postMessageReceiver.dispose();
      postMessageReceiver.off(VERIFY_SIGN_IN, handleVerifySignIn);
      postMessageReceiver.off(RELOAD_REQUEST, handleReloadRequest);
      postMessageReceiver.off(SIGN_OUT, handleSignOut);
      postMessageReceiver.off(
        MODI_DATA_RECORD_REQUEST,
        handleModiDataRecordRequest,
      );
      postMessageReceiver.off(PARENT_SET_LOCALE, handleParentSetLocale);
      postMessageReceiver.off(PARENT_RELOAD_PATH, handleParentReloadPath);
    };
  }, []);

  const onCompletedGetProfile = (profile: ProfileModel, code?: string) => {
    if (!iframeRef.current || !iframeRef.current.contentWindow) return;

    postMessageSender.sendProfile({
      profile: profile,
      code: code,
      targetWindow: iframeRef.current.contentWindow,
    });
  };

  return (
    <>
      <div className="h-screen">
        <iframe
          ref={iframeRef}
          src={mocklyURL}
          width="100%"
          height="100%"
          allow="serial; usb; bluetooth *; camera *;microphone *"
        />
      </div>
      <OnlyPCWarningModal
        isOpen={isWarningOpen}
        onClose={() => {
          window.close();
          onWarningClose();
        }}
      />
    </>
  );
}

export default CodeEditorPage;
