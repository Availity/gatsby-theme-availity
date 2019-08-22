import React from 'react';

export default ({ title, summary }) => (
  <h1 className="mt-4 font-size- pb-3 border-bottom">
    {title}
    <br />
    <small className="h4 text-secondary">{summary}</small>
  </h1>
);
