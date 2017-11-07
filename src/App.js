import React, { Component } from 'react';
import './App.css';
import { initialState } from './utils/stateHelpers';
import { Grid, Row, Col } from 'react-bootstrap';

import {
  stateFetchTests,
  stateFetchTestVersionsIfNeeded,
  stateFetchTestValues,
  stateRemoveTestValues,
  stateClearError,
  stateSetActiveTest
} from './utils/stateModifiers';
import { getLoadedValues, getLoadedValuesData } from './utils/stateSelectors';
import ResourceRenderer from './utils/ResourceRenderer';
import SearchableList from './components/SidebarList/SearchableList';
import LoadingList from './components/SidebarList/LoadingList';
import FailedList from './components/SidebarList/FailedList';
import ErrorAlert from './components/Alert/Alert';
import TestInfo from './components/TestInfo/TestInfo';
import LoadedValuesList from './components/LoadedValuesList/LoadedValuesList';
import GraphWrapper from './components/GraphWrapper/GraphWrapper';

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
  fetchTestVersions = stateFetchTestVersionsIfNeeded(
    () => this.state,
    (...props) => this.setState(...props)
  );
  fetchTestValues = stateFetchTestValues((...props) => this.setState(...props));
  removeTestValues = stateRemoveTestValues((...props) =>
    this.setState(...props)
  );
  clearError = stateClearError((...props) => this.setState(...props));
  setActiveTest = stateSetActiveTest((...props) => this.setState(...props));

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
          <Col xs={4} lg={3} className="App-content-col Tests-col">
            <ResourceRenderer
              resource={this.state.tests}
              loading={LoadingList}
              failed={FailedList}
            >
              {tests => (
                <SearchableList
                  tests={tests}
                  commonState={this.state}
                  fetchVersions={this.fetchTestVersions}
                  setActiveTest={this.setActiveTest}
                  fetchValues={this.fetchTestValues}
                  removeValues={this.removeTestValues}
                />
              )}
            </ResourceRenderer>
          </Col>
          <Col xs={8} lg={9} className="App-content-col">
            <div style={{ paddingBottom: '70px' }}>
              {this.state.error && (
                <ErrorAlert
                  error={this.state.error}
                  onDismiss={this.clearError}
                />
              )}
              {this.state.activeTestId && (
                <TestInfo
                  test={this.state.tests.data.find(
                    element => element.id === this.state.activeTestId
                  )}
                  onDismiss={() => this.setActiveTest(null)}
                />
              )}
              <GraphWrapper values={getLoadedValuesData(this.state)} />
            </div>

            <LoadedValuesList
              values={getLoadedValues(this.state)}
              onDelete={this.removeTestValues}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
