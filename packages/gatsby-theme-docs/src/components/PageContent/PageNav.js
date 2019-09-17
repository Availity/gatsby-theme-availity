import React from 'react';
import PropTypes from 'prop-types';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { NavLink } from 'reactstrap';
import { Link } from 'gatsby';

const PageNav = ({ nextPage, prevPage }) => (
  <div className="d-flex justify-content-between mt-5 mb-5 pl-0 pr-0">
    {prevPage && (
      <NavLink
        tag={Link}
        to={prevPage.path}
        className="d-flex align-items-center text-secondary pl-0"
      >
        <MdChevronLeft size={25} className="mr-1" />
        <span>
          <small>PREVIOUS</small>
          <br />
          <b>{prevPage.title}</b>
        </span>
      </NavLink>
    )}
    {nextPage && (
      <NavLink
        tag={Link}
        to={nextPage.path}
        className="d-flex align-items-center text-secondary ml-auto pr-0"
      >
        <span className="text-right">
          <small>NEXT</small>
          <br />
          <b>{nextPage.title}</b>
        </span>
        <MdChevronRight size={25} className="ml-1" />
      </NavLink>
    )}
  </div>
);

PageNav.propTypes = {
  nextPage: PropTypes.object,
  prevPage: PropTypes.object,
};

export default PageNav;