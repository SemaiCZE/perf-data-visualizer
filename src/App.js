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
import FailedTestList from './components/TestList/FailedTestList';
import AlertError from './components/Alert/Alert';

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

  // ***************************
  // Fetching and modifying data
  // ***************************

  fetchTests = () => {
    this.setState({
      tests: createStateEntry(statusTypes.LOADING)
    });
    const onSuccess = data =>
      this.setState({ tests: createStateEntry(statusTypes.FULFILED, data) });
    const onError = error =>
      this.setState({
        tests: createStateEntry(statusTypes.FAILED),
        error: {
          message: error.message,
          refresh: () => {
            this.clearError();
            this.fetchTests();
          }
        }
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
        newTestVersions[testId] = createStateEntry(statusTypes.FAILED);
        return {
          testVersions: newTestVersions,
          error: {
            message: error.message,
            refresh: () => {
              this.clearError();
              this.fetchTestVersions(testId);
            }
          }
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
        newTestValues[testId][versionId] = createStateEntry(statusTypes.FAILED);
        return {
          testValues: newTestValues,
          error: {
            message: error.message,
            refresh: () => {
              this.clearError();
              this.fetchTestValues(testId, versionId);
            }
          }
        };
      });
    apiFetchTestValues(testId, versionId)(onSuccess, onError);
  };

  clearError = () => this.setState({ error: null });

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
              failed={FailedTestList}
            >
              {tests => <TestList tests={tests} />}
            </ResourceRenderer>
          </Col>
          <Col xs={9} className="App-content-col">
            {this.state.error &&
              <AlertError
                error={this.state.error}
                onDismiss={this.clearError}
              />}
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
