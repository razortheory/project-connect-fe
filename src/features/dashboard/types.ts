type ProgressBar = {
  width: string;
};

type MapPreview = {
  backgroundImage: string;
};

export type DashboardCountryData = {
  id: number;
  flag: string;
  name: string;
  joinDate: string;
  description: string;
  progressPercent: string;
  progressBarStyle: ProgressBar;
  bubbleProgressClass: string;
  progressDescription: string;
  mapPreviewStyle: MapPreview;
};