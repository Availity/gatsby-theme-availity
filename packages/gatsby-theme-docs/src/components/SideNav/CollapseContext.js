import React, { createContext, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocalStorage } from 'react-use';
import { withPrefix } from 'gatsby';

export const CollapseContext = createContext();

export const CollapseProvider = ({ siteName, ...props }) => {
  const [localStorageForCollapse, setLocalStorageForCollapse] = useLocalStorage(
    `sidenav-dropdown-${siteName}`,
    {}
  );
  return (
    <CollapseContext.Provider
      value={[localStorageForCollapse, setLocalStorageForCollapse]}
      {...props}
    />
  );
};

CollapseProvider.propTypes = {
  siteName: PropTypes.string,
};

export const useCollapse = (title, initialValue) => {
  const [localStorageForCollapse, setLocalStorageForCollapse] = useContext(
    CollapseContext
  );

  const collapseTitle = withPrefix(title);

  useEffect(() => {
    if (
      localStorageForCollapse[collapseTitle] === undefined ||
      (initialValue && !localStorageForCollapse[collapseTitle])
    ) {
      setLocalStorageForCollapse(prevState => ({
        ...prevState,
        [collapseTitle]: initialValue,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isOpen = localStorageForCollapse[collapseTitle];

  const toggle = () => {
    setLocalStorageForCollapse(prevState => ({
      ...prevState,
      [collapseTitle]: !isOpen,
    }));
  };

  return [isOpen, toggle];
};
