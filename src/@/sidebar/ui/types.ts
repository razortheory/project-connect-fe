export interface CountryInfo {
  schoolsTotal: string;
  schoolsConnected: string | null;
  connectionSpeed: string | null;
  schoolsWithNoInternet: string;
  hasStatistics: boolean;
  connectivityLevel: string;
  connectivityDescription: string;
}
