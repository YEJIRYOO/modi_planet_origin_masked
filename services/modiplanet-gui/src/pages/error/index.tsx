import React from 'react';
import { useParams } from 'react-router-dom';
import ErrorComponent, { TErrorCode } from '@src/pages/error/error';

interface IErrorPage {}
export function ErrorPage({}: IErrorPage) {
  const { code } = useParams();

  return (
    <div className="h-full w-full">
      <ErrorComponent code={code as TErrorCode | undefined} />
    </div>
  );
}

export default ErrorPage;
