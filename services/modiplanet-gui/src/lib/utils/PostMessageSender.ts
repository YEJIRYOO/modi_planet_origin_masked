import {
  CLOSE_AI_TRAINING_POPUP,
  SEND_MODEL_INFO,
  SEND_PROFILE,
  MODI_DATA_RECORD_RESPONSE,
  NOTIFICATION_CLICK_EVENT,
} from '@src/lib/constants/etc';
import { ProfileModel } from '@src/services/client-model/user';

export interface PostMessageToModiFlutterAdapter {
  type:
    | typeof SEND_MODEL_INFO
    | typeof CLOSE_AI_TRAINING_POPUP
    | typeof SEND_PROFILE
    | typeof MODI_DATA_RECORD_RESPONSE
    | typeof NOTIFICATION_CLICK_EVENT;
  data?: any;
}

export type ModelCategoryType = 'IMAGE' | 'VOICE' | 'NUMBER';

class PostMessageSender {
  private static instance: PostMessageSender | null = null;

  private constructor() {}

  public static getInstance(): PostMessageSender {
    if (!PostMessageSender.instance) {
      PostMessageSender.instance = new PostMessageSender();
    }
    return PostMessageSender.instance;
  }

  public sendModelInfo({
    modelUrl,
    labels,
    category,
    modiType,
    modelName,
  }: {
    modelUrl: string;
    labels: Array<string>;
    category: ModelCategoryType;

    // modiType : 'BUTTON' | 'IMU' | 'JOYSTICK' | 'DIAL' | 'TOF' | 'ENVIRONMENT';
    modiType?: string | null;
    modelName: string;
  }) {
    const modelInfoMessage: PostMessageToModiFlutterAdapter = {
      type: SEND_MODEL_INFO,
      data: {
        category,
        modelUrl,
        labels,
        modiType,
        modelName,
      },
    };

    this._sendMessage(modelInfoMessage);
  }

  public sendCloseTrainingPopup() {
    const closeTrainingPopupMessage: PostMessageToModiFlutterAdapter = {
      type: CLOSE_AI_TRAINING_POPUP,
    };

    this._sendMessage(closeTrainingPopupMessage);
  }

  public sendProfile({
    profile,
    targetWindow,
    code,
  }: {
    profile: ProfileModel;
    targetWindow: Window;
    code?: string;
  }) {
    const profileMessage: PostMessageToModiFlutterAdapter = {
      type: SEND_PROFILE,
      data: {
        id: profile.id,
        name: profile.nickname,
        thumbnail: profile.thumbnailUrl,
        code,
      },
    };

    this._sendMessage(profileMessage, targetWindow);
  }

  public sendModiDataRecordResponse({
    isRecording,
    alertMessage,
  }: {
    isRecording?: boolean;
    alertMessage?: string;
  }) {
    const modiDataRecordResponseMessage: PostMessageToModiFlutterAdapter = {
      type: MODI_DATA_RECORD_RESPONSE,
      data: {
        isRecording,
        alertMessage,
      },
    };

    this._sendMessage(modiDataRecordResponseMessage);
  }

  public sendNotificationClickEvent({
    webLinkPath,
  }: { webLinkPath?: string } = {}) {
    const message: PostMessageToModiFlutterAdapter = {
      type: NOTIFICATION_CLICK_EVENT,
    };

    if (webLinkPath !== undefined) {
      message.data = { webLinkPath };
    }

    this._sendMessage(message);
  }

  private _sendMessage(
    message: PostMessageToModiFlutterAdapter,
    targetWindow: Window = window.parent,
  ) {
    targetWindow.postMessage(JSON.stringify(message), '*');
  }
}

export default PostMessageSender;
