import { Parse3leData } from '../Logic/ParsingLogic';
import * as fs from 'fs';

describe('Testing ParsingLogic.Parse3leData', () => {
  test('Parse3leData', () => {
    const dataset = fs.readFileSync('./Tests/Datasets/2025-09-25_dataset_1.3le','utf-8');
    const expectedResult = JSON.parse(fs.readFileSync('./Tests/ExpectedData/2025-09-25_dataset_1.json', 'utf-8'));
    expect(Parse3leData(dataset)).toEqual(expectedResult);
  });
});
