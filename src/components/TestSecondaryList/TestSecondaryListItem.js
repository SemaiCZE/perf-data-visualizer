import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

import {
  isTestDataReady,
  isTestDataLoading,
  hasTestDataFailed,
  isTestDataEmpty
} from '../../utils/stateSelectors';
import { VersionIcon } from '../../icons';

const TestSecondaryListItem = ({ versionId, test }) => (
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
          {/*<Col xs={4}>
            {isTestDataReady(commonState, testId, version.id) && (
              <Button
                bsSize="xsmall"
                bsStyle="danger"
                className="Version-load-button"
                onClick={removeValues}
              >
                Remove
              </Button>
            )}
            {isTestDataLoading(commonState, testId, version.id) && (
              <Button
                bsSize="xsmall"
                bsStyle="primary"
                className="Version-load-button"
                disabled
              >
                Loading ...
              </Button>
            )}
            {hasTestDataFailed(commonState, testId, version.id) && (
              <Button
                bsSize="xsmall"
                bsStyle="warning"
                className="Version-load-button"
                onClick={fetchValues}
              >
                Loading failed, try again
              </Button>
            )}
            {isTestDataEmpty(commonState, testId, version.id) && (
              <Button
                bsSize="xsmall"
                bsStyle="primary"
                className="Version-load-button"
                onClick={fetchValues}
              >
                Load
              </Button>
            )}
          </Col>*/}
        </Row>
      </Col>
    </Row>
  </div>
);

TestSecondaryListItem.propTypes = {};

export default TestSecondaryListItem;
