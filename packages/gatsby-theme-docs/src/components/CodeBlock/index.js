import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Card, CardHeader, CardBody } from 'reactstrap';
import Highlight, { defaultProps } from 'prism-react-renderer';
import CopyClipboard from './CopyClipboard';
import LiveCode from './LiveCode';

const getConfig = dataMeta => {
  const config = {};
  const parts = dataMeta.split(' ');

  parts.forEach(part => {
    const vals = part.split('=');

    if (vals.length === 2) {
      let value = vals[1];
      if (value === 'true' || value === 'false') {
        value = value === 'true';
      }

      if (value[0] === '{') {
        value = JSON.parse(value);
      }

      config[vals[0]] = value;
    }
  });

  return config;
};

const CodeBlock = ({
  className,
  children,
  live: _live,
  hideCopy: _hideCopy,
  header: _header,
  'data-meta': dataMeta = '',
  ...rest
}) => {
  const { live = _live, hideCopy = _hideCopy, header = _header } = getConfig(
    dataMeta
  );
  // for mdx it, `live` will be inside "data-meta", if md then `live` is a prop

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
    <Card className={classnames('mb-3', header ? 'mt-4' : 'mt-3')}>
      {language !== 'bash' && !hideCopy && (
        <CardHeader
          className={`bg-white d-flex align-items-center justify-content-${
            header ? 'between' : 'end'
          }`}
        >
          {header && <span>{header}</span>}
          <CopyClipboard color="light" size="sm" value={code} />
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
          {language === 'bash' && !hideCopy && (
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

CodeBlock.propTypes = {
  className: PropTypes.string,
  live: PropTypes.bool,
  hideCopy: PropTypes.bool,
  header: PropTypes.string,
  'data-meta': PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.node,
};

export default CodeBlock;
