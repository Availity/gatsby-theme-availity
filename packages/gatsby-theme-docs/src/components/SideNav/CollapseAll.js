import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { NavLink } from 'reactstrap';
import { FaExpand, FaCompress } from 'react-icons/fa';
import { CollapseContext } from './CollapseContext';

const CollapseAll = ({ className, onClick, ...props }) => {
  const [localStorageForCollapse, setLocalStorageForCollapse] = useContext(
    CollapseContext
  );

  const shouldExpand = Object.keys(localStorageForCollapse).some(
    key => localStorageForCollapse[key] === false
  );

  const toggle = () => {
    const newObj = {};

    Object.keys(localStorageForCollapse).forEach(key => {
      newObj[key] = shouldExpand;
    });

    setLocalStorageForCollapse(newObj);
  };

  return (
    <NavLink
      onClick={e => {
        toggle();
        if (onClick) {
          onClick(e);
        }
      }}
      className={classnames(
        className,
        'd-flex align-items-center border-bottom text-secondary'
      )}
      {...props}
    >
      {shouldExpand ? (
        <>
          <FaExpand className="mr-2" />
          Expand
        </>
      ) : (
        <>
          <FaCompress className="mr-2" />
          Collapse
        </>
      )}{' '}
      All
    </NavLink>
  );
};

CollapseAll.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default CollapseAll;
