import React from 'react';
import PropTypes from 'prop-types';

import '../List.css';
import TestListItem from './TestListItem';

const TestList = ({
  tests = [],
  commonState,
  fetchVersions,
  fetchValues,
  removeValues,
  setActiveTest
}) => (
  <div>
    {tests
      .sort((a, b) => a.id.localeCompare(b.id))
      .map((test, i) => (
        <TestListItem
          key={i}
          test={test}
          commonState={commonState}
          fetchVersions={() => fetchVersions(test.id)}
          fetchValues={versionId => fetchValues(test.id, versionId)}
          removeValues={versionId => removeValues(test.id, versionId)}
          setActive={() => setActiveTest(test.id)}
        />
      ))}
  </div>
);

TestList.propTypes = {
  tests: PropTypes.array,
  commonState: PropTypes.object,
  fetchVersions: PropTypes.func,
  fetchValues: PropTypes.func,
  removeValues: PropTypes.func,
  setActiveTest: PropTypes.func
};

export default TestList;
