import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import ResourceRenderer from '../../utils/ResourceRenderer';
import { PlusIcon, MinusIcon } from '../../icons';
import TestSecondaryList from '../TestSecondaryList/TestSecondaryList';

import '../TestList/TestList.css';

class VersionPrimaryListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { folded: true };
  }

  onUnfold(e) {
    this.setState({ folded: false });
    e.stopPropagation();
  }

  onFold(e) {
    this.setState({ folded: true });
    e.stopPropagation();
  }

  render() {
    const { version, tests } = this.props;
    var rowClass = 'Test-container-row';

    return (
      <div className="Test-container">
        <Row className={rowClass}>
          <Col xs={1} className="Test-icon-col">
            {this.state.folded ? (
              <PlusIcon
                size="2x"
                onClick={e => this.onUnfold(e)}
                className="Test-icon"
              />
            ) : (
              <MinusIcon
                size="2x"
                onClick={e => this.onFold(e)}
                className="Test-icon"
              />
            )}
          </Col>
          <Col xs={11} className="Test-texts-col">
            <span className="Test-title">
              {version.id.indexOf('-') > 0
                ? version.id.substring(version.id.indexOf('-') + 1)
                : version.id}
            </span>
            <br />
            <span className="Test-id">
              {version.timestamp === 0
                ? '–'
                : new Date(version.timestamp * 1000).toLocaleString()}
            </span>
          </Col>
        </Row>
        {!this.state.folded && (
          <TestSecondaryList versionId={version.id} tests={tests} />
        )}
      </div>
    );
  }
}

VersionPrimaryListItem.propTypes = {};

export default VersionPrimaryListItem;
