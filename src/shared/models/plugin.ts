import type { Adhesion } from "./adhesion";

export interface Plugin {
  ads?: Adhesion[];
  data: PluginData;
  info: PluginInfo;
}

interface PluginData {
  id?: string;
  type: string;
  body?: string;
  header?: string;
}

export interface PluginInfo {
  id: string;
  domain: string;
  name: string;
  type: PluginInfoType;
  level: string;
}

export type PluginInfoType =
  | "REVAZA"
  | "GOOGLE_ANALYTIC"
  | "ASSERTIVEYIELD"
  | "COMSCORE"
  | "QUANTCAST"
  | "CLEAN_IO"
  | "EXOTIC"
  | "VIDAZOO"
  | "ADSENSE_FOR_SEARCH"
  | "STN_VIDEO"
  | "INTENT_IQ"
  | "TABOOLA"
  | "MINUTE_MEDIA"
  | "ANIVIEW"
  | "CUSTOM"
  | "STAY22";

export const pluginTypes: PluginInfoType[] = [
  "REVAZA",
  "GOOGLE_ANALYTIC",
  "ASSERTIVEYIELD",
  "COMSCORE",
  "QUANTCAST",
  "CLEAN_IO",
  "EXOTIC",
  "VIDAZOO",
  "ADSENSE_FOR_SEARCH",
  "STN_VIDEO",
  "INTENT_IQ",
  "TABOOLA",
  "MINUTE_MEDIA",
  "ANIVIEW",
  "CUSTOM",
  "STAY22",
];

export interface PluginDictionary {
  PATHS: string[];
}
