// src/components/CodeBlock.js
import React from 'react';
import PropTypes from 'prop-types';
import * as Reactstrap from 'reactstrap';
import githubTheme from 'prism-react-renderer/themes/github';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import CopyClipboard from './CopyClipboard';

const LiveCode = ({ children: code, hideCopy }) => (
  <div style={{ marginTop: '40px' }}>
    <LiveProvider code={code} scope={{ ...Reactstrap }} mountStylesheet={false}>
      <LivePreview
        className="p-3 border border-bottom-0"
        style={{ borderTopRightRadius: 4, borderTopLeftRadius: 4 }}
      />
      <div
        className="border border-top-0 position-relative"
        style={{ borderBottomRightRadius: 4, borderBottomLeftRadius: 4 }}
      >
        <LiveEditor
          theme={githubTheme}
          ignoreTabKey
          style={{
            fontSize: 13,
            fontFamily:
              "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
            backgroundColor: '#f8f8f8',
          }}
        />
        <LiveError />
        {!hideCopy && (
          <CopyClipboard
            value={code}
            style={{
              position: 'absolute',
              top: 8,
              right: '1.25rem',
            }}
          />
        )}
      </div>
    </LiveProvider>
  </div>
);

LiveCode.propTypes = {
  children: PropTypes.node,
  hideCopy: PropTypes.bool,
};

export default LiveCode;
