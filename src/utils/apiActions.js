const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};

const parseJSON = response => response.json();

const apiGetRequest = endpoint => (onSuccess, onError = null) =>
  fetch(process.env.REACT_APP_API_BASE + endpoint)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => onSuccess(data.payload))
    .catch(error => onError && onError(error));

export const apiFetchTests = () => apiGetRequest('/tests');
export const apiFetchTestVersions = testId =>
  apiGetRequest(`/tests/${testId}/revisions`);
export const apiFetchTestValues = (testId, revisionId) =>
  apiGetRequest(`/tests/${testId}/revisions/${revisionId}/data`);
