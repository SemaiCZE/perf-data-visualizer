import React from 'react';
import PropTypes from 'prop-types';

import './TestList.css';
import TestListItem from './TestListItem';

const TestList = ({ tests = [] }) =>
  <div>
    {tests.map((test, i) => <TestListItem key={i} test={test} />)}
  </div>;

TestList.propTypes = {
  tests: PropTypes.array
};

export default TestList;
