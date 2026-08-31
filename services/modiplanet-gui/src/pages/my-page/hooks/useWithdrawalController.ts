import { useCallback, useState } from 'react';
import { useWithdrawal } from '@services/api/user/useWithdrawal';
import debounce from 'lodash/debounce';
import { ApolloError } from '@apollo/client';
import { Errorhandler } from '@lib/utils/error';
import useTranslator from '@hooks/useTranslator';

export const useWithdrawalController = () => {
  const { withdrawal } = useWithdrawal();
  const { t } = useTranslator();
  const [errorMsg, setErrorMsg] = useState('');

  const onWithdrawal = useCallback(
    debounce(
      async ({
        password,
        reason,
        onCompleted,
        onError,
      }: {
        password?: string;
        reason: string[];
        onCompleted?: () => void;
        onError?: (err: ApolloError) => void;
      }) => {
        await withdrawal({
          password,
          reason,
          onCompleted: () => {
            onCompleted && onCompleted();
          },
          onError: (err) => {
            onError && onError(err);
            onErrorWithdrawal(err);
          },
        });
      },
      300,
    ),
    [],
  );

  const onErrorWithdrawal = (error: ApolloError) => {
    const handler = new Errorhandler(error);

    const codes = handler.getCodes();
    switch (codes[0]) {
      case 10007: {
        setErrorMsg(t('NO_MATCHING_PW'));
        break;
      }
      default: {
        setErrorMsg(t('COMMON_ERROR_MSG'));
        break;
      }
    }
  };

  const onClearErrorMsg = () => {
    setErrorMsg('');
  };

  return { errorMsg, onWithdrawal, onClearErrorMsg };
};
