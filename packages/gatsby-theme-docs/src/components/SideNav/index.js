import React from 'react';
import PropTypes from 'prop-types';
import { withPrefix } from 'gatsby';
import { Nav } from 'reactstrap';
import NavigationItem from './NavItem';
import { CollapseProvider } from './CollapseContext';

// Iterates over the array of side nav categories and renders the side nav
const SideNav = ({ currentPath, contents, siteTitle, ...rest }) => {
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
        <CollapseProvider siteName={siteTitle}>
          {contents.map(
            ({ title: collapseTitle, pages, path: categoryPath }) => (
              <NavigationItem
                key={collapseTitle}
                collapseTitle={collapseTitle}
                isCategorySelected={isCategorySelected(categoryPath, pages)}
                siteTitle={siteTitle}
                pages={pages}
                isPageSelected={isPageSelected}
              />
            )
          )}
        </CollapseProvider>
      </Nav>
    </div>
  );
};

SideNav.propTypes = {
  currentPath: PropTypes.string,
  contents: PropTypes.array,
  siteTitle: PropTypes.string,
};

export default SideNav;