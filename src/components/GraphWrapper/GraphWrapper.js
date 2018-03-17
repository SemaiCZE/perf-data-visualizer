/* global Plotly */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Checkbox,
  Button
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
    const { values: data, meta, setGraphMeta } = this.props;

    return (
      <div className="responsive-plot-container">
        <Form inline className="pull-right">
          {meta.graphType === 'histogram' && (
            <FormGroup>
              <ControlLabel>Max bins:</ControlLabel>
              &nbsp;
              <FormControl
                componentClass="input"
                type="number"
                min="1"
                value={meta.maxBins}
                onChange={e => setGraphMeta({ maxBins: e.target.value })}
                style={{ width: '80px' }}
              />
            </FormGroup>
          )}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <FormGroup>
            <ControlLabel>Hide legend:</ControlLabel>
            &nbsp;
            <Checkbox
              onChange={e => setGraphMeta({ hideLegend: !meta.hideLegend })}
              checked={meta.hideLegend}
            />
          </FormGroup>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <FormGroup>
            <ControlLabel>Split runs:</ControlLabel>
            &nbsp;
            <Checkbox
              onChange={e => setGraphMeta({ splitRuns: !meta.splitRuns })}
              checked={meta.splitRuns}
            />
          </FormGroup>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <FormGroup>
            <ControlLabel>Type:</ControlLabel>
            &nbsp;
            <FormControl
              componentClass="select"
              value={meta.graphType}
              onChange={e => setGraphMeta({ graphType: e.target.value })}
            >
              <option value="scatter">Scatter</option>
              <option value="histogram">Histogram</option>
              <option value="box">Box plot</option>
            </FormControl>
          </FormGroup>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            onClick={() =>
              Plotly.downloadImage(document.getElementById('plot'), {
                filename: 'perfplot',
                format: 'svg',
                width: 1000,
                height: 562
              })
            }
          >
            Save
          </Button>
        </Form>
        <Graph
          data={
            meta.splitRuns
              ? this.prepareSplitData(data)
              : this.prepareNormalData(data)
          }
          type={meta.graphType}
          maxBins={meta.maxBins}
          hideLegend={meta.hideLegend}
        />
      </div>
    );
  }
}

GraphWrapper.propTypes = {
  values: PropTypes.array,
  setGraphMeta: PropTypes.func,
  meta: PropTypes.object.isRequired
};

export default GraphWrapper;
