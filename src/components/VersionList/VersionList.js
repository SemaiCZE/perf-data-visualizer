import React from 'react';
import PropTypes from 'prop-types';

import VersionListItem from './VersionListItem';
import './VersionList.css';

const VersionList = ({ versions = [], commonState }) =>
  <div className="Versions-container">
    {versions.map((version, i) =>
      <VersionListItem key={i} version={version} commonState={commonState} />
    )}
  </div>;

VersionList.propTypes = {
  versions: PropTypes.array,
  commonState: PropTypes.object
};

export default VersionList;
