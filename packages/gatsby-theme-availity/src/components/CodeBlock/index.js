import React, { useRef } from 'react';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';
import useCopyToClipboard from 'react-use/lib/useCopyToClipboard';
import LiveCode from './LiveCode';

export default ({ className, children }) => {
  console.log('Children', children, 'className', className);

  const code = useRef();
  const [copied, copyToClipboard] = useCopyToClipboard();

  const language = className
    ? className
        .replace(/language-/, '')
        .replace('line-numbers', '')
        .trim()
    : '';

  function handleCopy() {
    copyToClipboard(code.current.textContent);
  }

  if (language === '' || language === 'text') {
    return <pre>{children}</pre>;
  }

  if (language === 'jsx') {
    return <LiveCode>{children}</LiveCode>;
  }

  return (
    <Card className="mb-3 mt-3">
      {language !== 'bash' && (
        <CardHeader className="bg-white">
          <Button
            color="light"
            size="sm"
            onClick={handleCopy}
            className="float-right"
          >
            {copied.value ? 'Copied!' : 'Copy'}
          </Button>
        </CardHeader>
      )}
      <CardBody className="p-0">
        <pre className={className} ref={code}>
          {children}
          {language === 'bash' && (
            <Button
              color="light"
              size="sm"
              onClick={handleCopy}
              className="float-right"
              style={{
                position: 'absolute',
                top: 8,
                right: '1.25rem',
                zIndex: 1,
              }}
            >
              {copied.value ? 'Copied!' : 'Copy'}
            </Button>
          )}
        </pre>
      </CardBody>
    </Card>
  );
};
