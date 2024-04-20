import { BaseMessage, LoginStatusResponse } from "../../common/types/messaging";

export async function sendMessage<T extends BaseMessage | LoginStatusResponse>(
  message: T | any
) {
  return new Promise<T>((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(response);
      }
    });
  });
}

export function sendMessageToTabs<T extends BaseMessage | LoginStatusResponse>(
  message: T | any
) {
  chrome.tabs.query({}, (tabs) => {
    for (const tab of tabs) {
      tab?.id && chrome.tabs.sendMessage(tab.id, message);
    }
  });
}
