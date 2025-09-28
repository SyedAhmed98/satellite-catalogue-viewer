import {
  Parse3le,
  ParseDecimalPointAssumed,
  ParseScientificNotation,
} from '../Logic/ParsingLogic';
import * as fs from 'fs';

// ParseScientificNotation
describe('ParseScientificNotation', () => {
  test('given zero coefficient and zero exponent return correct value', () => {
    expect(ParseScientificNotation('00000-0')).toEqual(0.0);
  });
});

describe('ParseScientificNotation', () => {
  test('given non-zero coefficient and zero exponent return correct value', () => {
    expect(ParseScientificNotation('01200-0')).toEqual(0.012);
  });
});

describe('ParseScientificNotation', () => {
  test('given non-zero coefficient and non-zero exponent return correct value', () => {
    expect(ParseScientificNotation('03500-5')).toEqual(0.00000035);
  });
});

describe('ParseScientificNotation', () => {
  test('given zero coefficient and non-zero exponent return correct value', () => {
    expect(ParseScientificNotation('00000-5')).toEqual(0.0);
  });
});

describe('ParseScientificNotation', () => {
  test('given non-zero coefficient and double digit non-zero exponent return correct value', () => {
    expect(ParseScientificNotation('00090-10')).toEqual(0.00000000000009);
  });
});

// Parse3le
describe('Parse3leData', () => {
  test('given single TLE returns correct value', () => {
    const dataset = fs.readFileSync(
      './Tests/Datasets/Parse3le/2025-09-25_dataset_1.3le',
      'utf-8',
    );
    const expectedResult = JSON.parse(
      fs.readFileSync(
        './Tests/ExpectedData/Parse3le/2025-09-25_dataset_1.json',
        'utf-8',
      ),
    );
    expect(Parse3le(dataset)).toEqual(expectedResult);
  });
});

describe('Parse3leData', () => {
  test('given multiple TLE returns correct value', () => {
    const dataset = fs.readFileSync(
      './Tests/Datasets/Parse3le/2025-09-25_dataset_5.3le',
      'utf-8',
    );
    const expectedResult = JSON.parse(
      fs.readFileSync(
        './Tests/ExpectedData/Parse3le/2025-09-25_dataset_5.json',
        'utf-8',
      ),
    );
    expect(Parse3le(dataset)).toEqual(expectedResult);
  });
});

// ParseDecimalPointAssumed
describe('ParseDecimalPointAssumed', () => {
  test('given zero return correct value', () => {
    expect(ParseDecimalPointAssumed('0000000')).toEqual(0.0);
  });
});

describe('ParseDecimalPointAssumed', () => {
  test('given non-zero return correct value', () => {
    expect(ParseDecimalPointAssumed('0900000')).toEqual(0.09);
  });
});