import { TInputProps } from '../types';

/**
 * iamport
 */
export const IAMPORT_PAYMENTS_ID =
  process.env.REACT_APP_ENV === 'production'
    ? 'im_modipl38fs'
    : 'test_modiplanet1231';
export const IAMPORT_CERTIFICATION_ID = 'imp23842138';
export const IAMPORT_CERTIFICATION_PG = 'Danal.B010007970';

export const IAMPORT_IAMPORT_SRC = 'https://cdn.iamport.kr/v1/iamport.js';

/**
 * Block Code
 */
export const EMPTY_VALUE = '';

export const DEFAULT_INPUT_PROPS: TInputProps = {
  maxLength: 1,
  className: 'input',
};

const DELETE = 'Delete';
const BACK_SPACE = 'Backspace';
const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';

export const KEYLIST = {
  DELETE,
  BACK_SPACE,
  ARROW_LEFT,
  ARROW_RIGHT,
};
