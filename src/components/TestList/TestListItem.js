import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { PlusIcon, MinusIcon } from '../../icons';

import './TestList.css';

class TestListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { folded: true };
  }

  onFoldChange() {
    this.setState((prevState, props) => {
      return { folded: !prevState.folded };
    });
  }

  render() {
    const { test } = this.props;

    return (
      <div className="Test-container">
        <Row>
          <Col xs={1} className="Test-icon-col">
            {this.state.folded
              ? <PlusIcon
                  size="2x"
                  onClick={() => this.onFoldChange()}
                  className="Test-icon"
                />
              : <MinusIcon
                  size="2x"
                  onClick={() => this.onFoldChange()}
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
      </div>
    );
  }
}

TestListItem.propTypes = {
  test: PropTypes.object.isRequired
};

export default TestListItem;
