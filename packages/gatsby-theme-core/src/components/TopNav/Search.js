/* global docsearch */
import React, { useEffect, useState, useRef } from 'react';
import classnames from 'classnames';
import { FaTimes } from 'react-icons/fa';
import { Nav, Form, Input } from 'reactstrap';

const HotKey = ({ className, style, ...props }) => (
  <span
    className={classnames(
      className,
      'rounded text-center py-1 px-2 position-absolute'
    )}
    style={{
      ...style,
      zIndex: 6,
      right: 8,
      lineHeight: 1.125,
      top: '50%',
      transform: 'translateY(-50%)',
    }}
    {...props}
  />
);

// Overlay for the opacity overtop the search/results
const Overlay = ({ visible }) => (
  <div
    style={{
      // responsiveStyles,
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      opacity: visible ? 'auto' : 'initial',
      visibility: visible ? 'visible' : 'hidden',
      backgroundColor: 'rgba(0,0,0,0.5)',
      transitionProperty: 'opacity, visibility',
      transitionDuration: '150ms',
      dtransitionTimingFunction: 'ease-in-out',
      zIndex: 5,
    }}
  />
);

// Search For Algolia
const Search = () => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const input = useRef();
  const search = useRef(null);

  const onKeyDown = event => {
    // focus the input when the slash key is pressed
    if (
      event.keyCode === 191 &&
      event.target.tagName.toUpperCase() !== 'INPUT' &&
      event.target.tagName.toUpperCase() !== 'TEXTAREA'
    ) {
      event.preventDefault();
      input.current.focus();
    }
  };

  // On mount add event listeners for focusing and updating the input
  useEffect(() => {
    if (typeof docsearch !== 'undefined') {
      search.current = docsearch({
        apiKey: 'eec0154a008662c32d440b7de7982cd2',
        indexName: 'availity',
        inputSelector: '#input',
        // debug: true, // keeps the results list open
        autocompleteOptions: {
          openOnFocus: true,
        },
      });
    }

    window.addEventListener('keydown', onKeyDown, true);

    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, []);

  const onChange = event => setValue(event.target.value);

  const onFocus = () => setFocused(true);

  const onBlur = () => setFocused(false);

  const reset = () => {
    setValue('');
    if (search.current) {
      search.current.autocomplete.autocomplete.setVal('');
    }
  };

  const resultsShown = focused && value.trim();

  return (
    <Nav
      className="ml-5 d-xs-none d-sm-none d-md-none d-lg-none d-xl-block"
      navbar
    >
      <Form inline className="position-relative">
        <Overlay visible={resultsShown} />
        <Input
          innerRef={input}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          id="input"
          type="text"
          placeholder="Search Availity Docs"
          style={{ zIndex: 5, width: 400 }}
        />
        {focused && value && (
          <HotKey
            onClick={reset}
            style={{
              cursor: 'pointer',
            }}
            onMouseDown={event => event.preventDefault()}
          >
            <FaTimes />
          </HotKey>
        )}
        {!focused && (
          <HotKey
            style={{ pointerEvents: 'none' }}
            className="border border-light text-light"
          >
            /
          </HotKey>
        )}
        <Overlay />
      </Form>
    </Nav>
  );
};

export default Search;
