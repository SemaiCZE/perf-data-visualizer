import React from 'react';
import PropTypes from 'prop-types';
import { LoadingIcon } from '../icons';
import { isLoading, getJsData } from './stateHelpers';

const defaultLoading = noIcons =>
  <span>
    {!noIcons && <LoadingIcon />} Loading ...
  </span>;

const ResourceRenderer = ({
  noIcons = false,
  loading = defaultLoading(noIcons),
  children: ready,
  resource,
  hiddenUntilReady = false,
  forceLoading = false
}) => {
  const resources = Array.isArray(resource) ? resource : [resource];
  const stillLoading =
    !resource ||
    resources.find(res => !res) ||
    resources.some(isLoading) ||
    forceLoading;
  return stillLoading
    ? hiddenUntilReady ? null : loading
    : ready(...resources.map(getJsData)); // display all ready items
};

ResourceRenderer.propTypes = {
  loading: PropTypes.element,
  children: PropTypes.func.isRequired,
  resource: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  hiddenUntilReady: PropTypes.bool,
  forceLoading: PropTypes.bool,
  noIcons: PropTypes.bool
};

export default ResourceRenderer;
