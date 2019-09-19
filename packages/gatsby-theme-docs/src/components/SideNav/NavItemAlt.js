import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'gatsby';
import { Nav, Collapse, NavItem, NavLink } from 'reactstrap';
import NavigationItem from './NavItem';

const NavItemAlt = ({
  isRootLink,
  collapseProps,
  isSecondaryCategory,
  isPageSelected,
  pages,
}) => (
  <Nav
    vertical
    tag={isRootLink ? 'ul' : Collapse}
    {...collapseProps}
    // className="pb-2"
    navbar
  >
    {pages.map(({ path, title, pages: subPages }) =>
      subPages && !isSecondaryCategory ? (
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
          <NavLink
            tag={Link}
            to={path}
            active={isPageSelected({ path })}
            className={classnames('py-2 w-100', {
              'pl-4': !isSecondaryCategory,
              'pl-5': isSecondaryCategory,
              'sidenav-link-active': isPageSelected({ path }),
              'text-secondary sidenav-link': !isPageSelected({ path }),
              'sidenav-link-secondary': isSecondaryCategory,
            })}
          >
            {title}
          </NavLink>
        </NavItem>
      )
    )}
  </Nav>
);

NavItemAlt.propTypes = {
  isRootLink: PropTypes.bool,
  collapseProps: PropTypes.object,
  isPageSelected: PropTypes.func,
  pages: PropTypes.array,
  isSecondaryCategory: PropTypes.bool,
};

export default NavItemAlt;
