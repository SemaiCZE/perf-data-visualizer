import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import './LoadedValuesList.css';
import LoadedValuesListItem from './LoadedValuesListItem';

const LoadedValuesList = ({ values = [], onDelete }) =>
  <Row className="Loaded-container">
    {values.map((value, i) =>
      <Col key={i} xs={4}>
        <LoadedValuesListItem
          value={value}
          onDelete={() => onDelete(value.testId, value.versionId)}
        />
      </Col>
    )}
  </Row>;

LoadedValuesList.propTypes = {
  values: PropTypes.array,
  onDelete: PropTypes.func
};

export default LoadedValuesList;
