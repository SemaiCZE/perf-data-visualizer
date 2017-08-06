import {
  apiFetchTests,
  apiFetchTestVersions,
  apiFetchTestValues
} from './apiActions';
import { statusTypes, createStateEntry } from './stateHelpers';

export const stateFetchTests = setState => () => {
  setState({
    tests: createStateEntry(statusTypes.LOADING)
  });
  const onSuccess = data =>
    setState({ tests: createStateEntry(statusTypes.FULFILED, data) });
  const onError = error =>
    setState({
      tests: createStateEntry(statusTypes.FAILED),
      error: {
        message: error.message,
        refresh: () => {
          stateClearError(setState)();
          stateFetchTests(setState)();
        }
      }
    });
  apiFetchTests()(onSuccess, onError);
};

export const stateFetchTestVersions = setState => testId => {
  setState((prevState, props) => {
    const newTestVersions = prevState.testVersions;
    newTestVersions[testId] = createStateEntry(statusTypes.LOADING);
    return { testVersions: newTestVersions };
  });
  const onSuccess = data =>
    setState((prevState, props) => {
      const newTestVersions = prevState.testVersions;
      newTestVersions[testId] = createStateEntry(statusTypes.FULFILED, data);
      return { testVersions: newTestVersions };
    });
  const onError = error =>
    setState((prevState, props) => {
      const newTestVersions = prevState.testVersions;
      newTestVersions[testId] = createStateEntry(statusTypes.FAILED);
      return {
        testVersions: newTestVersions,
        error: {
          message: error.message,
          refresh: () => {
            stateClearError(setState)();
            stateFetchTestVersions(setState)(testId);
          }
        }
      };
    });
  apiFetchTestVersions(testId)(onSuccess, onError);
};

export const stateFetchTestValues = setState => (testId, versionId) => {
  setState((prevState, props) => {
    const newTestValues = prevState.testValues;
    if (!newTestValues[testId]) {
      newTestValues[testId] = {};
    }
    newTestValues[testId][versionId] = createStateEntry(statusTypes.LOADING);
    return { testValues: newTestValues };
  });
  const onSuccess = data =>
    setState((prevState, props) => {
      const newTestValues = prevState.testValues;
      newTestValues[testId][versionId] = createStateEntry(
        statusTypes.FULFILED,
        data
      );
      return { testValues: newTestValues };
    });
  const onError = error =>
    setState((prevState, props) => {
      const newTestValues = prevState.testValues;
      newTestValues[testId][versionId] = createStateEntry(statusTypes.FAILED);
      return {
        testValues: newTestValues,
        error: {
          message: error.message,
          refresh: () => {
            stateClearError(setState)();
            stateFetchTestValues(setState)(testId, versionId);
          }
        }
      };
    });
  apiFetchTestValues(testId, versionId)(onSuccess, onError);
};

export const stateClearError = setState => () => setState({ error: null });
