import React from 'react';
import { Nav } from 'reactstrap';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox } from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  'GMG8Z5BKDD',
  '0b450469b039670b7653b5259d2af8a4'
);

const Search = () => {
  return (
    <Nav className="ml-auto" navbar>
      <div>
        <InstantSearch indexName="dev_DOCS" searchClient={searchClient}>
          <SearchBox
            searchAsYouType
            /* onSubmit={event => {
              event.preventDefault();
              console.log(event.currentTarget.value);
            }} */
          />
        </InstantSearch>
      </div>
    </Nav>
  );
};

export default Search;
