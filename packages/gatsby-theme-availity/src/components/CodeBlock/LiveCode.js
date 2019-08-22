// src/components/CodeBlock.js
import React from 'react';
import htmlReactParser from 'html-react-parser';
import reactElementToJsxString from 'react-element-to-jsx-string';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { mdx } from '@mdx-js/react';

function removeNewlines(string) {
  return string.replace(/(\r\n|\n|\r)/gm, '');
}

function wrapWithFragment(jsx) {
  return `<React.Fragment>${jsx}</React.Fragment>`;
}

function htmlToJsx(html) {
  try {
    const reactElement = reactElementToJsxString(html);

    console.log('react element', reactElement);

    return reactElement;
  } catch (error) {
    console.log('Error', error);
    return wrapWithFragment(html);
  }
}

const languageTransformers = {
  html: html => htmlToJsx(html),
  jsx: jsx => wrapWithFragment(jsx),
};

export default ({ children }) => {
  console.log('Children', children);
  return (
    <div style={{ marginTop: '40px' }}>
      <LiveProvider
        code={children}
        scope={{ mdx }}
        mountStylesheet={false}
        // transformCode={languageTransformers.html}
      >
        <LivePreview />
        {/* <LiveEditor /> */}
        <LiveError />
      </LiveProvider>
    </div>
  );
};
