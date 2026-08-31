import React, { createContext, ReactNode, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { Analytics, getAnalytics, logEvent, setUserProperties } from 'firebase/analytics';
interface IFirebaseProvider {
  children: ReactNode;
}

const FirebaseContext = createContext<null | Analytics>(null);

function FirebaseProvider({ children }: IFirebaseProvider) {
  const firebaseConfig = {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  setUserProperties(analytics, {
    env: process.env.REACT_APP_ENV ?? 'development',
  });
  return (
    <FirebaseContext.Provider value={analytics}>
      {children}
    </FirebaseContext.Provider>
  );
}

export default FirebaseProvider;

export const useFirebase = () => {
  const value = useContext(FirebaseContext);
  if (value === null) {
    throw new Error('useFirebase should be used within CounterProvider');
  }
  return value;
};

export const useFirebaseEvent = () => {
  const analytics = useFirebase();

  const visitModiplanetLog = () => {
    logEvent(analytics, 'visitModiplanet');
  };
  const signInCompleteLog = () => {
    logEvent(analytics, 'signInComplete');
  };
  const viewMainPageLog = () => {
    logEvent(analytics, 'viewMainPage');
  };
  const viewMaterialsPageLog = () => {
    logEvent(analytics, 'viewMaterialsPage');
  };
  const viewCsPageLog = () => {
    logEvent(analytics, 'viewCsPage');
  };
  const viewInquiryPageLog = () => {
    logEvent(analytics, 'viewInquiryPage');
  };
  const viewMyAccountPageLog = () => {
    logEvent(analytics, 'viewMyAccountPage');
  };
  const viewMyProjectPageLog = () => {
    logEvent(analytics, 'viewMyProject');
  };
  const viewCodeEditorPageLog = () => {
    logEvent(analytics, 'viewCodeEditorPage');
  };
  const userWithdrawalLog = (data: any) => {
    logEvent(analytics, 'userWithdrawal', data);
  };
  const userSignUpLog = (data: any) => {
    logEvent(analytics, 'userSignUp', data);
  };
  const viewLearningSpaceLog = () => {
    logEvent(analytics, 'viewLearningSpace');
  };
  const startCourseLessonLog = (data: {
    courseId: string;
    lessonId: string;
  }) => {
    logEvent(analytics, 'startCourseLesson', data);
  };
  const viewCourseStepLog = (data: {
    courseId: string;
    lessonId: string;
    stepId: string;
  }) => {
    logEvent(analytics, 'viewCourseStep', data);
  };

  return {
    visitModiplanetLog,
    signInCompleteLog,
    viewCsPageLog,
    viewInquiryPageLog,
    viewMainPageLog,
    viewMaterialsPageLog,
    viewMyAccountPageLog,
    viewMyProjectPageLog,
    viewCodeEditorPageLog,
    userWithdrawalLog,
    userSignUpLog,
    viewLearningSpaceLog,
    startCourseLessonLog,
    viewCourseStepLog,
  };
};
