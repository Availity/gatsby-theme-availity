import React from 'react';
import PropTypes from 'prop-types';

// Top Page header that is rendered on the current page
const PageHeader = ({ title, summary }) => (
  <div className="mt-4 pb-3 mb-3 border-bottom header-wrapper">
    <h1>{title}</h1>
    <h3 className="h4 text-secondary">{summary}</h3>
  </div>
);

PageHeader.propTypes = {
  title: PropTypes.string,
  summary: PropTypes.string,
};

export default PageHeader;
