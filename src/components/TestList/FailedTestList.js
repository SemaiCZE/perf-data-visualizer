import React from 'react';
import { WarningIcon } from '../../icons';

import './TestList.css';

const FailedTestList = (
  <div className="Test-loading-failed">
    <WarningIcon size="2x" /> <span>Loading failed</span>
  </div>
);

export default FailedTestList;
