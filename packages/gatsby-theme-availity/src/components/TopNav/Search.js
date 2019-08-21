import React from 'react';
import { Nav, Form, Button, Input } from 'reactstrap';

const Search = () => {
  return (
    <Nav className="ml-auto" navbar>
      <Form inline>
        <Input type="text" placeholder="Search" className="mr-sm-2" />
      </Form>
    </Nav>
  );
};

export default Search;
