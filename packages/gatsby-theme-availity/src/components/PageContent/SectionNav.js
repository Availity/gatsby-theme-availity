import React, { useEffect, useState } from 'react';
import { Nav, NavLink, NavItem } from 'reactstrap';
import classnames from 'classnames';
import striptags from 'striptags';
import useScroll from 'react-use/lib/useScroll';
import useWindowSize from 'react-use/lib/useWindowSize';
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

    const headings = contentRef.current.querySelectorAll('h1, h2');
    setOffsets(
      // eslint-disable-next-line unicorn/prefer-spread
      Array.from(headings)
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
      className={classnames(className, 'd-md-none d-lg-flex pt-2')}
      vertical
      style={{ width: 260, position: 'sticky', top: -39 }}
      {...rest}
    >
      <NavItem style={{ fontWeight: '500' }}>
        <NavLink>{title}</NavLink>
      </NavItem>
      {headings.map(({ value }) => {
        const text = striptags(value);
        const slug = slugger.slug(text);

        return (
          <NavItem key={slug} active={slug === activeHeading}>
            <NavLink
              href={`#${slug}`}
              active={slug === activeHeading}
              className={classnames({
                'font-weight-bold': slug === activeHeading,
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

export default SectionNav;
