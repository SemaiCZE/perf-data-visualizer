import React from 'react';
import { WarningIcon } from '../../icons';

import './VersionList.css';

const FailedVersionList = (
  <div className="Versions-container Version-loading-failed">
    <WarningIcon /> <span>Loading failed</span>
  </div>
);

export default FailedVersionList;
