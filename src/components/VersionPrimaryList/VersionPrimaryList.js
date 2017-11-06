import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResourceRenderer from '../../utils/ResourceRenderer';
import VersionPrimaryListItem from './VersionPrimaryListItem';

class VersionPrimaryList extends Component {
  componentDidMount() {
    const { tests, fetchVersions } = this.props;
    tests.map(test => fetchVersions(test.id));
  }

  render() {
    const { tests, commonState } = this.props;

    const allTestsVersions = tests.reduce(
      (acc, test) => acc.concat(commonState.testVersions[test.id]),
      []
    );

    return (
      <ResourceRenderer resource={allTestsVersions}>
        {testVersions => {
          let versionTestTree = {};
          for (let test of tests) {
            for (let testVer of testVersions) {
              // key not found, just add the empty array
              if (Object.keys(versionTestTree).indexOf(testVer.id) < 0) {
                versionTestTree[testVer.id] = [];
              }
              versionTestTree[testVer.id].push(test);
            }
          }
          return (
            <div>
              {testVersions
                .sort((a, b) => b.timestamp - a.timestamp)
                .map((version, i) => (
                  <VersionPrimaryListItem
                    key={i}
                    version={version}
                    tests={versionTestTree[version.id]}
                    //fetchValues={versionId => fetchValues(test.id, versionId)}
                    //removeValues={versionId => removeValues(test.id, versionId)}
                  />
                ))}
            </div>
          );
        }}
      </ResourceRenderer>
    );
  }
}

VersionPrimaryList.propTypes = {};

export default VersionPrimaryList;
