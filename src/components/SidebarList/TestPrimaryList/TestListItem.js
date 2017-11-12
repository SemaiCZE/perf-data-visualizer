import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ResourceRenderer from '../../../utils/ResourceRenderer';
import { PlusIcon, MinusIcon } from '../../../icons';
import VersionList from '../VersionSecondaryList/VersionList';
import FailedVersionList from '../VersionSecondaryList/FailedVersionList';
import LoadingVersionList from '../VersionSecondaryList/LoadingVersionList';

import '../List.css';

class TestListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { folded: true };
  }

  onUnfold(e) {
    const { fetchVersions } = this.props;

    fetchVersions();
    this.setState({ folded: false });
    e.stopPropagation();
  }

  onFold(e) {
    this.setState({ folded: true });
    e.stopPropagation();
  }

  render() {
    const {
      test,
      commonState,
      setActive,
      fetchValues,
      removeValues
    } = this.props;
    var rowClass = 'Primary-container-row';
    if (commonState.activeTestId === test.id) {
      rowClass += ' Primary-active';
    }

    return (
      <div className="Primary-container">
        <Row className={rowClass} onClick={setActive}>
          <Col xs={1} className="Primary-icon-col">
            {this.state.folded ? (
              <PlusIcon
                size="2x"
                onClick={e => this.onUnfold(e)}
                className="Primary-icon"
              />
            ) : (
              <MinusIcon
                size="2x"
                onClick={e => this.onFold(e)}
                className="Primary-icon"
              />
            )}
          </Col>
          <Col xs={11} className="Primary-texts-col">
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip id="tooltip">{test.id}</Tooltip>}
            >
              <Col className="Primary-title">
                <span>{test.name}</span>
              </Col>
            </OverlayTrigger>
            <span className="Primary-id">
              {test.id.substring(test.id.indexOf('@'))}
            </span>
          </Col>
        </Row>
        {!this.state.folded && (
          <ResourceRenderer
            resource={commonState.testVersions[test.id]}
            loading={LoadingVersionList}
            failed={FailedVersionList}
          >
            {versions => (
              <VersionList
                testId={test.id}
                versions={versions.sort((a, b) => b.timestamp - a.timestamp)}
                commonState={commonState}
                fetchValues={fetchValues}
                removeValues={removeValues}
              />
            )}
          </ResourceRenderer>
        )}
      </div>
    );
  }
}

TestListItem.propTypes = {
  test: PropTypes.object.isRequired,
  commonState: PropTypes.object,
  fetchVersions: PropTypes.func,
  fetchValues: PropTypes.func,
  removeValues: PropTypes.func,
  setActive: PropTypes.func
};

export default TestListItem;
