import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResourceRenderer from '../../../utils/ResourceRenderer';
import VersionListItem from './VersionListItem';
import LoadingList from '../LoadingList';
import FailedList from '../FailedList';

class VersionList extends Component {
  componentDidMount() {
    const { tests, fetchVersions } = this.props;
    tests.map(test => fetchVersions(test.id));
  }

  render() {
    const { tests, commonState, query, fetchValues, removeValues } = this.props;

    const allTestsVersions = tests.reduce(
      (acc, test) => acc.concat(commonState.testVersions[test.id]),
      []
    );

    return (
      <ResourceRenderer
        resource={allTestsVersions}
        loading={LoadingList}
        failed={FailedList}
      >
        {(...testVersions) => {
          let versionTestTree = {};
          let uniqueVersions = [];
          for (let i = 0; i < tests.length; i++) {
            let test = tests[i];
            for (let testVer of testVersions[i]) {
              if (
                uniqueVersions.find(version => version.id === testVer.id) ===
                undefined
              ) {
                uniqueVersions.push(testVer);
              }
              // key not found, just add the empty array
              if (Object.keys(versionTestTree).indexOf(testVer.id) < 0) {
                versionTestTree[testVer.id] = [];
              }
              versionTestTree[testVer.id].push(test);
            }
          }

          return (
            <div>
              {uniqueVersions
                .filter(
                  version =>
                    version.id
                      .toLocaleLowerCase()
                      .search(query.toLocaleLowerCase()) !== -1
                )
                .sort((a, b) => b.timestamp - a.timestamp)
                .map((version, i) => (
                  <VersionListItem
                    key={i}
                    version={version}
                    tests={versionTestTree[version.id]}
                    commonState={commonState}
                    fetchValues={testId => fetchValues(testId, version.id)}
                    removeValues={testId => removeValues(testId, version.id)}
                  />
                ))}
            </div>
          );
        }}
      </ResourceRenderer>
    );
  }
}

VersionList.propTypes = {
  tests: PropTypes.array.isRequired,
  commonState: PropTypes.object.isRequired,
  query: PropTypes.string,
  fetchVersions: PropTypes.func.isRequired,
  fetchValues: PropTypes.func.isRequired,
  removeValues: PropTypes.func.isRequired
};

export default VersionList;
