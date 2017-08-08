import { isReady } from './stateHelpers';

export const isTestDataReady = (state, testId, versionId) =>
  state.testValues &&
  state.testValues[testId] &&
  state.testValues[testId][versionId] &&
  isReady(state.testValues[testId][versionId]);
