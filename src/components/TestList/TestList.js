import React from 'react';
import PropTypes from 'prop-types';

const TestList = ({ tests }) =>
  <div>
    {tests.map((test, i) =>
      <div key={i}>
        {test.name}
      </div>
    )}
  </div>;

TestList.propTypes = {
  tests: PropTypes.array.isRequired
};

export default TestList;
