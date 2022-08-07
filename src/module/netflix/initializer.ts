import { waitUntil } from "../../common/helper/promise";
import { AppInitializer } from "../../common/types/general.type";
import { SUBTITLE_CLASS } from "../../config/static";

export const NetflixInitializer: AppInitializer = async (app) => {
  await waitUntil(() => !!document.querySelector(SUBTITLE_CLASS));

  let appDiv = document.createElement("div");
  let videoContainer = document.querySelector(".watch-video");

  videoContainer?.insertBefore(appDiv, videoContainer.firstChild);

  appDiv.id = "app";
  appDiv.style.position = "relative";
  appDiv.style.zIndex = "9999";

  app.mount(appDiv);
};
