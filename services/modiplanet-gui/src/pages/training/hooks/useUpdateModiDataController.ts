import { useUpdateModiDataMutation } from '@services/gen/gen';
import { ApolloError } from '@apollo/client';
import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { Errorhandler } from '@lib/utils/error';
import useTranslator from '@hooks/useTranslator';

export const useUpdateModiDataController = () => {
  const [mutation, { loading }] = useUpdateModiDataMutation();
  const { t } = useTranslator();
  const [nameErrorMsg, setNameErrorMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const resetErrorMsg = () => {
    setNameErrorMsg('');
    setErrorMsg('');
  };

  const onSubmit = useCallback(
    debounce(
      (input: {
        id: string;
        name: string;
        onCompleted?: () => void;
        onError?: (msg: string) => void;
      }) => {
        updateModiData({
          ...input,
          onCompleted: () => onCompletedUpdateModiData(input.onCompleted),
          onError: (error) => {
            const msg = onErrorUpdateModiData(error);
            input.onError && input.onError(msg);
          },
        });
      },
      300,
    ),
    [],
  );

  const updateModiData = async ({
    id,
    name,
    onCompleted,
    onError,
  }: {
    id: string;
    name: string;
    onCompleted?: (model: any) => void;
    onError?: (err: ApolloError) => void;
  }) => {
    if (!name.endsWith('.modi')) {
      name += '.modi';
    }

    await mutation({
      variables: {
        input: {
          id,
          name,
        },
      },
      onCompleted: (data) => {
        onCompleted && onCompleted(data);
      },
      onError,
    });
  };

  const onCompletedUpdateModiData = (onCompleted?: () => void) => {
    if (onCompleted) {
      onCompleted();
    }
  };

  const onErrorUpdateModiData = (error: ApolloError) => {
    const handler = new Errorhandler(error);
    const codes = handler.getCodes();
    let msg = t('COMMON_ERROR_MSG');

    switch (codes[0]) {
      case 409: {
        msg = t('ALREADY_USED_NAME');
        setNameErrorMsg(msg);
        break;
      }
      default: {
        setErrorMsg(t('COMMON_ERROR_MSG'));
        break;
      }
    }

    return msg;
  };

  return { onSubmit, nameErrorMsg, errorMsg, loading, resetErrorMsg, setNameErrorMsg };
};
