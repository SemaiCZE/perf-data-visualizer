import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

global.Plotly = {
  newPlot: jest.fn(),
  d3: {
    selectAll: () => ({ style: () => [['']] })
  },
  Plots: {
    resize: jest.fn()
  }
};

global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
