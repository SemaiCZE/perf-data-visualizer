import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Checkbox
} from 'react-bootstrap';
import Graph from '../Graph/Graph';

class GraphWrapper extends Component {
  render() {
    const data = this.props.values;
    const merged = data.map(item => ({
      name: `${item.testId} - ${item.versionId}`,
      y: [].concat.apply([], item.data)
    }));
    return (
      <div className="responsive-plot-container">
        <Form inline className="pull-right">
          <FormGroup>
            <ControlLabel>Split runs:</ControlLabel>
            &nbsp;
            <Checkbox />
          </FormGroup>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <FormGroup>
            <ControlLabel>Type:</ControlLabel>
            &nbsp;
            <FormControl componentClass="select">
              <option value="scatter">Scatter</option>
              <option value="histogram">Histogram</option>
            </FormControl>
          </FormGroup>
        </Form>
        <Graph data={merged} type="scatter" />
      </div>
    );
  }
}

GraphWrapper.propTypes = {
  values: PropTypes.array
};

export default GraphWrapper;
