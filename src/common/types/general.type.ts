import { App } from "vue";

export type Dictionary = {
  [key: string]: any;
};

export type SubtitleBundingBox = {
  top: number,
  left: number,
  width: number,
  height: number,
}

export type AppInitializer = (app:App) => void