type ProgressBar = {
  width: string;
};

type MapPreview = {
  backgroundImage: string;
};

export type CountryInfo = {
  id: number;
  code: string;
  flag: string;
  name: string;
  joinDate: string;
  progressPercent: number;
  progressBarStyle: ProgressBar;
  bubbleProgressClass: string;
  progressDescription: string;
  mapPreviewStyle: MapPreview;
};

export type Tabs = 'countries' | 'sort';
