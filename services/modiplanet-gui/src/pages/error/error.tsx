import React, { useMemo } from 'react';

import Warning from '@src/lib/assets/error/warning.svg?react';
import { useNavigate } from 'react-router-dom';
import Button from '@components/ui_old/button/button';
import {
  ERROR_500,
  ERROR_403,
  ERROR_400,
  ERROR_404,
} from '@src/lib/constants/error';

export type TErrorCode =
  | typeof ERROR_500
  | typeof ERROR_403
  | typeof ERROR_404
  | typeof ERROR_400;

interface IErrorComponent {
  code?: TErrorCode;
}

export function ErrorComponent({ code = ERROR_400 }: IErrorComponent) {
  const navigate = useNavigate();

  const imgSrc = useMemo(() => {
    switch (code) {
      case ERROR_400:
        return '/assets/error/error400.svg';
      case ERROR_403:
        return '/assets/error/error403.svg';
      case ERROR_404:
        return '/assets/error/error404.svg';
      case ERROR_500:
        return '/assets/error/error500.svg';

      default:
        return '/assets/error/error404.svg';
    }
  }, [code]);

  const onClick = () => {
    navigate('/');
  };

  return (
    <section className="h-[100vh] w-full flex-center min-h-[inherit]">
      <div className="flex justify-between">
        <div className="w-[300px] mr-[50px]">
          <img src={imgSrc} alt="error" className="w-full h-full" />
        </div>

        <div className="w-[400px] flex flex-col justify-between">
          <div>
            <h3 className="text-brand_dark h2-b flex items-center">
              <span className="mr-2">{code} Error</span>
              <Warning className="fill-brand_dark" />
            </h3>
            <h4 className="h2-b">BAD Request</h4>
          </div>
          <p className="p2-m text-font-sub">
            잘못된 입력을 한 것 같습니다. <br />
            다시 한번 시도하거나 Q&A 페이지를 이용해 <br />
            관리자에게 문의해 주세요.
          </p>
          <div>
            <Button onClick={onClick} color="primary" className="w-[174px]">
              홈으로 이동하기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ErrorComponent;
