import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { navigate } from 'gatsby';
import { NavLink as RsNavLink } from 'reactstrap';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { useCollapse } from './CollapseContext';
import CollapseAll from './CollapseAll';
// eslint-disable-next-line import/no-cycle
import NavLink from './NavLink';

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
        className={classnames(className, 'position-relative', {
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
        <RsNavLink
          onClick={() =>
            !isRootLink &&
            (!isSecondaryCategory || !isPageSelected({ path })) &&
            toggleCollapse()
          }
          className={classnames(
            'pt-2 pb-2 d-flex align-items-center justify-content-between pl-4 position-relative',
            {
              'text-uppercase': !isRootLink && !isSecondaryCategory,
              lead: isRootLink,
              'text-primary': isRootLink || isCategorySelected,
              'text-secondary': isSecondaryCategory && !isCategorySelected,
              'sidenav-link-active hover':
                isCategorySelected &&
                !isRootLink &&
                isSecondaryCategory &&
                isPageSelected({ path }),
              'sidenav-header-link': !isRootLink,
              'sidenav-link hover': !isPageSelected({ path }) && !isRootLink,
            }
          )}
          style={{
            fontWeight: (!isSecondaryCategory || isCategorySelected) && '500',
            letterSpacing: isSecondaryCategory || isRootLink ? 0 : 1,
          }}
        >
          {isRootLink ? siteTitle : collapseTitle}
        </RsNavLink>
        {!isRootLink && (
          <RsNavLink
            onClick={() => !isRootLink && toggle()}
            className="position-absolute py-2 px-3 sidenav-collapse"
            style={{
              right: 0,
              top: 0,
            }}
          >
            {collapseOpen ? <FaCaretUp /> : <FaCaretDown />}
          </RsNavLink>
        )}
        <NavLink
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
