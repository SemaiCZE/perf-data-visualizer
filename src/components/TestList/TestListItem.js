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
    const { test, commonState, setActive } = this.props;

    return (
      <div className="Test-container">
        <Row className="Test-container-row" onClick={setActive}>
          <Col xs={1} className="Test-icon-col">
            {this.state.folded
              ? <PlusIcon
                  size="2x"
                  onClick={e => this.onUnfold(e)}
                  className="Test-icon"
                />
              : <MinusIcon
                  size="2x"
                  onClick={e => this.onFold(e)}
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
  fetchVersions: PropTypes.func,
  setActive: PropTypes.func
};

export default TestListItem;
