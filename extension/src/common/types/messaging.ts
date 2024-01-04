export const MESSAGE_TYPE = {
  GET_LOGIN_STATUS: "GET_LOGIN_STATUS",
  OPEN_LOGIN_WINDOW: "OPEN_LOGIN_WINDOW",
};

export type LoginStatusResponse = {
  status: boolean;
  token?: string;
};

class BaseMessage {
  type!: string;

  static is(message: any) {}
  static checkResponse(response: any) {}
}

export class GetLoginStatusMessage implements BaseMessage {
  type: string;

  constructor() {
    this.type = MESSAGE_TYPE.GET_LOGIN_STATUS;
  }

  static is(message: any): message is GetLoginStatusMessage {
    return message.type === MESSAGE_TYPE.GET_LOGIN_STATUS;
  }

  static checkResponse(response: any): response is LoginStatusResponse {
    return response.status !== undefined && response.token !== undefined;
  }
}

export class OpenLoginWindowMessage implements BaseMessage {
  type: string;

  constructor() {
    this.type = MESSAGE_TYPE.OPEN_LOGIN_WINDOW;
  }

  static is(message: any): message is OpenLoginWindowMessage {
    return message.type === MESSAGE_TYPE.OPEN_LOGIN_WINDOW;
  }
}
