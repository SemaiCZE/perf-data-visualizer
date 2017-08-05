export const statusTypes = {
  EMPTY: 'empty',
  LOADING: 'loading',
  FULFILED: 'fulfiled'
};

export const createStateEntry = (s = statusTypes.EMPTY, d = null) => {
  return {
    status: s,
    data: d
  };
};

export const initialState = {
  tests: createStateEntry(),
  testVersions: {},
  testValues: {},
  error: null
};

export const isEmpty = entry => entry.status === statusTypes.EMPTY;
export const isLoading = entry => entry.status === statusTypes.LOADING;
export const isReady = entry => entry.status === statusTypes.FULFILED;
