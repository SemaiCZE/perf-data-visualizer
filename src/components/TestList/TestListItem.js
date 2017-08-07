import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import ResourceRenderer from '../../utils/ResourceRenderer';
import { PlusIcon, MinusIcon } from '../../icons';
import VersionList from '../VersionList/VersionList';
import FailedVersionList from '../VersionList/FailedVersionList';
import LoadingVersionList from '../VersionList/LoadingVersionList';

import './TestList.css';

class TestListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { folded: true };
  }

  onUnfold() {
    const { fetchVersions } = this.props;

    fetchVersions();
    this.setState({ folded: false });
  }

  onFold() {
    this.setState({ folded: true });
  }

  render() {
    const { test, commonState } = this.props;

    return (
      <div className="Test-container">
        <Row className="Test-container-row">
          <Col xs={1} className="Test-icon-col">
            {this.state.folded
              ? <PlusIcon
                  size="2x"
                  onClick={() => this.onUnfold()}
                  className="Test-icon"
                />
              : <MinusIcon
                  size="2x"
                  onClick={() => this.onFold()}
                  className="Test-icon"
                />}
          </Col>
          <Col xs={11} className="Test-texts-col">
            <span className="Test-title">
              {test.name}
            </span>
            <br />
            <span className="Test-id">
              {test.id}
            </span>
          </Col>
        </Row>
        {!this.state.folded &&
          <ResourceRenderer
            resource={commonState.testVersions[test.id]}
            loading={LoadingVersionList}
            failed={FailedVersionList}
          >
            {versions =>
              <VersionList versions={versions} commonState={commonState} />}
          </ResourceRenderer>}
      </div>
    );
  }
}

TestListItem.propTypes = {
  test: PropTypes.object.isRequired,
  commonState: PropTypes.object,
  fetchVersions: PropTypes.func
};

export default TestListItem;
