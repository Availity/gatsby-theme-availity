import React from 'react';
import classnames from 'classnames';
import { Link, withPrefix } from 'gatsby';
import { Nav, NavItem, NavLink } from 'reactstrap';

// Iterates over the array of side nav categories and renders the side nav
export default ({ currentPath, contents, siteTitle, ...rest }) => {
  const isPageSelected = ({ path }) => {
    const [prefixedPath, pathname] = [withPrefix(path), currentPath].map(
      string => string.replace(/\/$/, '')
    );
    return prefixedPath === pathname;
  };

  const isCategorySelected = (path, pages) =>
    path ? isPageSelected(path) : pages.some(isPageSelected);

  return (
    <div {...rest}>
      <Nav vertical navbar className="h-100 text-dark">
        {contents.map(({ title: collapseTitle, pages, path: categoryPath }) => (
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
                  isCategorySelected(categoryPath, pages),
              })}
              style={{ fontWeight: '500' }}
            >
              {collapseTitle === null ? siteTitle : collapseTitle}
            </p>
            <Nav vertical className="pl-3">
              {pages.map(({ path, title }) => (
                <NavItem key={title} active={isPageSelected({ path })}>
                  <NavLink
                    tag={Link}
                    to={path}
                    active={isPageSelected({ path })}
                    className={classnames({
                      // 'font-weight-bold': path === currentPath,
                      'text-secondary': !isPageSelected({ path }),
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
};
