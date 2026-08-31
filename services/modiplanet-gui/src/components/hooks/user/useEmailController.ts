import { useEmailCodeSend } from '@services/api/user/useEmailCodeSend';
import { AuthType } from '@services/gen/gen';
import { ApolloError } from '@apollo/client';
import { useEmailCodeConfirm } from '@services/api/user/useEmailCodeVerification';
import { Errorhandler } from '@lib/utils/error';
import useTranslator from '@hooks/useTranslator';

export const useEmailController = () => {
  const { sendEmail } = useEmailCodeSend();
  const { confirmCode } = useEmailCodeConfirm();
  const { t } = useTranslator();

  const onSendEmail = async ({
    email,
    authType,
    onError,
    onCompleted,
  }: {
    email: string;
    authType: AuthType;
    onCompleted?: (model: any) => void;
    onError?: (msg: string, code?: number) => void;
  }) => {
    await sendEmail({
      authType: authType,
      email: email,
      onCompleted: (res) => {
        onCompleted && onCompleted(res);
      },
      onError: (err) => {
        const { msg, code } = getErrorMsgWithCode(err);
        onError && onError(msg, code);
      },
    });
  };

  const onConfirmCode = async ({
    email,
    authType,
    authCode,
    onCompleted,
    onError,
  }: {
    email: string;
    authType: AuthType;
    authCode: string;
    onCompleted?: (model: any) => void;
    onError?: (msg: string, code?: number) => void;
  }) => {
    await confirmCode({
      email,
      authType,
      authCode,
      onCompleted: (res) => {
        onCompleted && onCompleted(res);
      },
      onError: (err) => {
        const { msg, code } = getErrorMsgWithCode(err);
        onError && onError(msg, code);
      },
    });
  };

  const getErrorMsgWithCode = (err: ApolloError) => {
    const handle = new Errorhandler(err);
    const codes = handle.getCodes();
    const code = codes[0];

    let msg: string;
    switch (code) {
      case 10000: {
        msg = t('ALRAEDY_MEMBER');
        break;
      }
      case 10001: {
        msg = t('NOT_REGISTED_EMAIL');
        break;
      }
      case 10002: {
        msg = t('INVALID_EMIAL');
        break;
      }
      case 10004: {
        msg = t('NO_MATCHING_CODE');
        break;
      }
      case 10014: {
        msg = t('SIGNED_WITH_SNS');
        break;
      }
      case 10017: {
        msg = t('UNCHANGEABLE_PASSWORD_ACCOUNT');
        break;
      }
      default: {
        msg = t('COMMON_ERROR_MSG');
        break;
      }
    }

    return { msg, code };
  };

  return {
    onSendEmail,
    onConfirmCode,
  };
};
