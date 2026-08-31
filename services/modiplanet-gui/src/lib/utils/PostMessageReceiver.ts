import {
  MODI_DATA_RECORD_REQUEST,
  MODI_DATA_RECORD_SEND,
  MODI_DATA_RECORD_CANCEL,
  RELOAD_REQUEST,
  SIGN_OUT,
  VERIFY_SIGN_IN,
  SET_LOCALE,
  PARENT_SET_LOCALE,
  PARENT_RELOAD_PATH,
} from '@src/lib/constants/etc';

class PostMessageReceiver {
  private static instance: PostMessageReceiver | null = null;

  events = {
    [MODI_DATA_RECORD_REQUEST]: [] as any[],
    [MODI_DATA_RECORD_SEND]: [] as any[],
    [MODI_DATA_RECORD_CANCEL]: [] as any[],
    [RELOAD_REQUEST]: [] as any[],
    [SIGN_OUT]: [] as any[],
    [VERIFY_SIGN_IN]: [] as any[],
    [SET_LOCALE]: [] as any[],
    [PARENT_SET_LOCALE]: [] as any[],
    [PARENT_RELOAD_PATH]: [] as any[],
  };

  constructor() {
    this._receivedMessageHandler = this._receivedMessageHandler.bind(this);
  }

  public static getInstance(): PostMessageReceiver {
    if (!PostMessageReceiver.instance) {
      PostMessageReceiver.instance = new PostMessageReceiver();
    }
    return PostMessageReceiver.instance;
  }

  public init() {
    window.addEventListener('message', this._receivedMessageHandler);
  }

  public dispose() {
    window.removeEventListener('message', this._receivedMessageHandler);
  }

  public on(event: keyof typeof this.events, listener: (data?: any) => void) {
    if (!this.events[event].includes(listener)) {
      this.events[event].push(listener);
    }
  }

  public off(
    event: keyof typeof this.events,
    listenerToRemove: (data?: any) => void,
  ) {
    this.events[event] = this.events[event].filter(
      (listener) => listener !== listenerToRemove,
    );
  }

  public clear(event: keyof typeof this.events) {
    this.events[event] = [];
  }

  private _receivedMessageHandler(event: MessageEvent) {
    try {
      const data = this._parseNestedJSON(event.data);
      this._dispatchByType(data);
    } catch (err) {
      console.error(err);
      return;
    }
  }

  private _dispatchByType(msg: any) {
    try {
      const { type, data } = msg;
      if (this.events[type]) {
        this.events[type].forEach((listener) => listener(data));
      }
    } catch (err) {
      console.error(err);
      return;
    }
  }

  private _parseNestedJSON(json: string) {
    const parsed = JSON.parse(json);

    function parseObject(obj: any) {
      for (let key in obj) {
        if (typeof obj[key] === 'string' && isJSONString(obj[key])) {
          try {
            obj[key] = JSON.parse(obj[key]);
            if (typeof obj[key] === 'object' && obj[key] !== null) {
              parseObject(obj[key]);
            }
          } catch (error) {
            console.error(error);
          }
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          parseObject(obj[key]);
        }
      }
    }

    function isJSONString(str: any) {
      try {
        JSON.parse(str);
        return true;
      } catch (error) {
        return false;
      }
    }

    parseObject(parsed);
    return parsed;
  }
}

export default PostMessageReceiver;
