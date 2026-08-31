import {
  CLOSE_AI_TRAINING_POPUP,
  MODI_DATA_RECORD_RESPONSE,
  NOTIFICATION_CLICK_EVENT,
  SEND_MODEL_INFO,
  SEND_PROFILE,
} from '@src/lib/constants/etc';
import PostMessageSender from '@src/lib/utils/PostMessageSender';
import { ProfileModel } from '@src/services/client-model/user';

describe('[유틸] 앱 postMessage 전송', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('모델 정보를 Flutter 앱 메시지 형식으로 전송한다.', () => {
    // Given
    const postMessage = vi
      .spyOn(window.parent, 'postMessage')
      .mockImplementation(() => {});

    // When
    PostMessageSender.getInstance().sendModelInfo({
      modelUrl: 'https://example.com/model.json',
      labels: ['cat', 'dog'],
      category: 'IMAGE',
      modiType: 'BUTTON',
      modelName: 'animal-model',
    });

    // Then
    expect(postMessage).toHaveBeenCalledWith(
      JSON.stringify({
        type: SEND_MODEL_INFO,
        data: {
          category: 'IMAGE',
          modelUrl: 'https://example.com/model.json',
          labels: ['cat', 'dog'],
          modiType: 'BUTTON',
          modelName: 'animal-model',
        },
      }),
      '*',
    );
  });

  test('AI 학습 팝업 닫기 메시지를 전송한다.', () => {
    // Given
    const postMessage = vi
      .spyOn(window.parent, 'postMessage')
      .mockImplementation(() => {});

    // When
    PostMessageSender.getInstance().sendCloseTrainingPopup();

    // Then
    expect(postMessage).toHaveBeenCalledWith(
      JSON.stringify({ type: CLOSE_AI_TRAINING_POPUP }),
      '*',
    );
  });

  test('프로필 메시지는 전달받은 targetWindow로 전송한다.', () => {
    // Given
    const targetWindow = {
      postMessage: vi.fn(),
    } as unknown as Window;

    const profile: ProfileModel = {
      id: 'profile-id',
      userId: 'user-id',
      birthdate: '2010-05-06',
      name: 'Student',
      nickname: 'MODI',
      countryCallingCode: '+82',
      phoneNumber: '01012345678',
      thumbnailUrl: 'https://example.com/profile.png',
      codingExperienceTypeList: [],
      contactEmail: 'student@example.com',
    };

    // When
    PostMessageSender.getInstance().sendProfile({
      profile,
      targetWindow,
      code: 'AUTH_CODE',
    });

    // Then
    expect(targetWindow.postMessage).toHaveBeenCalledWith(
      JSON.stringify({
        type: SEND_PROFILE,
        data: {
          id: 'profile-id',
          name: 'MODI',
          thumbnail: 'https://example.com/profile.png',
          code: 'AUTH_CODE',
        },
      }),
      '*',
    );
  });

  test('모디 데이터 기록 응답 메시지를 전송한다.', () => {
    // Given
    const postMessage = vi
      .spyOn(window.parent, 'postMessage')
      .mockImplementation(() => {});

    // When
    PostMessageSender.getInstance().sendModiDataRecordResponse({
      isRecording: false,
      alertMessage: 'RECORD_STOPPED',
    });

    // Then
    expect(postMessage).toHaveBeenCalledWith(
      JSON.stringify({
        type: MODI_DATA_RECORD_RESPONSE,
        data: {
          isRecording: false,
          alertMessage: 'RECORD_STOPPED',
        },
      }),
      '*',
    );
  });

  test('알림 클릭 이벤트는 링크가 있을 때만 data를 포함한다.', () => {
    // Given
    const postMessage = vi
      .spyOn(window.parent, 'postMessage')
      .mockImplementation(() => {});

    // When
    PostMessageSender.getInstance().sendNotificationClickEvent();
    PostMessageSender.getInstance().sendNotificationClickEvent({
      webLinkPath: '/learning-space',
    });

    // Then
    expect(postMessage).toHaveBeenNthCalledWith(
      1,
      JSON.stringify({ type: NOTIFICATION_CLICK_EVENT }),
      '*',
    );
    expect(postMessage).toHaveBeenNthCalledWith(
      2,
      JSON.stringify({
        type: NOTIFICATION_CLICK_EVENT,
        data: { webLinkPath: '/learning-space' },
      }),
      '*',
    );
  });
});
