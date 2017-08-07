import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Button, Table } from 'react-bootstrap';

import './TestInfo.css';

const TestInfo = ({ test, onDismiss }) =>
  <Panel
    bsStyle="primary"
    className="Info-container"
    header={
      <div>
        <span>
          {test.name}
        </span>
        {onDismiss &&
          <Button
            className="pull-right Info-close"
            bsSize="large"
            bsStyle="link"
            onClick={onDismiss}
          >
            &times;
          </Button>}
      </div>
    }
  >
    <Table hover fill condensed>
      <tbody>
        {test.metadata &&
          Object.keys(test.metadata).map((key, i) =>
            <tr key={i}>
              <td style={{ width: '50%' }}>
                {key}:
              </td>
              <td>
                <code>
                  {test.metadata[key]}
                </code>
              </td>
            </tr>
          )}
        {!test.metadata &&
          <tr>
            <td>There are no metadata for this test.</td>
          </tr>}
      </tbody>
    </Table>
  </Panel>;

TestInfo.propTypes = {
  test: PropTypes.object.isRequired,
  onDismiss: PropTypes.func
};

export default TestInfo;
