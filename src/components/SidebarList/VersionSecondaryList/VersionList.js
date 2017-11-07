import React from 'react';
import PropTypes from 'prop-types';

import VersionListItem from './VersionListItem';
import '../SecondaryList.css';

const VersionList = ({
  testId,
  versions = [],
  commonState,
  fetchValues,
  removeValues
}) => (
  <div className="Versions-container">
    {versions.map((version, i) => (
      <VersionListItem
        key={i}
        testId={testId}
        version={version}
        commonState={commonState}
        fetchValues={() => fetchValues(version.id)}
        removeValues={() => removeValues(version.id)}
      />
    ))}
  </div>
);

VersionList.propTypes = {
  testId: PropTypes.string,
  versions: PropTypes.array,
  commonState: PropTypes.object,
  fetchValues: PropTypes.func,
  removeValues: PropTypes.func
};

export default VersionList;
