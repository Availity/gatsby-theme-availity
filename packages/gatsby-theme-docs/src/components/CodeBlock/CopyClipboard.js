import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { FaCopy, FaCheck } from 'react-icons/fa';
import { useCopyToClipboard } from 'react-use';

// Component for copying code value onto the clipboard
const CopyClipboard = ({ value, ...props }) => {
  const [, copyToClipboard] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);
  const btnRef = useRef();

  const copyToCb = () => {
    copyToClipboard(value);
    setCopied(true);
  };

  useEffect(() => {
    const fn = setTimeout(() => {
      setCopied(false);
      btnRef.current.blur();
    }, 2000);

    return () => clearTimeout(fn);
  }, [copied]);

  return (
    <Button
      color="light"
      innerRef={btnRef}
      size="sm"
      onClick={copyToCb}
      {...props}
    >
      {copied ? (
        <FaCheck title="Copied" color="success" />
      ) : (
        <FaCopy title="Copy To Clipboard" />
      )}
    </Button>
  );
};

CopyClipboard.propTypes = {
  value: PropTypes.string.isRequired,
};

export default CopyClipboard;
