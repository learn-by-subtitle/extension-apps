import { GetLoginStatusMessage } from "./common/types/messaging";

export {};

console.log("background.ts");

// @ TODO: Add uninstall url
// chrome.management.onUninstalled.addListener(function (extensionId) {});

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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (GetLoginStatusMessage.is(request)) {
    console.log(request);
    getOAuthToken().then((token) => {
      sendResponse({ status: !!token, token: token || null });
    });
  }
  // keep it
  return true;
});
