import {
  isReady,
  isLoading,
  hasFailed,
  isEmpty,
  getJsData
} from './stateHelpers';

const isTestDataSomething = func => (state, testId, versionId) =>
  state.testValues &&
  state.testValues[testId] &&
  state.testValues[testId][versionId] &&
  func(state.testValues[testId][versionId]);

export const isTestDataReady = isTestDataSomething(isReady);
export const isTestDataLoading = isTestDataSomething(isLoading);
export const hasTestDataFailed = isTestDataSomething(hasFailed);
export const isTestDataEmpty = (state, testId, versionId) =>
  !state.testValues[testId] ||
  !state.testValues[testId][versionId] ||
  isEmpty(state.testValues[testId][versionId]);

export const getLoadedValues = state => {
  const tests = [];
  for (const testId in state.testValues) {
    for (const versionId in state.testValues[testId]) {
      if (isReady(state.testValues[testId][versionId])) {
        tests.push({ testId, versionId });
      }
    }
  }
  return tests;
};

export const getLoadedValuesData = state => {
  const tests = [];
  for (const testId in state.testValues) {
    for (const versionId in state.testValues[testId]) {
      if (isReady(state.testValues[testId][versionId])) {
        tests.push({
          testId,
          versionId,
          ...getJsData(state.testValues[testId][versionId])
        });
      }
    }
  }
  return tests;
};
