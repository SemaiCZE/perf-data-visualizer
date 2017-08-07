import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { VersionIcon } from '../../icons';

const VersionListItem = ({ version }) =>
  <div>
    <Row className="Version-container-row">
      <Col xs={1}>
        <VersionIcon className="Version-icon" />
      </Col>
      <Col xs={11}>
        <Row>
          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip id="tooltip">
                {version.id}
              </Tooltip>
            }
          >
            <Col className="Version-title">
              <span>
                {version.id}
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
            <Button
              bsSize="xsmall"
              bsStyle="primary"
              className="Version-load-button"
            >
              Load
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>;

VersionListItem.propTypes = {
  version: PropTypes.object.isRequired
};

export default VersionListItem;
