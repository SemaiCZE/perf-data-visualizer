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

const getTimestamp = versionId => {
  const dashIndex = versionId.indexOf('-', 2); // ignore 'v-' prefix
  if (dashIndex < 0) {
    return 0;
  }
  return Number(versionId.substring(2, dashIndex));
};

class GraphWrapper extends Component {
  state = {
    splitRuns: false,
    graphType: 'scatter',
    maxBins: 50,
    hideLegend: false
  };

  prepareNormalData(data) {
    return data.map(item => ({
      name: `${item.testId} - ${item.versionId}`,
      values: [].concat.apply([], item.data),
      units: item.units,
      timestamp: getTimestamp(item.versionId)
    }));
  }

  prepareSplitData(data) {
    let result = [];

    for (let item of data) {
      for (let i = 0; i < item.data.length; i++) {
        result.push({
          name: `${item.testId} - ${item.versionId} - run ${i}`,
          values: item.data[i],
          units: item.units,
          timestamp: getTimestamp(item.versionId)
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
          {this.state.graphType === 'histogram' && (
            <FormGroup>
              <ControlLabel>Max bins:</ControlLabel>
              &nbsp;
              <FormControl
                componentClass="input"
                type="number"
                min="1"
                defaultValue={this.state.maxBins}
                onChange={e => this.setState({ maxBins: e.target.value })}
                style={{ width: '80px' }}
              />
            </FormGroup>
          )}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <FormGroup>
            <ControlLabel>Hide legend:</ControlLabel>
            &nbsp;
            <Checkbox
              onChange={e =>
                this.setState({ hideLegend: !this.state.hideLegend })
              }
            />
          </FormGroup>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <FormGroup>
            <ControlLabel>Split runs:</ControlLabel>
            &nbsp;
            <Checkbox
              onChange={e =>
                this.setState({ splitRuns: !this.state.splitRuns })
              }
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
          maxBins={this.state.maxBins}
          hideLegend={this.state.hideLegend}
        />
      </div>
    );
  }
}

GraphWrapper.propTypes = {
  values: PropTypes.array
};

export default GraphWrapper;
