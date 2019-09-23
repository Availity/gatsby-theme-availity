// src/components/CodeBlock.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaPencilAlt } from 'react-icons/fa';
import { Collapse, Card, CardHeader, Button } from 'reactstrap';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import githubTheme from './availityTheme';
import CopyClipboard from './CopyClipboard';
import LiveCodeScopes from '../LiveCodeScopes';

const LiveCode = ({
  children: code,
  hideCopy,
  header,
  viewCode: initialViewCode,
}) => {
  const [viewCode, setViewCode] = useState(initialViewCode);

  const toggle = () => setViewCode(!viewCode);

  return (
    <Card style={{ marginTop: '40px' }}>
      <CardHeader
        className={`bg-white d-flex align-items-center justify-content-${
          header ? 'between' : 'end'
        }`}
      >
        {header && <span>{header}</span>}
        <div>
          <Button color="light" size="sm" className="mr-2" onClick={toggle}>
            <FaPencilAlt title="Edit Code" />
          </Button>
          {!hideCopy && <CopyClipboard color="light" size="sm" value={code} />}
        </div>
      </CardHeader>
      <LiveProvider
        code={code}
        scope={{ ...LiveCodeScopes }}
        mountStylesheet={false}
        transformCode={code => {
          return code
            .split('\n')
            .filter(code => !code.startsWith('import'))
            .join('\n');
        }}
      >
        <LivePreview
          className="p-3"
          style={{ borderTopRightRadius: 4, borderTopLeftRadius: 4 }}
        />
        <Collapse isOpen={viewCode}>
          <div
            className="position-relative"
            style={{ borderBottomRightRadius: 4, borderBottomLeftRadius: 4 }}
          >
            <LiveEditor
              theme={githubTheme}
              ignoreTabKey
              className="border-top"
              // style={{
              //   fontSize: 13,
              //   fontFamily:
              //     "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
              //   backgroundColor: '#f8f8f8',
              // }}
            />
            <LiveError />
          </div>
        </Collapse>
      </LiveProvider>
    </Card>
  );
};

LiveCode.propTypes = {
  children: PropTypes.node,
  viewCode: PropTypes.bool,
  header: PropTypes.string,
  hideCopy: PropTypes.bool,
};

export default LiveCode;
