/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Nav, NavLink, NavItem } from 'reactstrap';
import classnames from 'classnames';
import striptags from 'striptags';
import { useScroll, useWindowSize } from 'react-use';
import Slugger from 'github-slugger';

const SectionNavigationItem = ({
  value,
  isReactProp,
  activeHeading,
  subHeadings,
  slugger,
  depth,
}) => {
  const text = striptags(value);
  const slug = slugger.slug(text);

  return (
    <NavItem
      active={slug === activeHeading}
      tag={isReactProp ? 'code' : 'li'}
      className="d-block"
    >
      <NavLink
        href={`#${slug}`}
        active={slug === activeHeading}
        className={classnames({
          // 'font-weight-bold': slug === activeHeading,
          'text-secondary': slug !== activeHeading,
          'p-1 mb-2': isReactProp,
          'ml-4': depth === 3,
        })}
        style={{
          fontSize: isReactProp && 11,
          background: isReactProp && '#f8f8f8',
          width: isReactProp && 'fit-content',
        }}
      >
        {text}
      </NavLink>
      {subHeadings && subHeadings.length > 0 && (
        <ul className="pl-0">
          {subHeadings.map(subHeadingProps => (
            <SectionNavigationItem
              key={subHeadingProps.value}
              activeHeading={activeHeading}
              slugger={slugger}
              {...subHeadingProps}
            />
          ))}
        </ul>
      )}
    </NavItem>
  );
};

// Sort the list into a depth tree rather than single layer
// before [{ value: "Hello", depth: 2}, { value:"World", depth: 3}]
// after  [{ value: "Hello", depth: 2, subHeadings: [{ value: "World", depth: 3 } ] }]
const sortHeadings = headings => {
  const newHeadings = [];

  headings.forEach(heading => {
    if (heading.depth === 2) {
      newHeadings.push({
        ...heading,
        subHeadings: [],
      });
    } else if (heading.depth === 3) {
      const currentHeading = newHeadings[newHeadings.length - 1];
      currentHeading.subHeadings.push({
        ...heading,
        isReactProp: currentHeading.value === 'Props',
      });
    }
  });

  return newHeadings;
};

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

  const sectionHeadings = useMemo(() => sortHeadings(headings), [headings]);

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
      {sectionHeadings.map(headingProps => (
        <SectionNavigationItem
          {...headingProps}
          key={headingProps.value}
          slugger={slugger}
          activeHeading={activeHeading}
        />
      ))}
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
