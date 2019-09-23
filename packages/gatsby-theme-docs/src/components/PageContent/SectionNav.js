import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Nav, NavLink, NavItem } from 'reactstrap';
import classnames from 'classnames';
import striptags from 'striptags';
import { useScroll, useWindowSize } from 'react-use';
import Slugger from 'github-slugger';

const SectionNav = ({
  headings,
  title,
  mainRef,
  contentRef,
  className,
  ...rest
}) => {
  const { y } = useScroll(mainRef);
  const { width, height } = useWindowSize();
  const [offsets, setOffsets] = useState([]);

  // When the width or the height of screen, or content updates, we need to adjust the offsets for where to
  // place the anchor when we click a section link
  useEffect(() => {
    if (!contentRef) return;

    const contentHeadings = contentRef.current.querySelectorAll('h2,h3');

    setOffsets(
      // eslint-disable-next-line unicorn/prefer-spread
      Array.from(contentHeadings)
        .map(heading => {
          const anchor = heading.querySelector('a');
          if (!anchor) {
            return null;
          }

          return {
            id: heading.id,
            offset: anchor.offsetTop,
          };
        })
        .filter(Boolean)
    );
  }, [width, height, contentRef]);

  let activeHeading = null;
  const windowOffset = height / 2;
  const scrollTop = y + windowOffset;
  for (let i = offsets.length - 1; i >= 0; i--) {
    const { id, offset } = offsets[i];
    if (scrollTop >= offset) {
      activeHeading = id;
      break;
    }
  }

  // Slugger :baseball:
  const slugger = new Slugger();

  return (
    <Nav
      className={classnames(
        className,
        'd-xs-none d-sm-none d-md-none d-lg-none d-xl-flex pt-2 w-100'
      )}
      vertical
      style={{ maxWidth: 400, position: 'sticky', top: 0 }}
      {...rest}
    >
      <NavItem style={{ fontWeight: '500' }}>
        <NavLink>{title}</NavLink>
      </NavItem>
      {headings
        .filter(({ depth }) => depth === 2 || depth === 3)
        .map(({ value, depth }) => {
          const text = striptags(value);
          const slug = slugger.slug(text);

          return (
            <NavItem
              key={slug}
              active={slug === activeHeading}
              tag={depth === 3 ? 'code' : 'li'}
              className={classnames({
                'ml-4 p-1 mb-1': depth === 3,
              })}
              style={{
                fontSize: depth === 3 && 12,
                background: depth === 3 && '#f8f8f8',
                width: depth === 3 && 'fit-content',
              }}
            >
              <NavLink
                href={`#${slug}`}
                active={slug === activeHeading}
                className={classnames({
                  // 'font-weight-bold': slug === activeHeading,
                  'text-secondary': slug !== activeHeading,
                  'p-0': depth === 3,
                })}
              >
                {text}
              </NavLink>
            </NavItem>
          );
        })}
    </Nav>
  );
};

SectionNav.propTypes = {
  headings: PropTypes.array,
  contentRef: PropTypes.object,
  mainRef: PropTypes.object,
  title: PropTypes.string,
  className: PropTypes.string,
};

export default SectionNav;
