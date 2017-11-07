import React from 'react';
import { LoadingIcon } from '../../../icons';

import '../SecondaryList.css';

const FailedVersionList = (
  <div className="Versions-container Version-loading-failed">
    <LoadingIcon /> <span>Loading ...</span>
  </div>
);

export default FailedVersionList;
