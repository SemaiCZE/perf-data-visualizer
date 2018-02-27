import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  FormGroup,
  FormControl,
  ControlLabel,
  Row,
  Col
} from 'react-bootstrap';
import Datetime from 'react-datetime';

import './AdvancedLoad.css';
import { LoadingIcon } from '../../icons';

const defaultState = {
  selectedTest: '',
  loadLast: 10,
  dateFrom: new Date(),
  isLoading: false
};

class AdvancedLoad extends Component {
  state = defaultState;

  onModalClose() {
    const { onClose } = this.props;
    onClose();
    this.setState(defaultState);
  }

  setLoading() {
    return Promise.resolve(this.setState({ isLoading: true }));
  }

  render() {
    const { isOpen, tests, fetchVersions, fetchValues } = this.props;

    return (
      <Modal show={isOpen} onHide={() => this.onModalClose()} bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>Advanced Load</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <ControlLabel>Test:</ControlLabel>
            &nbsp;
            <FormControl
              componentClass="select"
              onChange={e => this.setState({ selectedTest: e.target.value })}
            >
              <option value="">...</option>
              {tests.map((test, i) => (
                <option key={i} value={`${test.id}`}>
                  {test.id}
                </option>
              ))}
            </FormControl>
          </FormGroup>
          <hr />
          {!this.state.isLoading && (
            <div>
              <Row className="formRow">
                <Col xs={4} className="text-center" />
                <Col xs={4} className="text-center">
                  <FormGroup>
                    <Col sm={2}>
                      <ControlLabel>N:</ControlLabel>
                    </Col>
                    <Col sm={10}>
                      <FormControl
                        componentClass="input"
                        type="number"
                        min="1"
                        defaultValue={this.state.loadLast}
                        onChange={e =>
                          this.setState({ loadLast: Number(e.target.value) })
                        }
                      />
                    </Col>
                  </FormGroup>
                </Col>
                <Col xs={4} className="text-center">
                  <FormGroup>
                    <Col sm={2}>
                      <ControlLabel>X:</ControlLabel>
                    </Col>
                    <Col sm={10}>
                      <Datetime
                        utc={true}
                        defaultValue={this.state.dateFrom}
                        onChange={value =>
                          this.setState({ dateFrom: value.unix() })
                        }
                      />
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col xs={4} className="text-center">
                  <Button
                    bsStyle="primary"
                    disabled={this.state.selectedTest === ''}
                    onClick={() =>
                      this.setLoading()
                        .then(() => fetchVersions(this.state.selectedTest))
                        .then(versions =>
                          Promise.all(
                            versions.map(version =>
                              fetchValues(this.state.selectedTest, version.id)
                            )
                          )
                        )
                        .then(() => this.onModalClose())
                    }
                  >
                    Load all versions
                  </Button>
                </Col>
                <Col xs={4} className="text-center">
                  <Button
                    bsStyle="primary"
                    disabled={this.state.selectedTest === ''}
                    onClick={() =>
                      this.setLoading()
                        .then(() => fetchVersions(this.state.selectedTest))
                        .then(versions =>
                          Promise.all(
                            versions
                              .filter(
                                (item, i, arr) =>
                                  i + this.state.loadLast >= arr.length
                              )
                              .map(version =>
                                fetchValues(this.state.selectedTest, version.id)
                              )
                          )
                        )
                        .then(() => this.onModalClose())
                    }
                  >
                    Load last N
                  </Button>
                </Col>
                <Col xs={4} className="text-center">
                  <Button
                    bsStyle="primary"
                    disabled={this.state.selectedTest === ''}
                    onClick={() =>
                      this.setLoading()
                        .then(() => fetchVersions(this.state.selectedTest))
                        .then(versions =>
                          Promise.all(
                            versions
                              .filter(
                                item => item.timestamp >= this.state.dateFrom
                              )
                              .map(version =>
                                fetchValues(this.state.selectedTest, version.id)
                              )
                          )
                        )
                        .then(() => this.onModalClose())
                    }
                  >
                    Load newer than X
                  </Button>
                </Col>
              </Row>
            </div>
          )}
          {this.state.isLoading && (
            <Row className="text-center">
              <LoadingIcon className="loadingIcon" />
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.onModalClose()}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

AdvancedLoad.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  fetchVersions: PropTypes.func.isRequired
};

export default AdvancedLoad;
