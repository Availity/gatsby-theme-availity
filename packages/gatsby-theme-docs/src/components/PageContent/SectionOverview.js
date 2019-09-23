import React from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'gatsby';

const SectionOverview = ({ sections }) => (
  <div className="my-5">
    <h3 className="h4">In this Section:</h3>
    <Nav vertical>
      {sections.map(({ title, path }) => (
        <NavItem className="py-1 pl-0">
          <li>
            <NavLink tag={Link} to={path}>
              {title}
            </NavLink>
          </li>
        </NavItem>
      ))}
    </Nav>
  </div>
);

SectionOverview.propTypes = {
  sections: PropTypes.array,
};

export default SectionOverview;
