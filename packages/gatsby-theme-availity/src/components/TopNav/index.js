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
import Search from './Search';
import Logo from './Logo';

const Navigation = ({
  className,
  navItems,
  isPathActive,
  pathname,
  ...props
}) => {
  const [isOpen, toggleNavbar] = useState(true);
  return (
    <Navbar
      light
      expand="md"
      className={classnames('bg-light flex-md-nowrap', className)}
      {...props}
    >
      <NavbarBrand
        href="//availity.github.io/"
        className="mr-auto"
        style={{ width: 200 }}
      >
        <Logo className="mr-3" />
        Availity Docs
      </NavbarBrand>
      <Search />

      <NavbarToggler onClick={() => toggleNavbar(!isOpen)} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto">
          {navItems.map(({ value, text, matchRegex }) => {
            const isActive = matchRegex
              ? new RegExp(matchRegex).test(pathname)
              : isPathActive(value);
            return (
              <NavItem key={value} active={isActive}>
                <NavLink
                  href={value}
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
