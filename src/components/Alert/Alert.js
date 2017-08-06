import React from 'react';
import PropTypes from 'prop-types';

import { Alert, Button } from 'react-bootstrap';
import { RefreshIcon } from '../../icons';
import './Alert.css';

const ErrorAlert = ({ error, onDismiss }) =>
  <Alert bsStyle="danger" className="Alert-container" onDismiss={onDismiss}>
    <h4>You got an error!</h4>
    <p>
      {error.message}
    </p>
    {error.refresh &&
      <Button onClick={error.refresh}>
        <RefreshIcon /> Refresh
      </Button>}
  </Alert>;

ErrorAlert.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
    refresh: PropTypes.func
  }),
  onDismiss: PropTypes.func.isRequired
};

export default ErrorAlert;
