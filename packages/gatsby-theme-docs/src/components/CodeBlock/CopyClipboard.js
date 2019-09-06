import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import useCopyToClipboard from 'react-use/lib/useCopyToClipboard';

// Component for copying code value onto the clipboard
const CopyClipboard = ({ value, ...props }) => {
  const [{ value: copied }, copyToClipboard] = useCopyToClipboard();

  function handleCopy() {
    copyToClipboard(value);
  }

  return (
    <Button color="light" size="sm" onClick={handleCopy} {...props}>
      {copied ? 'Copied!' : 'Copy'}
    </Button>
  );
};

CopyClipboard.propTypes = {
  value: PropTypes.string.isRequired,
};

export default CopyClipboard;
