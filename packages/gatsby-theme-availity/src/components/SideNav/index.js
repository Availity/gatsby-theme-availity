import React from 'react';
import classnames from 'classnames';
import { Link } from 'gatsby';
import { Nav, NavItem, NavLink } from 'reactstrap';

// Iterates over the array of side nav categories and renders the side nav
export default ({ currentPath, contents, siteTitle, ...rest }) => (
  <div {...rest}>
    <Nav vertical navbar className="h-100 text-dark">
      {contents.map(({ title: collapseTitle, pages }) => (
        <span
          key={collapseTitle}
          className={classnames({
            'pb-4 border-bottom': collapseTitle === null,
          })}
        >
          <p
            className={classnames('mt-3 mb-1', {
              'text-primary':
                collapseTitle === null ||
                pages.some(({ path }) => path === currentPath),
            })}
            style={{ fontWeight: '500' }}
          >
            {collapseTitle === null ? siteTitle : collapseTitle}
          </p>
          <Nav vertical className="pl-3">
            {pages.map(({ path, title }) => (
              <NavItem key={title} active={path === currentPath}>
                <NavLink
                  tag={Link}
                  to={path}
                  active={path === currentPath}
                  className={classnames({
                    // 'font-weight-bold': path === currentPath,
                    'text-secondary': path !== currentPath,
                  })}
                >
                  {title}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
        </span>
      ))}
    </Nav>
  </div>
);
