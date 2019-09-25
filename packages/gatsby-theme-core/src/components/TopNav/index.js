import React, { useState } from 'react';
import classnames from 'classnames';
import {
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  Nav,
  NavbarToggler,
  Collapse,
} from 'reactstrap';
import { navigate, Link } from 'gatsby';
import { isAbsoluteUrl } from '@availity/resolve-url';
import Search from './Search';
import Logo from './Logo';

const Navigation = ({
  className,
  brandAttrs: { className: bClassName, ...restBrandAttrs } = {},
  navItems = [],
  pathname = '',
  ...props
}) => {
  const [isOpen, toggleNavbar] = useState(true);

  function isPathActive(value) {
    return !pathname.indexOf(value);
  }

  return (
    <Navbar
      light
      expand="md"
      className={classnames('bg-light flex-md-nowrap', className)}
      {...props}
    >
      <NavbarBrand
        {...restBrandAttrs}
        onClick={() => navigate('/')}
        className={classnames('mr-auto', bClassName)}
        style={{ width: 300 }}
      >
        <Logo />
      </NavbarBrand>
      <Search />

      <NavbarToggler onClick={() => toggleNavbar(!isOpen)} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto">
          {navItems.map(({ value, text, matchRegex }) => {
            const isActive = matchRegex
              ? new RegExp(matchRegex).test(pathname)
              : isPathActive(value);

            const isAbsolute = isAbsoluteUrl(value);
            const NavProps = {};

            if (isAbsolute) {
              NavProps.href = value;
            } else {
              NavProps.to = value;
              NavProps.tag = Link;
            }

            return (
              <NavItem key={value} active={isActive}>
                <NavLink
                  {...NavProps}
                  active={isActive}
                  className={isActive ? 'text-primary' : 'text-dark'}
                >
                  {text}
                </NavLink>
              </NavItem>
            );
          })}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Navigation;
