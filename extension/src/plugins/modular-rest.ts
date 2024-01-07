import { GlobalOptions, authentication } from "@modular-rest/client";

import { sendMessage } from "../module/popup/helper/massage";

import {
  GetLoginStatusMessage,
  StoreUserTokenMessage,
} from "../common/types/messaging";
import { ref } from "vue";

GlobalOptions.set({
  host: process.env.SUBTURTLE_WEBSITE || "",
});

export {
  authentication,
  dataProvider,
  fileProvider,
} from "@modular-rest/client";

export const isLogin = ref(authentication.isLogin);

export function loginWithLastSession() {
  // Check if the user is logged in
  // If the user is logged in, try to login with the token as last session.
  sendMessage(new GetLoginStatusMessage())
    .then((res) => {
      if (!GetLoginStatusMessage.checkResponse(res)) return;
      if (!res.status) return;

      return authentication.loginWithLastSession(res.token);
    })
    .then(() => {
      console.log("login success", authentication.isLogin);
      isLogin.value = authentication.isLogin;
    })
    // if the login failed, it means token is invalid or expired.
    // so the token should be removed from the storage.
    .catch((err) => sendMessage(new StoreUserTokenMessage(null)));
}

export function logout() {
  authentication.logout();
  isLogin.value = authentication.isLogin;
  sendMessage(new StoreUserTokenMessage(null));
}
