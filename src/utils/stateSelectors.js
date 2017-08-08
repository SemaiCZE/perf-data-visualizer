import { isReady, isLoading, hasFailed, isEmpty } from './stateHelpers';

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
  isTestDataSomething(isEmpty)(state, testId, versionId);
