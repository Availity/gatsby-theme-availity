import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import PageNav from './PageNav';
import SectionNav from './SectionNav';
import SectionOverview from './SectionOverview';

const PageContent = ({
  children,
  headings,
  mainRef,
  title,
  pageIndex,
  pages,
  hash: _hash,
}) => {
  const contentRef = useRef();

  const hasSubPages = pages[pageIndex].pages;

  useEffect(() => {
    if (_hash) {
      // turn numbers at the beginning of the hash to unicode
      // see https://stackoverflow.com/a/20306237/8190832
      const hash = _hash.toLowerCase().replace(/^#(\d)/, '#\\3$1 ');
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
        className="flex-grow-1 content-wrapper"
        style={{ width: 0, maxWidth: '110ch' }}
        ref={contentRef}
      >
        {children}
        {hasSubPages && <SectionOverview sections={pages[pageIndex].pages} />}
        <PageNav
          prevPage={pages[pageIndex - 1]}
          nextPage={pages[pageIndex + 1]}
        />
      </div>
      {!hasSubPages && (
        <SectionNav
          headings={headings}
          mainRef={mainRef}
          title={title}
          contentRef={contentRef}
          className="ml-5 pl-5"
        />
      )}
    </div>
  );
};

PageContent.propTypes = {
  children: PropTypes.node.isRequired,
  headings: PropTypes.array,
  mainRef: PropTypes.object,
  title: PropTypes.string,
  pageIndex: PropTypes.number,
  pages: PropTypes.array,
  hash: PropTypes.string,
};

export default PageContent;
