import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'gatsby';
import { Nav, NavItem, NavLink, Collapse } from 'reactstrap';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { useCollapse } from './CollapseContext';
import CollapseAll from './CollapseAll';

const NavigationItem = ({
  collapseTitle,
  isCategorySelected,
  siteTitle,
  pages,
  isPageSelected,
}) => {
  const [collapseOpen, toggle] = useCollapse(collapseTitle, isCategorySelected);

  const collapseIsOpenProp = {};

  if (collapseTitle !== null) {
    collapseIsOpenProp.isOpen = collapseOpen;
  }

  return (
    <>
      <span
        key={collapseTitle}
        className={classnames({
          'border-bottom':collapseTitle !== null
        })}
      >
        <NavLink
          onClick={toggle}
          className={classnames(
            'mt-1 mb-1 d-flex align-items-center justify-content-between',
            {
              'text-uppercase': collapseTitle !== null,
              lead: collapseTitle === null,
              'text-primary': collapseTitle === null || isCategorySelected,
            }
          )}
          style={{
            fontWeight: '500',
            letterSpacing: collapseTitle === null ? 0 : 1,
          }}
        >
          {collapseTitle === null ? (
            siteTitle
          ) : (
            <>
              {collapseTitle}
              {collapseOpen ? (
                <FaCaretUp className="mr-3" />
              ) : (
                <FaCaretDown className="mr-3" />
              )}
            </>
          )}{' '}
        </NavLink>
        <Nav
          vertical
          tag={collapseTitle === null ? 'ul' : Collapse}
          {...collapseIsOpenProp}
          className="mb-2"
          navbar
        >
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
      </span>{' '}
      {collapseTitle === null && <CollapseAll />}
    </>
  );
};
NavigationItem.propTypes = {
  collapseTitle: PropTypes.string,
  siteTitle: PropTypes.string,
  isCategorySelected: PropTypes.bool,
  pages: PropTypes.array,
  isPageSelected: PropTypes.func,
};

export default NavigationItem;
