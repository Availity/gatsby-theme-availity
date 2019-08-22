import React from 'react';
import classnames from 'classnames';
import { Link } from 'gatsby';
import { Nav, NavItem, NavLink } from 'reactstrap';

export default ({ currentPath, contents, ...rest }) => (
  <div {...rest}>
    <Nav vertical navbar className="h-100 text-dark">
      {contents.map(({ title: collapseTitle, pages }) => {
        return (
          <span key={collapseTitle}>
            <p className="mt-3 mb-1" style={{ fontWeight: '500' }}>
              {collapseTitle}
            </p>
            <Nav vertical className="pl-3">
              {pages.map(({ path, title }) => (
                <NavItem key={title} active={path === currentPath}>
                  <NavLink
                    tag={Link}
                    to={path}
                    active={path === currentPath}
                    className={classnames({
                      'font-weight-bold': path === currentPath,
                    })}
                  >
                    {title}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
          </span>
        );
      })}
    </Nav>
  </div>
);
