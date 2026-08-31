import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

const firebaseEventMock = vi.hoisted(() => ({
  visitModiplanetLog: vi.fn(),
  signInCompleteLog: vi.fn(),
  viewCsPageLog: vi.fn(),
  viewInquiryPageLog: vi.fn(),
  viewMainPageLog: vi.fn(),
  viewMaterialsPageLog: vi.fn(),
  viewMyAccountPageLog: vi.fn(),
  viewMyProjectPageLog: vi.fn(),
  viewCodeEditorPageLog: vi.fn(),
  userWithdrawalLog: vi.fn(),
  userSignUpLog: vi.fn(),
  viewLearningSpaceLog: vi.fn(),
  startCourseLessonLog: vi.fn(),
  viewCourseStepLog: vi.fn(),
}));

vi.mock('@components/provider/firebase-provider', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => children,
  useFirebase: () => ({}),
  useFirebaseEvent: () => firebaseEventMock,
}));
vi.mock(
  '@src/components/provider/firebase-provider',
  () => ({
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => children,
    useFirebase: () => ({}),
    useFirebaseEvent: () => firebaseEventMock,
  }),
);

vi.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => {
        return str;
      },
      i18n: {
        language: 'ko',
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: vi.fn(),
  },
}));

// server.listen();
