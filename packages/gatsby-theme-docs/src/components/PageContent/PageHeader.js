import React from 'react';

// Top Page header that is rendered on the current page
export default ({ title, summary }) => (
  <h1 className="mt-4 font-size- pb-3 border-bottom">
    {title}
    <br />
    <small className="h4 text-secondary">{summary}</small>
  </h1>
);
