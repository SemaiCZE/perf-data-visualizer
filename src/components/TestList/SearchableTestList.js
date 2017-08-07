import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, FormGroup, FormControl, InputGroup } from 'react-bootstrap';

import './TestList.css';
import TestList from './TestList';
import { SearchIcon } from '../../icons';

class SearchableTestList extends Component {
  componentWillMount() {
    this.query = '';
    this.setState({ visibleTests: [] });
  }

  componentDidMount() {
    const { tests } = this.props;
    this.setState({ visibleTests: tests });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visibleTests: nextProps.tests
    });
  }

  onChange(query, allTests) {
    const normalizedQuery = query.toLocaleLowerCase();
    const filteredTests = allTests.filter(
      test => test.id.toLocaleLowerCase().search(normalizedQuery) !== -1
    );
    this.setState({
      visibleTests: filteredTests
    });
  }

  render() {
    const {
      tests = [],
      commonState,
      fetchVersions,
      setActiveTest
    } = this.props;

    return (
      <div>
        <form style={{ padding: '10px' }}>
          <FormGroup className="Test-search-group">
            <InputGroup>
              <FormControl
                className="Test-search-inner"
                placeholder="Search"
                onChange={e => {
                  this.query = e.target.value;
                  e.preventDefault();
                  this.onChange(this.query, tests);
                }}
              />
              <InputGroup.Button>
                <Button
                  className="Test-search-inner"
                  type="submit"
                  onClick={e => {
                    e.preventDefault();
                    this.onChange(this.query, tests);
                  }}
                  disabled={false}
                >
                  <SearchIcon />
                </Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </form>
        <TestList
          tests={this.state.visibleTests}
          commonState={commonState}
          fetchVersions={fetchVersions}
          setActiveTest={setActiveTest}
        />
      </div>
    );
  }
}

SearchableTestList.propTypes = {
  tests: PropTypes.array,
  commonState: PropTypes.object,
  fetchVersions: PropTypes.func,
  setActiveTest: PropTypes.func
};

export default SearchableTestList;
