import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

import './LoadedValuesList.css';

const LoadedValuesListItem = ({ value, onDelete }) => (
  <Row className="Loaded-item">
    <Col xs={11} className="Loaded-text-col">
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id="tooltip">{'loaded-' + value.testId}</Tooltip>}
      >
        <span className="Loaded-text-id">{value.testId}</span>
      </OverlayTrigger>
      <br />
      <span>{value.versionId}</span>
    </Col>
    <Col xs={1} className="Loaded-close-col">
      <Button className="Loaded-close-btn" bsStyle="link" onClick={onDelete}>
        &times;
      </Button>
    </Col>
  </Row>
);

LoadedValuesListItem.propTypes = {
  value: PropTypes.object,
  onDelete: PropTypes.func
};

export default LoadedValuesListItem;
