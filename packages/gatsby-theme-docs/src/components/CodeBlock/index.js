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
  viewCode: _viewCode,
  header: _header,
  'data-meta': dataMeta = '',
}) => {
  const {
    live = _live === 'true',
    hideCopy = _hideCopy === 'true',
    viewCode = _viewCode === 'true',
    header = _header,
  } = getConfig(dataMeta);

  // for mdx it, `live` will be inside "data-meta", if md then `live` is a prop

  // MDX will be an array, md will already have the child
  const code = Array.isArray(children) ? children[0] : children;

  // Get the Language from the className
  const language = className
    ? className
        .replace(/language-/, '')
        .replace('line-numbers', '')
        .trim()
    : '';

  // If the language is text or nothing we can just render it inline
  if (language === '' || language === 'text') {
    return (
      <code
        className="p-1 text-dark rounded"
        style={{
          backgroundColor: 'rgba(27,31,35,.05)',
        }}
      >
        {code}
      </code>
    );
  }

  // If live, we will return the live code block
  if (live) {
    return (
      <LiveCode hideCopy={hideCopy} header={header} viewCode={viewCode}>
        {code}
      </LiveCode>
    );
  }

  // Otherwise render the default layout for code block
  // Note that the only tenary here is for bash. If the language is bash we want the
  // copy clipboard button to be aligned center.
  return (
    <Card className={classnames('mb-3', header ? 'mt-4' : 'mt-3')}>
      {language !== 'bash' && (header || !hideCopy) && (
        <CardHeader
          className={`bg-white d-flex align-items-center justify-content-${
            header ? 'between' : 'end'
          }`}
        >
          {header && <span>{header}</span>}
          {!hideCopy && <CopyClipboard color="light" size="sm" value={code} />}
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
  live: PropTypes.string,
  hideCopy: PropTypes.string,
  viewCode: PropTypes.string,
  header: PropTypes.string,
  'data-meta': PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.node,
};

export default CodeBlock;
