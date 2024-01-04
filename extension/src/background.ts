import {
  GetLoginStatusMessage,
  OpenLoginWindowMessage,
} from "./common/types/messaging";

export {};

console.log("background.ts");

function getOAuthToken() {
  return new Promise((resolve, reject) => {
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(token);
      }
    });
  });
}

function getScreenSize() {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    chrome.windows.getCurrent((window) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve({ width: window.width || 0, height: window.height || 0 });
      }
    });
  });
}

chrome.runtime.onMessage.addListener(async function (
  request,
  _sender,
  sendResponse
) {
  // Get login status
  if (GetLoginStatusMessage.is(request)) {
    getOAuthToken().then((token) => {
      sendResponse({ status: !!token, token: token || null });
    });
  }

  // Open Login popup
  else if (OpenLoginWindowMessage.is(request)) {
    const screen = await getScreenSize();
    const width = 400;
    const height = 600;

    const left = screen.width / 2 - width / 2;
    const top = screen.height / 2 - height / 2;

    chrome.windows.create({
      url: chrome.runtime.getURL("popup.html") + "#/login",
      type: "popup",
      width: width,
      height: height,
      focused: true,
      left: Math.round(left),
      top: Math.round(top),
    });
  }
  // keep it
  return true;
});
