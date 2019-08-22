import React, { useRef, useEffect } from 'react';
import SectionNav from './SectionNav';

const PageContent = ({ children, headings, mainRef, title, ...props }) => {
  const contentRef = useRef();

  useEffect(() => {
    if (props.hash) {
      // turn numbers at the beginning of the hash to unicode
      // see https://stackoverflow.com/a/20306237/8190832
      const hash = props.hash.toLowerCase().replace(/^#(\d)/, '#\\3$1 ');
      try {
        const hashElement = contentRef.current.querySelector(hash);
        if (hashElement) {
          hashElement.scrollIntoView();
        }
      } catch (error) {
        // let errors pass
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="d-flex align-items-start">
      <div
        className="flex-grow-1"
        style={{ width: 0, maxWidth: '100ch' }}
        ref={contentRef}
      >
        {children}
      </div>
      <SectionNav
        headings={headings}
        mainRef={mainRef}
        title={title}
        contentRef={contentRef}
        className="ml-5 pl-5"
      />
    </div>
  );
};

export default PageContent;
