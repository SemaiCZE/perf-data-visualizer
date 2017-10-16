/* global Plotly */
import React, { Component } from 'react';
import './Graph.css';

class Graph extends Component {
  componentDidMount() {
    Plotly.newPlot('plot');
    this.resizeGraphs(true);
    window.onresize = this.resizeGraphs;
  }

  componentWillReceiveProps(newProps) {
    const { type, data } = newProps;

    const plotData = data.map((item, index) => {
      let data = {};
      if (type === 'scatter') {
        data.x0 = 1;
        data.dx = 1;
        data.y = item.values;
      } else if (type === 'histogram') {
        data.x = item.values;
        data.nbinsx = 50;
      } else if (type === 'box') {
        data.x0 = index;
        data.y = item.values;
      }

      return {
        type: type,
        name: item.name,
        ...data
      };
    });

    Plotly.newPlot(
      'plot',
      plotData,
      {
        margin: {
          t: 0,
          r: 0,
          l: 30
        },
        xaxis: {
          gridcolor: 'transparent'
        },
        showlegend: true,
        legend: {
          x: 0,
          y: 100
        }
      },
      {
        displayModeBar: true
      }
    );
  }

  resizeGraphs = (onlyGraph = false) => {
    const d3 = Plotly.d3;
    const WIDTH_IN_PERCENT_OF_PARENT = 90;
    const HEIGHT_IN_PERCENT_OF_PARENT = 70;

    const gd3 = d3.selectAll('.responsive-plot-container').style({
      width: WIDTH_IN_PERCENT_OF_PARENT + '%',
      'margin-left': (100 - WIDTH_IN_PERCENT_OF_PARENT) / 2 + '%',
      height: HEIGHT_IN_PERCENT_OF_PARENT + 'vh',
      //'margin-top': (100 - HEIGHT_IN_PERCENT_OF_PARENT) / 2 + 'vh'
      'margin-top': '30px'
    });
    const gd4 = d3.selectAll('.responsive-plot').style({
      width: '100%',
      'margin-left': 0,
      height: '100%',
      'margin-top': 0
    });

    const nodes_to_resize = onlyGraph ? gd4[0] : gd3[0].concat(gd4[0]); //not sure why but the goods are within a nested array
    nodes_to_resize.map(node => Plotly.Plots.resize(node));
  };

  render() {
    return <div id="plot" className="responsive-plot" />;
  }
}

export default Graph;
