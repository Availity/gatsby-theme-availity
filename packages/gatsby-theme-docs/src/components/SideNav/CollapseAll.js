import React, { useContext } from 'react';
import { NavLink } from 'reactstrap';
import { FaExpand, FaCompress } from 'react-icons/fa';
import { CollapseContext } from './CollapseContext';

export default () => {
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
    <NavLink onClick={toggle} className="d-flex align-items-center border-bottom text-secondary">
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
