import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { PlusIcon, MinusIcon } from '../../../icons';
import TestSecondaryList from '../TestSecondaryList/TestSecondaryList';

import '../List.css';

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
    const {
      version,
      tests,
      commonState,
      fetchValues,
      removeValues
    } = this.props;
    var rowClass = 'Primary-container-row';

    return (
      <div className="Primary-container">
        <Row className={rowClass}>
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
            <span className="Primary-title">
              {version.id.indexOf('-') > 0
                ? version.id.substring(version.id.lastIndexOf('-') + 1)
                : version.id}
            </span>
            <br />
            <span className="Primary-id">
              {version.timestamp === 0
                ? '–'
                : new Date(version.timestamp * 1000).toLocaleString()}
            </span>
          </Col>
        </Row>
        {!this.state.folded && (
          <TestSecondaryList
            versionId={version.id}
            tests={tests}
            commonState={commonState}
            fetchValues={fetchValues}
            removeValues={removeValues}
          />
        )}
      </div>
    );
  }
}

VersionPrimaryListItem.propTypes = {
  version: PropTypes.object.isRequired,
  tests: PropTypes.array.isRequired,
  commonState: PropTypes.object.isRequired,
  fetchValues: PropTypes.func.isRequired,
  removeValues: PropTypes.func.isRequired
};

export default VersionPrimaryListItem;
