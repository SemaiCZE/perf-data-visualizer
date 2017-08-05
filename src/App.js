import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  apiFetchTests,
  apiFetchTestVersions,
  apiFetchTestValues
} from './utils/apiActions';
import {
  initialState,
  statusTypes,
  createStateEntry
} from './utils/stateHelpers';

class App extends Component {
  // ********************
  // Initialize component
  // ********************

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.fetchTests();
  }

  // *************
  // Fetching data
  // *************

  fetchTests = () => {
    this.setState({
      tests: createStateEntry(statusTypes.LOADING)
    });
    const onSuccess = data =>
      this.setState({ tests: createStateEntry(statusTypes.FULFILED, data) });
    const onError = error =>
      this.setState({
        tests: createStateEntry(),
        error: error
      });
    apiFetchTests()(onSuccess, onError);
  };

  fetchTestVersions = testId => {
    this.setState((prevState, props) => {
      const newTestVersions = prevState.testVersions;
      newTestVersions[testId] = createStateEntry(statusTypes.LOADING);
      return { testVersions: newTestVersions };
    });
    const onSuccess = data =>
      this.setState((prevState, props) => {
        const newTestVersions = prevState.testVersions;
        newTestVersions[testId] = createStateEntry(statusTypes.FULFILED, data);
        return { testVersions: newTestVersions };
      });
    const onError = error =>
      this.setState((prevState, props) => {
        const newTestVersions = prevState.testVersions;
        newTestVersions[testId] = createStateEntry();
        return {
          testVersions: newTestVersions,
          error: error
        };
      });
    apiFetchTestVersions(testId)(onSuccess, onError);
  };

  fetchTestValues = (testId, versionId) => {
    this.setState((prevState, props) => {
      const newTestValues = prevState.testValues;
      if (!newTestValues[testId]) {
        newTestValues[testId] = {};
      }
      newTestValues[testId][versionId] = createStateEntry(statusTypes.LOADING);
      return { testValues: newTestValues };
    });
    const onSuccess = data =>
      this.setState((prevState, props) => {
        const newTestValues = prevState.testValues;
        newTestValues[testId][versionId] = createStateEntry(
          statusTypes.FULFILED,
          data
        );
        return { testValues: newTestValues };
      });
    const onError = error =>
      this.setState((prevState, props) => {
        const newTestValues = prevState.testValues;
        newTestValues[testId][versionId] = createStateEntry();
        return {
          testValues: newTestValues,
          error: error
        };
      });
    apiFetchTestValues(testId, versionId)(onSuccess, onError);
  };

  // ***********
  // Render page
  // ***********

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
