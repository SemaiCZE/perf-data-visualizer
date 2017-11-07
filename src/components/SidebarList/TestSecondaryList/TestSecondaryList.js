import React from 'react';
import PropTypes from 'prop-types';

import TestSecondaryListItem from './TestSecondaryListItem';
import '../SecondaryList.css';

const TestSecondaryList = ({
  versionId,
  tests,
  commonState,
  fetchValues,
  removeValues
}) => (
  <div className="Versions-container">
    {tests.map((test, i) => (
      <TestSecondaryListItem
        key={i}
        versionId={versionId}
        test={test}
        commonState={commonState}
        fetchValues={() => fetchValues(test.id)}
        removeValues={() => removeValues(test.id)}
      />
    ))}
  </div>
);

TestSecondaryList.propTypes = {
  versionId: PropTypes.string.isRequired,
  tests: PropTypes.array.isRequired,
  commonState: PropTypes.object.isRequired,
  fetchValues: PropTypes.func.isRequired,
  removeValues: PropTypes.func.isRequired
};

export default TestSecondaryList;
