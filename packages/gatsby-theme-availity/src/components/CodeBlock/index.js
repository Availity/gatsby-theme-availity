import React from 'react';
import classnames from 'classnames';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highlight, { defaultProps } from 'prism-react-renderer';
import CopyClipboard from './CopyClipboard';
import LiveCode from './LiveCode';

export default ({
  className,
  children,
  live: codeLive,
  'data-meta': dataMeta,
}) => {
  // for mdx it, `live` will be inside "data-meta", if md then `live` is a prop
  const live = codeLive || (dataMeta && dataMeta.includes('live'));

  // MDX will be an array, md will already have the child
  const code = Array.isArray(children) ? children[0] : children;

  // Get the Langague from the className
  const language = className
    ? className
        .replace(/language-/, '')
        .replace('line-numbers', '')
        .trim()
    : '';

  // If the language is text or nothing we can just render it inline
  if (language === '' || language === 'text') {
    return (
      <span
        style={{
          padding: '0.1em 0.3em',
          borderRadius: '0.3em',
          color: '#db4c69',
          display: 'inline-block',
          background: '#f9f2f4',
        }}
      >
        {code}
      </span>
    );
  }

  // If live, we will return the live code block
  if (live) {
    return <LiveCode>{code}</LiveCode>;
  }

  // Otherwise render the default layout for code block
  // Note that the only tenary here is for bash. If the language is bash we want the
  // copy clipboard button to be aligned center.
  return (
    <Card className="mb-3 mt-3">
      {language !== 'bash' && (
        <CardHeader className="bg-white">
          <CopyClipboard
            color="light"
            size="sm"
            value={code}
            className="float-right"
          />
        </CardHeader>
      )}
      <CardBody className="p-0">
        <pre
          className={classnames(className, {
            'd-flex': language === 'bash',
          })}
        >
          <Highlight
            {...defaultProps}
            theme={{
              plain: {},
              styles: [],
            }}
            code={code}
            language={language}
          >
            {({ tokens, getLineProps, getTokenProps }) =>
              tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))
            }
          </Highlight>
          {language === 'bash' && (
            <CopyClipboard
              className="float-right"
              style={{
                position: 'absolute',
                top: 8,
                right: '1.25rem',
                zIndex: 1,
              }}
              value={code}
            />
          )}
        </pre>
      </CardBody>
    </Card>
  );
};
