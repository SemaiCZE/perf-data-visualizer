import {
  apiFetchTests,
  apiFetchTestVersions,
  apiFetchTestValues
} from './apiActions';
import { statusTypes, createStateEntry, isReady } from './stateHelpers';

export const stateFetchTests = setState => () => {
  setState({
    tests: createStateEntry(statusTypes.LOADING)
  });
  const onSuccess = data => {
    setState({ tests: createStateEntry(statusTypes.FULFILED, data) });
    return Promise.resolve(data);
  };
  const onError = error => {
    setState({
      tests: createStateEntry(statusTypes.FAILED),
      error: {
        message: error.message,
        refresh: () => {
          stateClearError(setState)();
          return stateFetchTests(setState)();
        }
      }
    });
    // return Promise.reject(error);
  };
  return apiFetchTests()(onSuccess, onError);
};

export const stateFetchTestVersions = setState => testId => {
  setState((prevState, props) => {
    const newTestVersions = prevState.testVersions;
    newTestVersions[testId] = createStateEntry(statusTypes.LOADING);
    return { testVersions: newTestVersions };
  });
  const onSuccess = data => {
    setState((prevState, props) => {
      const newTestVersions = prevState.testVersions;
      newTestVersions[testId] = createStateEntry(statusTypes.FULFILED, data);
      return { testVersions: newTestVersions };
    });
    return Promise.resolve(data);
  };
  const onError = error => {
    setState((prevState, props) => {
      const newTestVersions = prevState.testVersions;
      newTestVersions[testId] = createStateEntry(statusTypes.FAILED);
      return {
        testVersions: newTestVersions,
        error: {
          message: error.message,
          refresh: () => {
            stateClearError(setState)();
            return stateFetchTestVersions(setState)(testId);
          }
        }
      };
    });
    // return Promise.reject(error);
  };
  return apiFetchTestVersions(testId)(onSuccess, onError);
};

export const stateFetchTestVersionsIfNeeded = (
  getState,
  setState
) => testId => {
  if (!isReady(getState().testVersions[testId])) {
    return stateFetchTestVersions(setState)(testId);
  } else {
    return Promise.resolve(getState().testVersions[testId].data);
  }
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
  const onSuccess = data => {
    setState((prevState, props) => {
      const newTestValues = prevState.testValues;
      newTestValues[testId][versionId] = createStateEntry(
        statusTypes.FULFILED,
        data
      );
      return { testValues: newTestValues };
    });
    return Promise.resolve(data);
  };
  const onError = error => {
    setState((prevState, props) => {
      const newTestValues = prevState.testValues;
      newTestValues[testId][versionId] = createStateEntry(statusTypes.FAILED);
      return {
        testValues: newTestValues,
        error: {
          message: error.message,
          refresh: () => {
            stateClearError(setState)();
            return stateFetchTestValues(setState)(testId, versionId);
          }
        }
      };
    });
    // return Promise.reject(error);
  };
  return apiFetchTestValues(testId, versionId)(onSuccess, onError);
};

export const stateRemoveTestValues = setState => (testId, versionId) => {
  setState((prevState, props) => {
    const newTestValues = prevState.testValues;
    if (!newTestValues[testId]) {
      newTestValues[testId] = {};
    }
    newTestValues[testId][versionId] = createStateEntry(statusTypes.EMPTY);
    return { testValues: newTestValues };
  });
};

export const stateClearError = setState => () => setState({ error: null });

export const stateSetActiveTest = setState => testId =>
  setState({ activeTestId: testId });
