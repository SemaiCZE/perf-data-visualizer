import React, { Component } from 'react';
import './App.css';
import { initialState } from './utils/stateHelpers';
import { Grid, Row, Col } from 'react-bootstrap';

import {
  stateFetchTests,
  stateFetchTestVersions,
  stateFetchTestValues,
  stateClearError
} from './utils/stateModifiers';
import ResourceRenderer from './utils/ResourceRenderer';
import TestList from './components/TestList/TestList';
import LoadingTestList from './components/TestList/LoadingTestList';
import FailedTestList from './components/TestList/FailedTestList';
import ErrorAlert from './components/Alert/Alert';

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

  fetchTests = stateFetchTests((...props) => this.setState(...props));
  fetchTestVersions = stateFetchTestVersions((...props) =>
    this.setState(...props)
  );
  fetchTestValues = stateFetchTestValues((...props) => this.setState(...props));
  clearError = stateClearError((...props) => this.setState(...props));

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
              {tests =>
                <TestList
                  tests={tests}
                  commonState={this.state}
                  fetchVersions={this.fetchTestVersions}
                />}
            </ResourceRenderer>
          </Col>
          <Col xs={9} className="App-content-col">
            {this.state.error &&
              <ErrorAlert
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
