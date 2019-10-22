import React from 'react';
import PropTypes from 'prop-types';
import { withPrefix } from 'gatsby';
import { Nav } from 'reactstrap';
import NavigationItem from './NavItem';
import { CollapseProvider } from './CollapseContext';

// Iterates over the array of side nav categories and renders the side nav
const SideNav = ({ currentPath, contents, siteTitle, ...rest }) => {
  const isPageSelected = ({ path, pages: subPages }) => {
    const [prefixedPath, pathname] = [withPrefix(path), currentPath].map(
      string => string.replace(/\/$/, '')
    );

    const isSelected = prefixedPath === pathname;

    if (!isSelected && subPages) {
      return subPages.some(isPageSelected);
    }

    return isSelected;
  };

  const isCategorySelected = (path, pages) => {
    return pages.some(isPageSelected) || (path && isPageSelected({ path }));
  };

  return (
    <div {...rest}>
      <Nav vertical navbar className="text-dark">
        <CollapseProvider siteName={siteTitle}>
          {contents.map(
            ({ title: collapseTitle, pages, path: categoryPath, depth }) => (
              <NavigationItem
                key={collapseTitle}
                collapseTitle={collapseTitle}
                path={categoryPath}
                depth={depth}
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
