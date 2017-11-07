import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

import {
  isTestDataReady,
  isTestDataLoading,
  hasTestDataFailed,
  isTestDataEmpty
} from '../../../utils/stateSelectors';
import { VersionIcon } from '../../../icons';

const TestSecondaryListItem = ({
  versionId,
  test,
  commonState,
  removeValues,
  fetchValues
}) => (
  <div>
    <Row className="Version-container-row">
      <Col xs={1}>
        <VersionIcon className="Version-icon" />
      </Col>
      <Col xs={11} className="Version-list-col">
        <Row>
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip id="tooltip">{test.id}</Tooltip>}
          >
            <Col className="Version-title">
              <span>{test.name}</span>
            </Col>
          </OverlayTrigger>
        </Row>
        <Row>
          <Col xs={8} className="Version-timestamp">
            {test.id}
          </Col>
          <Col xs={4}>
            {isTestDataReady(commonState, test.id, versionId) && (
              <Button
                bsSize="xsmall"
                bsStyle="danger"
                className="Version-load-button"
                onClick={removeValues}
              >
                Remove
              </Button>
            )}
            {isTestDataLoading(commonState, test.id, versionId) && (
              <Button
                bsSize="xsmall"
                bsStyle="primary"
                className="Version-load-button"
                disabled
              >
                Loading ...
              </Button>
            )}
            {hasTestDataFailed(commonState, test.id, versionId) && (
              <Button
                bsSize="xsmall"
                bsStyle="warning"
                className="Version-load-button"
                onClick={fetchValues}
              >
                Loading failed, try again
              </Button>
            )}
            {isTestDataEmpty(commonState, test.id, versionId) && (
              <Button
                bsSize="xsmall"
                bsStyle="primary"
                className="Version-load-button"
                onClick={fetchValues}
              >
                Load
              </Button>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
);

TestSecondaryListItem.propTypes = {
  versionId: PropTypes.string.isRequired,
  test: PropTypes.object.isRequired,
  commonState: PropTypes.object.isRequired,
  fetchValues: PropTypes.func.isRequired,
  removeValues: PropTypes.func.isRequired
};

export default TestSecondaryListItem;
