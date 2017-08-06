import React, { Component } from 'react';
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
import { Grid, Row, Col } from 'react-bootstrap';

import ResourceRenderer from './utils/ResourceRenderer';
import TestList from './components/TestList/TestList';
import LoadingTestList from './components/TestList/LoadingTestList';

class App extends Component {
  // ********************
  // Initialize component
  // ********************

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentWillMount() {
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
        tests: createStateEntry(statusTypes.EMPTY),
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
        newTestVersions[testId] = createStateEntry(statusTypes.EMPTY);
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
        newTestValues[testId][versionId] = createStateEntry(statusTypes.EMPTY);
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
      <Grid fluid className="App">
        <Row className="App-header">
          <Col lg={12}>
            <h2>Performance Data Visualizer</h2>
          </Col>
        </Row>
        <Row className="App-content">
          <Col xs={3} className="App-content-col Tests-col">
            <ResourceRenderer
              resource={this.state.tests}
              loading={LoadingTestList}
            >
              {tests => <TestList tests={tests} />}
            </ResourceRenderer>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
