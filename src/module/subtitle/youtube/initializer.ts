import { waitUntil } from "../../../common/helper/promise";
import { AppInitializer } from "../../../common/types/general.type";
import { SUBTITLE_CLASS } from "../config/static";

import youtubeComponent from "./Index.vue";

export const youtube: AppInitializer = {
  website: {
    host: "youtube.com",
    path: "/watch",
  },
  component: youtubeComponent,
  initializer: async (app) => {
    await waitUntil(() => !!document.querySelector(SUBTITLE_CLASS));

    let appDiv = document.createElement("div");
    let videoContainer = document.querySelector(".watch-video");

    videoContainer?.insertBefore(appDiv, videoContainer.firstChild);

    appDiv.id = "app";
    appDiv.style.position = "relative";
    appDiv.style.zIndex = "9999";

    app.mount(appDiv);
    return app;
  },
};
