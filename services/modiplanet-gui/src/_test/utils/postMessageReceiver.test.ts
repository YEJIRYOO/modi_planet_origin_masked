import {
  MODI_DATA_RECORD_CANCEL,
  MODI_DATA_RECORD_REQUEST,
  MODI_DATA_RECORD_SEND,
  RELOAD_REQUEST,
  SIGN_OUT,
} from '@src/lib/constants/etc';
import PostMessageReceiver from '@src/lib/utils/PostMessageReceiver';

const dispatchMessage = (message: unknown) => {
  window.dispatchEvent(
    new MessageEvent('message', {
      data: JSON.stringify(message),
    }),
  );
};

describe('[유틸] 앱 postMessage 수신', () => {
  const receiver = PostMessageReceiver.getInstance();

  beforeEach(() => {
    Object.keys(receiver.events).forEach((event) => {
      receiver.clear(event as keyof typeof receiver.events);
    });
  });

  afterEach(() => {
    receiver.dispose();
    Object.keys(receiver.events).forEach((event) => {
      receiver.clear(event as keyof typeof receiver.events);
    });
    vi.restoreAllMocks();
  });

  test('등록한 이벤트 타입의 메시지를 받으면 listener를 실행한다.', () => {
    // Given
    const listener = vi.fn();

    receiver.on(MODI_DATA_RECORD_REQUEST, listener);
    receiver.init();

    // When
    dispatchMessage({
      type: MODI_DATA_RECORD_REQUEST,
      data: { requestId: 'record-request-id' },
    });

    // Then
    expect(listener).toHaveBeenCalledWith({ requestId: 'record-request-id' });
  });

  test('data가 없는 메시지는 listener에 undefined를 전달한다.', () => {
    // Given
    const listener = vi.fn();

    receiver.on(SIGN_OUT, listener);
    receiver.init();

    // When
    dispatchMessage({
      type: SIGN_OUT,
    });

    // Then
    expect(listener).toHaveBeenCalledWith(undefined);
  });

  test('알 수 없는 이벤트 타입은 등록된 listener를 실행하지 않는다.', () => {
    // Given
    const listener = vi.fn();

    receiver.on(RELOAD_REQUEST, listener);
    receiver.init();

    // When
    dispatchMessage({
      type: 'UNKNOWN_EVENT',
      data: { path: '/learning-space' },
    });

    // Then
    expect(listener).not.toHaveBeenCalled();
  });

  test('같은 이벤트에 등록된 여러 listener를 모두 실행한다.', () => {
    // Given
    const firstListener = vi.fn();
    const secondListener = vi.fn();

    receiver.on(RELOAD_REQUEST, firstListener);
    receiver.on(RELOAD_REQUEST, secondListener);
    receiver.init();

    // When
    dispatchMessage({
      type: RELOAD_REQUEST,
      data: { path: '/learning-space' },
    });

    // Then
    expect(firstListener).toHaveBeenCalledWith({ path: '/learning-space' });
    expect(secondListener).toHaveBeenCalledWith({ path: '/learning-space' });
  });

  test('같은 listener를 중복 등록해도 한 번만 실행한다.', () => {
    // Given
    const listener = vi.fn();

    receiver.on(RELOAD_REQUEST, listener);
    receiver.on(RELOAD_REQUEST, listener);
    receiver.init();

    // When
    dispatchMessage({
      type: RELOAD_REQUEST,
      data: { path: '/learning-space' },
    });

    // Then
    expect(listener).toHaveBeenCalledTimes(1);
  });

  test('off로 제거한 listener는 메시지를 받아도 실행하지 않는다.', () => {
    // Given
    const listener = vi.fn();

    receiver.on(MODI_DATA_RECORD_CANCEL, listener);
    receiver.off(MODI_DATA_RECORD_CANCEL, listener);
    receiver.init();

    // When
    dispatchMessage({
      type: MODI_DATA_RECORD_CANCEL,
      data: { reason: 'USER_CANCEL' },
    });

    // Then
    expect(listener).not.toHaveBeenCalled();
  });

  test('clear로 제거한 이벤트 listener들은 메시지를 받아도 실행하지 않는다.', () => {
    // Given
    const firstListener = vi.fn();
    const secondListener = vi.fn();

    receiver.on(MODI_DATA_RECORD_SEND, firstListener);
    receiver.on(MODI_DATA_RECORD_SEND, secondListener);
    receiver.clear(MODI_DATA_RECORD_SEND);
    receiver.init();

    // When
    dispatchMessage({
      type: MODI_DATA_RECORD_SEND,
      data: { recordId: 'record-id' },
    });

    // Then
    expect(firstListener).not.toHaveBeenCalled();
    expect(secondListener).not.toHaveBeenCalled();
  });

  test('특정 이벤트를 clear해도 다른 이벤트 listener는 유지한다.', () => {
    // Given
    const clearedListener = vi.fn();
    const remainedListener = vi.fn();

    receiver.on(MODI_DATA_RECORD_SEND, clearedListener);
    receiver.on(RELOAD_REQUEST, remainedListener);
    receiver.clear(MODI_DATA_RECORD_SEND);
    receiver.init();

    // When
    dispatchMessage({
      type: MODI_DATA_RECORD_SEND,
      data: { recordId: 'record-id' },
    });
    dispatchMessage({
      type: RELOAD_REQUEST,
      data: { path: '/learning-space' },
    });

    // Then
    expect(clearedListener).not.toHaveBeenCalled();
    expect(remainedListener).toHaveBeenCalledWith({
      path: '/learning-space',
    });
  });

  test('문자열로 중첩된 JSON 데이터까지 객체로 파싱해서 전달한다.', () => {
    // Given
    const listener = vi.fn();

    receiver.on(MODI_DATA_RECORD_SEND, listener);
    receiver.init();

    // When
    dispatchMessage({
      type: MODI_DATA_RECORD_SEND,
      data: JSON.stringify({
        record: JSON.stringify({ id: 'record-id', status: 'DONE' }),
      }),
    });

    // Then
    expect(listener).toHaveBeenCalledWith({
      record: { id: 'record-id', status: 'DONE' },
    });
  });

  test('dispose 후에는 window message 이벤트를 수신하지 않는다.', () => {
    // Given
    const listener = vi.fn();

    receiver.on(RELOAD_REQUEST, listener);
    receiver.init();
    receiver.dispose();

    // When
    dispatchMessage({
      type: RELOAD_REQUEST,
      data: { path: '/signin' },
    });

    // Then
    expect(listener).not.toHaveBeenCalled();
  });

  test('파싱할 수 없는 메시지는 listener를 실행하지 않고 에러를 기록한다.', () => {
    // Given
    const listener = vi.fn();
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    receiver.on(RELOAD_REQUEST, listener);
    receiver.init();

    // When
    window.dispatchEvent(
      new MessageEvent('message', {
        data: 'not-json',
      }),
    );

    // Then
    expect(listener).not.toHaveBeenCalled();
    expect(consoleError).toHaveBeenCalled();
  });
});
