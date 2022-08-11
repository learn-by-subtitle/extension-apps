import { App } from "vue";

export type Dictionary = {
  [key: string]: any;
};

export interface SubtitleBundingBox {
  top: number;
  left: number;
  width: number;
  height: number;
};

export interface AppInitializer {
  website: {
    host: string;
    path: string;
  };
  component: any;
  initializer: (app: App) => Promise<App>;
}
