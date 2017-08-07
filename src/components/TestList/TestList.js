import React from 'react';
import PropTypes from 'prop-types';

import './TestList.css';
import TestListItem from './TestListItem';

const TestList = ({ tests = [], commonState, fetchVersions, setActiveTest }) =>
  <div>
    {tests.map((test, i) =>
      <TestListItem
        key={i}
        test={test}
        commonState={commonState}
        fetchVersions={() => fetchVersions(test.id)}
        setActive={() => setActiveTest(test.id)}
      />
    )}
  </div>;

TestList.propTypes = {
  tests: PropTypes.array,
  commonState: PropTypes.object,
  fetchVersions: PropTypes.func,
  setActiveTest: PropTypes.func
};

export default TestList;
