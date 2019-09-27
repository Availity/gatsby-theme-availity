import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'gatsby';
import { Nav, Collapse, NavItem, NavLink as RsNavLink } from 'reactstrap';
import { isAbsoluteUrl } from '@availity/resolve-url';
// eslint-disable-next-line import/no-cycle
import NavigationItem from './NavItem';

const NavLink = ({
  isRootLink,
  collapseProps,
  isSecondaryCategory,
  isPageSelected,
  pages,
}) => (
  <Nav vertical tag={isRootLink ? 'ul' : Collapse} {...collapseProps} navbar>
    {pages.map(({ path, title, pages: subPages, anchor }) => {
      const isAbsolutePath = anchor && isAbsoluteUrl(path);

      const linkProps = {
        tag: isAbsolutePath ? 'a' : Link,
      };

      if (isAbsolutePath) {
        linkProps.href = path;
      } else {
        linkProps.to = path;
      }

      return subPages && !isSecondaryCategory ? (
        <NavigationItem
          key={title}
          collapseTitle={title}
          isCategorySelected={isPageSelected({
            path,
            pages: [...subPages, { title, path }],
          })}
          pages={subPages}
          path={path}
          isPageSelected={isPageSelected}
        />
      ) : (
        <NavItem
          key={title}
          active={isPageSelected({ path })}
          className="position-relative d-flex align-items-center"
        >
          <RsNavLink
            {...linkProps}
            active={isPageSelected({ path })}
            className={classnames('py-2 w-100', {
              'pl-4': !isSecondaryCategory,
              'pl-5': isSecondaryCategory,
              'sidenav-link-active hover': isPageSelected({ path }),
              'text-secondary sidenav-link hover': !isPageSelected({ path }),
              'sidenav-link-secondary': isSecondaryCategory,
            })}
          >
            {title}
          </RsNavLink>
        </NavItem>
      );
    })}
  </Nav>
);

NavLink.propTypes = {
  isRootLink: PropTypes.bool,
  collapseProps: PropTypes.object,
  isPageSelected: PropTypes.func,
  pages: PropTypes.array,
  isSecondaryCategory: PropTypes.bool,
};

export default NavLink;
