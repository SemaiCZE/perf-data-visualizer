import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';

import LoadedValuesListItem from './LoadedValuesListItem';
import { TrashIcon } from '../../icons';
import './LoadedValuesList.css';

const LoadedValuesList = ({ values = [], onDelete }) =>
  <Row className="Loaded-container">
    <Col xs={11} className="Col-no-padding">
      {values.map((value, i) =>
        <Col key={i} xs={4}>
          <LoadedValuesListItem
            value={value}
            onDelete={() => onDelete(value.testId, value.versionId)}
          />
        </Col>
      )}
    </Col>
    <Col xs={1} className="Col-no-padding">
      <Button className="Delete-all-btn" bsStyle="link" onClick={() => values.map(value => onDelete(value.testId, value.versionId))}>
        <TrashIcon />
      </Button>
    </Col>
  </Row>;

LoadedValuesList.propTypes = {
  values: PropTypes.array,
  onDelete: PropTypes.func
};

export default LoadedValuesList;
