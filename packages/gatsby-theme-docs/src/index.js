/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/heading-has-content */
import React, { useRef, useMemo, useCallback } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { graphql, withPrefix } from 'gatsby';
import RehypeReact from 'rehype-react';
import { Table } from 'reactstrap';
import { MDXProvider } from '@mdx-js/react';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import { TopNavigation, Layout } from '@availity/gatsby-theme-core';
import {
  SideNavigation,
  PageContent,
  PageHeader,
  CodeBlock,
} from './components';
import './styles.scss';

// The Template to load on each page
const Template = ({
  location,
  pageContext: { sidebarContents, navItems, githubUrl, baseUrl },
  data,
}) => {
  const components = {
    code: CodeBlock,
    inlineCode: CodeBlock,
    pre: props => props.children,
    table: Table,
    h2: ({ className, ...props }) => (
      <h2 className={classnames(className, 'mt-5 h4')} {...props} />
    ),
    h3: ({ className, ...props }) => (
      <h3 className={classnames(className, 'mt-4 h5')} {...props} />
    ),
    h4: ({ className, ...props }) => (
      <h3 className={classnames(className, 'mt-4 h6')} {...props} />
    ),
  };

  // Will take in a snippet of code in AST Form and render it as text
  const renderAst = new RehypeReact({
    createElement: React.createElement,
    components,
  }).Compiler;

  // Keep a ref of the current content window for jumping to certain anchors in section nav
  const mainRef = useRef(null);

  const { file, site } = data;
  const { frontmatter, headings } = file.childMarkdownRemark || file.childMdx;

  const { hash, pathname } = location;

  const reduceFn = useCallback((_acc, { pages: _pages, ...__page }) => {
    if (__page.title && __page.path) {
      _acc = _acc.concat({ ...__page, pages: _pages });
    }

    if (_pages) {
      _acc = _acc.concat(_pages.reduce(reduceFn, []));
    }

    return _acc;
  }, []);

  const pages = useMemo(
    () => sidebarContents.reduce(reduceFn, []).filter(page => !page.anchor),
    [sidebarContents, reduceFn]
  );

  const pageIndex = pages.findIndex(page => {
    const prefixedPath = withPrefix(page.path);
    return (
      prefixedPath === pathname || prefixedPath.replace(/\/$/, '') === pathname
    );
  });

  return (
    <Layout>
      <TopNavigation
        brandAttrs={{ className: 'pl-4' }}
        className="pl-0"
        navItems={navItems}
        pathname={pathname}
      />
      <div className="d-flex h-100">
        <SideNavigation
          currentPath={pathname}
          contents={sidebarContents}
          siteTitle={site.siteMetadata.subtitle}
          className="flex-shrink-0 py-4 border-right"
          style={{
            overflowY: 'auto',
            width: 300,
          }}
        />
        <div
          className="d-flex flex-column h-100 w-100 px-5 pb-5 pt-4"
          style={{
            overflowY: 'auto',
          }}
          ref={mainRef}
        >
          <PageHeader
            {...frontmatter}
            siteTitle={site.siteMetadata.subtitle}
            currentPage={pages[pageIndex]}
            baseUrl={baseUrl}
            githubUrl={githubUrl}
            pages={pages}
          />
          <PageContent
            className="p-4 flex-fill"
            title={frontmatter.title}
            headings={headings}
            pages={pages}
            hash={hash}
            pageIndex={pageIndex}
            mainRef={mainRef}
          >
            {file.childMdx ? (
              <MDXProvider components={components}>
                <MDXRenderer>{file.childMdx.body}</MDXRenderer>
              </MDXProvider>
            ) : (
              renderAst(file.childMarkdownRemark.htmlAst)
            )}
          </PageContent>
        </div>
      </div>
    </Layout>
  );
};

Template.propTypes = {
  location: PropTypes.object,
  pageContext: PropTypes.object,
  data: PropTypes.object,
};

export default Template;

export const pageQuery = graphql`
  query PageQuery($id: String) {
    site {
      siteMetadata {
        title
        subtitle
        description
      }
    }
    file(id: { eq: $id }) {
      childMarkdownRemark {
        frontmatter {
          title
          summary
        }
        headings {
          value
          depth
        }
        htmlAst
      }
      childMdx {
        frontmatter {
          title
          summary
        }
        headings {
          value
          depth
        }
        body
      }
    }
  }
`;
