import React from 'react';
import PropTypes from 'prop-types';

import TestSecondaryListItem from './TestSecondaryListItem';
import '../VersionList/VersionList.css';

const TestSecondaryList = ({ versionId, tests = [] }) => (
  <div className="Versions-container">
    {tests.map((test, i) => (
      <TestSecondaryListItem key={i} versionId={versionId} test={test} />
    ))}
  </div>
);

TestSecondaryList.propTypes = {};

export default TestSecondaryList;
