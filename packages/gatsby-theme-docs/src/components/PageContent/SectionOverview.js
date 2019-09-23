import React from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'gatsby';

const SectionOverview = ({ sections }) => (
  <div className="my-5">
    <h3 className="h4">In this Section:</h3>
    <Nav
      vertical
      style={{
        listStyle: 'circle',
      }}
    >
      {sections.map(({ title, path }) => (
        <NavItem className="py-1 pl-0 ml-5" key={path}>
          <NavLink tag={Link} to={path} className="pl-0">
            {title}
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  </div>
);

SectionOverview.propTypes = {
  sections: PropTypes.array,
};

export default SectionOverview;
