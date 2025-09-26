import { SatelliteData } from '../Models/SatelliteData';

export function Parse3le(data: string): SatelliteData[] {
  let lines = data.split('\n');
  let parsedData = new Array<SatelliteData>();

  for (let i = 0; i < lines.length; i += 3) {
    if (lines.length - i - 3 <= 0) return parsedData;

    let parsedObject: SatelliteData = {
      Name: '',
      SatelliteCatalogNumber: 0,
      ElsetClassification: '',
      InternationalDesignator: '',
      EpochYear: 0,
      EpochDay: 0,
      BallisticCoefficient: 0,
      BallisticCoefficientByDayCubed: 0,
      BStar: 0,
      EphemerisType: 0,
      ElementSet: 0,
      Inclination: 0,
      RightAscension: 0,
      Eccentricity: 0,
      ArgumentOfPerigee: 0,
      MeanAnomaly: 0,
      MeanMotion: 0,
      NumRevolutionAtEpoch: 0,
    };

    let line1 = lines[i];
    let line2 = lines[i + 1];
    let line3 = lines[i + 2];

    parsedObject.Name = line1.substring(2, line1.length - 1);
    parsedObject.SatelliteCatalogNumber = parseInt(line2.substring(2, 7));
    parsedObject.ElsetClassification = line2.substring(7, 8);
    parsedObject.InternationalDesignator = line2.substring(9, 17).trim();
    parsedObject.EpochYear = parseInt(line2.substring(18, 20));
    parsedObject.EpochDay = parseFloat(line2.substring(20, 32));
    parsedObject.BallisticCoefficient = parseFloat(line2.substring(33, 43));
    parsedObject.BallisticCoefficientByDayCubed = parseFloat(line2.substring(44, 52));
    parsedObject.BStar = ParseScientificNotation(line2.substring(53, 61).trim());
    parsedObject.EphemerisType = parseInt(line2.substring(62, 63));
    parsedObject.ElementSet = parseInt(line2.substring(64, 68));
    parsedObject.Inclination = parseFloat(line3.substring(8, 16));
    parsedObject.RightAscension = parseFloat(line3.substring(17, 25));
    parsedObject.Eccentricity = parseFloat(`0.` + line3.substring(26, 33));
    parsedObject.ArgumentOfPerigee = parseFloat(line3.substring(34, 42));
    parsedObject.MeanAnomaly = parseFloat(line3.substring(43, 51));
    parsedObject.MeanMotion = parseFloat(line3.substring(52, 63));
    parsedObject.NumRevolutionAtEpoch = parseFloat(line3.substring(63, 68));

    parsedData.push(parsedObject);
  }

  return parsedData;
}

export function ParseScientificNotation(data: string): number {
  let isNegative = false;
  if (data.startsWith('-')) {
    isNegative = true;
    data = data.substring(1, data.length - 1);
  }

  let parts = data.split('-');
  let base = parseFloat(`0.` + parts[0].trim());
  if (isNegative) base *= -1;
  let exponent = parseInt(parts[1]) * -1;
  return base * Math.pow(10, exponent);
}

export function ParseDecimalPointAssumed(data: string): number {
  let stringDec = data;
  if (!stringDec.startsWith('0.')) {
    stringDec = `0.` + stringDec;
  }
  return parseFloat(stringDec);
}
