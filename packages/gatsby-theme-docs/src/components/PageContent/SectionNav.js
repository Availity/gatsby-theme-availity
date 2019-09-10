import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Nav, NavLink, NavItem } from 'reactstrap';
import classnames from 'classnames';
import striptags from 'striptags';
import { useScroll, useWindowSize } from 'react-use';
import Slugger from 'github-slugger';
import { FaGithub } from 'react-icons/fa';

const SectionNav = ({
  headings,
  title,
  mainRef,
  contentRef,
  className,
  githubUrl,
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
        'd-xs-none d-sm-none d-md-none d-lg-none d-xl-flex pt-2'
      )}
      vertical
      style={{ width: 320, position: 'sticky', top: -39 }}
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
            <NavItem key={slug} active={slug === activeHeading}>
              <NavLink
                href={`#${slug}`}
                active={slug === activeHeading}
                className={classnames({
                  // 'font-weight-bold': slug === activeHeading,
                  'text-secondary': slug !== activeHeading,
                  'ml-4 pt-1 pb-1': depth === 3,
                })}
                style={{
                  fontSize: depth === 3 && 15,
                }}
              >
                {text}
              </NavLink>
            </NavItem>
          );
        })}
      <NavItem className="mt-5">
        <NavLink
          href={githubUrl}
          className="text-dark d-flex align-items-center"
        >
          <FaGithub size={18} className="mr-2" /> Edit on Github
        </NavLink>
      </NavItem>
    </Nav>
  );
};

SectionNav.propTypes = {
  headings: PropTypes.array,
  contentRef: PropTypes.object,
  mainRef: PropTypes.object,
  title: PropTypes.string,
  className: PropTypes.string,
  githubUrl: PropTypes.string,
};

export default SectionNav;
