import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ButtonGroup,
  FormGroup,
  FormControl,
  InputGroup
} from 'react-bootstrap';

import './List.css';
import TestList from './TestPrimaryList/TestList';
import VersionList from './VersionPrimaryList/VersionList';
import { SearchIcon } from '../../icons';
import AdvancedLoad from '../AdvancedLoad/AdvancedLoad';

class SearchableList extends Component {
  state = { versionsFirst: false, advancedLoadOpen: false };

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

  testVersionChange(versionsFirst) {
    this.setState((prevState, props) => {
      return {
        versionsFirst: versionsFirst
      };
    });
  }

  advancedLoadChange(isOpen) {
    this.setState((prevState, props) => {
      return {
        advancedLoadOpen: isOpen
      };
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
      fetchValues,
      removeValues,
      setActiveTest
    } = this.props;

    const groupButtonClass = 'groupButton';
    const groupButtonActiveClass = `${groupButtonClass} groupButtonActive`;

    return (
      <div>
        <ButtonGroup className="testVersionGroup">
          <Button
            className={
              this.state.versionsFirst
                ? groupButtonClass
                : groupButtonActiveClass
            }
            onClick={() => this.testVersionChange(false)}
          >
            Tests
          </Button>
          <Button
            className={
              this.state.versionsFirst
                ? groupButtonActiveClass
                : groupButtonClass
            }
            onClick={() => this.testVersionChange(true)}
          >
            Versions
          </Button>
          <Button
            className={groupButtonClass}
            onClick={() => this.advancedLoadChange(true)}
          >
            Advanced Load
          </Button>
        </ButtonGroup>

        <form style={{ padding: '10px' }}>
          <FormGroup className="Primary-search-group">
            <InputGroup>
              <FormControl
                className="Primary-search-inner"
                placeholder="Search"
                onChange={e => {
                  this.query = e.target.value;
                  e.preventDefault();
                  this.onChange(this.query, tests);
                }}
              />
              <InputGroup.Button>
                <Button
                  className="Primary-search-inner"
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

        {!this.state.versionsFirst && (
          <TestList
            tests={this.state.visibleTests}
            commonState={commonState}
            fetchVersions={fetchVersions}
            fetchValues={fetchValues}
            removeValues={removeValues}
            setActiveTest={setActiveTest}
          />
        )}

        {this.state.versionsFirst && (
          <VersionList
            tests={tests}
            commonState={commonState}
            query={this.query}
            fetchVersions={fetchVersions}
            fetchValues={fetchValues}
            removeValues={removeValues}
          />
        )}
        <AdvancedLoad
          isOpen={this.state.advancedLoadOpen}
          onClose={() => this.advancedLoadChange(false)}
          tests={tests}
          commonState={commonState}
          fetchVersions={fetchVersions}
          fetchValues={fetchValues}
        />
      </div>
    );
  }
}

SearchableList.propTypes = {
  tests: PropTypes.array,
  commonState: PropTypes.object,
  fetchVersions: PropTypes.func,
  fetchValues: PropTypes.func,
  removeValues: PropTypes.func,
  setActiveTest: PropTypes.func
};

export default SearchableList;
