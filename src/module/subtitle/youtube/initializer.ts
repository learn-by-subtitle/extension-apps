import { waitUntil } from "../../../common/helper/promise";
import { AppInitializer } from "../../../common/types/general.type";
import { SUBTILE_CONTAINER_CLASS } from "./static";

import youtubeComponent from "./Index.vue";

export const youtube: AppInitializer = {
  website: {
    host: "youtube.com",
    path: "/watch",
  },
  component: youtubeComponent,
  start: async (app) => {
    await waitUntil(() => !!document.querySelector(SUBTILE_CONTAINER_CLASS));

    let appDiv = document.createElement("div");
    appDiv.id = "app";

    document.body.insertAdjacentElement('afterbegin', appDiv);

    app.mount(appDiv);
    return app;
  },
};
