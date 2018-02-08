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
import '../SecondaryList.css';

const VersionListItem = ({
  testId,
  version,
  commonState,
  fetchValues,
  removeValues
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
              overlay={<Tooltip id="tooltip">{version.id}</Tooltip>}
            >
              <Col className="Version-title">
                <span>
                  {version.id.indexOf('-') > 0
                    ? version.id.substring(version.id.lastIndexOf('-') + 1)
                    : version.id}
                </span>
              </Col>
            </OverlayTrigger>
          </Row>
          <Row>
            <Col xs={8} className="Version-timestamp">
              {version.timestamp === 0
                ? '–'
                : new Date(version.timestamp * 1000).toLocaleString()}
            </Col>
            <Col xs={4}>
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
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );

VersionListItem.propTypes = {
  testId: PropTypes.string.isRequired,
  version: PropTypes.object.isRequired,
  commonState: PropTypes.object,
  fetchValues: PropTypes.func,
  removeValues: PropTypes.func
};

export default VersionListItem;
