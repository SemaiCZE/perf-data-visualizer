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

const defaultState = { selectedTest: '', loadLast: 10 };

class AdvancedLoad extends Component {
  state = defaultState;

  onModalClose() {
    const { onClose } = this.props;
    this.setState(defaultState);
    onClose();
  }

  render() {
    const { isOpen, tests, fetchVersions, fetchValues } = this.props;

    return (
      <Modal show={isOpen} onHide={() => this.onModalClose()}>
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
          <Row>
            <Col xs={4} className="text-center" />
            <Col xs={4} className="text-center">
              <FormGroup>
                <ControlLabel>N:</ControlLabel>
                &nbsp;
                <FormControl
                  componentClass="input"
                  type="number"
                  min="1"
                  defaultValue={this.state.loadLast}
                  onChange={e =>
                    this.setState({ loadLast: Number(e.target.value) })
                  }
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs={4} className="text-center">
              <Button
                bsStyle="primary"
                disabled={this.state.selectedTest === ''}
                onClick={() =>
                  fetchVersions(this.state.selectedTest)
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
                  fetchVersions(this.state.selectedTest)
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
              >
                Load newer than X
              </Button>
            </Col>
          </Row>
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
