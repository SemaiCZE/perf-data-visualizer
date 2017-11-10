import React from 'react';
import { WarningIcon } from '../../icons';

import './List.css';

const FailedList = (
  <div className="Primary-loading-failed">
    <WarningIcon size="2x" /> <span>Loading failed</span>
  </div>
);

export default FailedList;
