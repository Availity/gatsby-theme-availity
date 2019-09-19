import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { navigate } from 'gatsby';
import { NavLink } from 'reactstrap';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { useCollapse } from './CollapseContext';
import CollapseAll from './CollapseAll';
import NavItemAlt from './NavItemAlt';

const NavigationItem = ({
  collapseTitle,
  className,
  isCategorySelected,
  siteTitle,
  pages,
  path,
  isPageSelected,
}) => {
  const [collapseOpen, toggle] = useCollapse(collapseTitle, isCategorySelected);

  const collapseIsOpenProp = {};

  const isSecondaryCategory = !!path;
  const isRootLink = collapseTitle === null;

  if (!isRootLink) {
    collapseIsOpenProp.isOpen = collapseOpen;
    collapseIsOpenProp.mountOnEnter = true;
  }

  const toggleCollapse = () => {
    if (!isSecondaryCategory) {
      return toggle();
    }

    if (!collapseOpen) {
      navigate(path);
    } else if (collapseOpen && !isPageSelected({ path })) {
      return navigate(path);
    }

    return toggle();
  };

  return (
    <>
      <span
        key={collapseTitle}
        className={classnames(className, {
          'border-bottom': !isRootLink && !isSecondaryCategory,
        })}
        style={{
          backgroundColor:
            isCategorySelected &&
            !isSecondaryCategory &&
            !isRootLink &&
            'rgba(34, 97, 181, 0.03)',
        }}
      >
        <NavLink
          onClick={() => !isRootLink && toggleCollapse()}
          className={classnames(
            'pt-2 pb-2 d-flex align-items-center justify-content-between pl-4 position-relative',
            {
              'text-uppercase': !isRootLink && !isSecondaryCategory,
              lead: isRootLink,
              'text-primary': isRootLink || isCategorySelected,
              'sidenav-link-active':
                isCategorySelected &&
                !isRootLink &&
                isSecondaryCategory &&
                isPageSelected({ path }),
              'sidenav-header-link': !isRootLink,
              'sidenav-link': !isPageSelected({ path }) && !isRootLink,
            }
          )}
          style={{
            fontWeight: (!isSecondaryCategory || isCategorySelected) && '500',
            letterSpacing: isSecondaryCategory || isRootLink ? 0 : 1,
          }}
        >
          {isRootLink ? (
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
        <NavItemAlt
          isRootLink={isRootLink}
          isSecondaryCategory={isSecondaryCategory}
          collapseProps={collapseIsOpenProp}
          isPageSelected={isPageSelected}
          pages={pages}
        />
      </span>{' '}
      {isRootLink && <CollapseAll className="pl-4" />}
    </>
  );
};
NavigationItem.propTypes = {
  className: PropTypes.string,
  collapseTitle: PropTypes.string,
  siteTitle: PropTypes.string,
  isCategorySelected: PropTypes.bool,
  pages: PropTypes.array,
  path: PropTypes.string,
  isPageSelected: PropTypes.func,
};

export default NavigationItem;
