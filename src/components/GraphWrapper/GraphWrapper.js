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
  state = { splitRuns: false, graphType: 'scatter' };

  prepareNormalData(data) {
    return data.map(item => ({
      name: `${item.testId} - ${item.versionId}`,
      values: [].concat.apply([], item.data)
    }));
  }

  prepareSplitData(data) {
    let result = [];

    for (let item of data) {
      for (let i = 0; i < item.data.length; i++) {
        result.push({
          name: `${item.testId} - ${item.versionId} - run ${i}`,
          values: item.data[i]
        });
      }
    }

    return result;
  }

  render() {
    const data = this.props.values;
    return (
      <div className="responsive-plot-container">
        <Form inline className="pull-right">
          <FormGroup>
            <ControlLabel>Split runs:</ControlLabel>
            &nbsp;
            <Checkbox
              onChange={e =>
                this.setState({ splitRuns: !this.state.splitRuns })}
            />
          </FormGroup>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <FormGroup>
            <ControlLabel>Type:</ControlLabel>
            &nbsp;
            <FormControl
              componentClass="select"
              onChange={e => this.setState({ graphType: e.target.value })}
            >
              <option value="scatter">Scatter</option>
              <option value="histogram">Histogram</option>
              <option value="box">Box plot</option>
            </FormControl>
          </FormGroup>
        </Form>
        <Graph
          data={
            this.state.splitRuns
              ? this.prepareSplitData(data)
              : this.prepareNormalData(data)
          }
          type={this.state.graphType}
        />
      </div>
    );
  }
}

GraphWrapper.propTypes = {
  values: PropTypes.array
};

export default GraphWrapper;
