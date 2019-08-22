import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';
import useCopyToClipboard from 'react-use/lib/useCopyToClipboard';
// import { MultiCodeBlockContext } from './multi-code-block';
// import { Select } from './select';

// const StyledSelect = styled(Select)({
//   marginRight: 8,
// });

export default ({ className, children }) => {
  const code = useRef();
  const [copied, copyToClipboard] = useCopyToClipboard();

  function handleCopy() {
    copyToClipboard(code.current.innerText);
  }

  return (
    <Card>
      <CardHeader className="bg-white">
        {/* <MultiCodeBlockContext.Consumer>
          {({ languages, onLanguageChange, activeIndex }) =>
            languages && (
              <StyledSelect
                size="small"
                variant="hidden"
                value={activeIndex}
                onChange={onLanguageChange}
              >
                {languages.map((language, index) => (
                  <option value={index} key={index}>
                    {language}
                  </option>
                ))}
              </StyledSelect>
            )
          }
        </MultiCodeBlockContext.Consumer> */}
        <Button
          color="light"
          size="sm"
          onClick={handleCopy}
          className="float-right"
        >
          {copied.value ? 'Copied!' : 'Copy'}
        </Button>
      </CardHeader>
      <CardBody className="p-0">
        <pre className={className} ref={code}>
          {children}
        </pre>
      </CardBody>
    </Card>
  );
};
