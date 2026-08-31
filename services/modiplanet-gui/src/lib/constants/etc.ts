import { CleaveOptions } from 'cleave.js/options';
import moment from 'moment';

export const COLOR = {
  MAIN: {
    500: '#DB2D2F',
    400: '#DB2D2F',
    300: '#FF4547',
    200: '#FF715D',
    100: '#FF9F8D',
  },
  PURPLE: '#45D6DF',
  CHART_TEXT: '#acacac',
};

export const cleaveOptPhone: CleaveOptions = {
  phone: true,
  phoneRegionCode: 'KR',
  blocks: [3, 4, 4],
  delimiter: '-',
};

export const LOG_INTERVAL_MS = 10 * 1000;

export const LOG_MAX_COUNT = 20;

export const DEFAULT_IMG = '/assets/skeleton.svg';
export const DEFAULT_PROFILE_IMAGE = '/assets/profiles/default-profile.svg';

export const MIN_YEAR = 1900;
export const MAX_YEAR = moment().get('year');

export const MAX_CHILD_PROFILES_LENGTH = 3;
export const MAX_PIN_LENGTH = 4;
export const KEY_BACKSPACE = 'Backspace';
export const KEY_ZERO = '0';
export const KEY_NINE = '9';

export const TIMESTAMP_LENGTH = 10;

export const DEFAULT_VIDEO_RESOLUTION = { width: 1920, height: 1080 };

export const PIP_KEY = 'PIP_KEY';

export const ACCEPT_IMAGE_FILES_AI_UPLOAD = '.jpg, .jpeg, .png, .bmp';
export const ACCEPT_VOICE_FILES_AI_UPLOAD = '.wav, .mp3';
export const ACCEPT_MODI_FILES_AI_UPLOAD = '.modi';

/** 셀프학습, 화상학습 탭 너비 */
export const TAB_DEFAULT_WIDTH = 380;
export const TAB_MIN_WIDTH = 80;
export const TAB_MAX_WIDTH = 750;

export const MAX_PDF_SIZE = 30;

export const MIN_COUNT_CLASSIFIERS = 2;
export const MIN_COUNT_IMAGEURL_IN_CLASSIFIER = 1;
export const MIN_COUNT_DATA_IN_CLASSIFIER = 1;
export const MAX_LENGTH_MODEL_NAME = 30;

/** postMessage - 메세지 타입 정의 */
export const CLOSE_AI_TRAINING_POPUP = 'CLOSE_AI_TRAINING_POPUP';
export const SEND_MODEL_INFO = 'SEND_MODEL_INFO';
export const SIGN_IN_COMPLETE = 'SIGN_IN_COMPLETE';
export const VERIFY_SIGN_IN = 'VERIFY_SIGN_IN';
export const RELOAD_REQUEST = 'RELOAD_REQUEST';
export const SEND_PROFILE = 'SEND_PROFILE';
export const SIGN_OUT = 'SIGN_OUT';
export const MODI_DATA_RECORD_REQUEST = 'MODI_DATA_RECORD_REQUEST';
export const MODI_DATA_RECORD_SEND = 'MODI_DATA_RECORD_SEND';
export const MODI_DATA_RECORD_RESPONSE = 'MODI_DATA_RECORD_RESPONSE';
export const MODI_DATA_RECORD_CANCEL = 'MODI_DATA_RECORD_CANCEL';
export const SET_LOCALE = 'SET_LOCALE';
export const NOTIFICATION_CLICK_EVENT = 'NOTIFICATION_CLICK_EVENT';
export const PARENT_SET_LOCALE = 'PARENT_SET_LOCALE';
export const PARENT_RELOAD_PATH = 'PARENT_RELOAD_PATH';

/** 문의하기 페이지 */
export const MAX_LENGTH_INQUIRY_TITLE = 30;
export const MAX_LENGTH_INQUIRY_CONTENT = 2000;
export const VALID_EXTENSION_INQUIRY_ATTACHMENT =
  '.jpg, .gif, .png, .pdf, .pptx, .doc, .xls, .xlsx, .hwp, .twt, .mp4';
export const MAX_FILE_SIZE_INQUIRY_ATTACHMENT = 2 * 1024 * 1024; // 2MB

/** 소셜 로그인 redirect URL 저장을 위한 세션 스토리지 키 */
export const SOCIAL_LOGIN_REDIRECT_URL_KEY = 'social_login_redirect_url';
