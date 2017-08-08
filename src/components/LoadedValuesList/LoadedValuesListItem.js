import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';

import './LoadedValuesList.css';

const LoadedValuesListItem = ({ value, onDelete }) =>
  <Row className="Loaded-item">
    <Col xs={11} className="Loaded-text-col">
      {value.testId}
      <br />
      {value.versionId}
    </Col>
    <Col xs={1} className="Loaded-close-col">
      <Button className="Loaded-close-btn" bsStyle="link" onClick={onDelete}>
        &times;
      </Button>
    </Col>
  </Row>;

LoadedValuesListItem.propTypes = {
  value: PropTypes.object,
  onDelete: PropTypes.func
};

export default LoadedValuesListItem;
