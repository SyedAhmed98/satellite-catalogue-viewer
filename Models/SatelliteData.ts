export interface SatelliteData {
  Name: string;
  SatelliteCatalogNumber: number;
  ElsetClassification: string;
  InternationalDesignator: string;
  EpochYear: number;
  EpochDay: number;
  BallisticCoefficient: number;
  BallisticCoefficientByDayCubed: number;
  BStar: number;
  EphemerisType: number
  ElementSet: number;
  Inclination: number;
  RightAscension: number;
  Eccentricity: number;
  ArgumentOfPerigee: number;
  MeanAnomaly: number;
  MeanMotion: number;
  NumRevolutionAtEpoch: number;
}