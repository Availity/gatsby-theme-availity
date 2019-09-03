import React, { useRef } from 'react';
import { graphql } from 'gatsby';
import RehypeReact from 'rehype-react';
import { Table } from 'reactstrap';
import { MDXProvider } from '@mdx-js/react';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import 'availity-uikit';

import {
  SiteMetadata,
  Navigation,
  SideNavigation,
  PageContent,
  PageHeader,
  CodeBlock,
} from './components';
import './style.scss';

const components = {
  code: CodeBlock,
  pre: props => props.children,
  table: Table,
};

// Will take in a snippet of code in AST Form and render it as text
const renderAst = new RehypeReact({
  createElement: React.createElement,
  components,
}).Compiler;

// The Template to load on each page
const Template = ({
  location,
  pageContext: { sidebarContents, navItems },
  data,
}) => {
  // Keep a ref of the current content window for jumping to certain anchors in section nav
  const mainRef = useRef(null);

  const { file, site } = data;
  const { frontmatter, headings } = file.childMarkdownRemark || file.childMdx;

  const { hash, pathname } = location;

  const pages = sidebarContents
    .reduce((acc, { pages }) => acc.concat(pages), [])
    .filter(page => !page.anchor);

  function isPathActive(value) {
    return !location.pathname.indexOf(value);
  }

  return (
    <div className="h-100 d-flex flex-column">
      <SiteMetadata pathname={pathname} />
      <Navigation
        className="pl-4"
        navItems={navItems}
        pathname={pathname}
        isPathActive={isPathActive}
      />
      <div className="d-flex h-100">
        <SideNavigation
          currentPath={pathname}
          contents={sidebarContents}
          siteTitle={site.siteMetadata.subtitle}
          className="flex-shrink-0 ml-4 pt-4"
          style={{
            overflowY: 'auto',
            width: 200,
          }}
        />
        <div
          className="d-flex flex-column h-100 w-100 p-5 "
          style={{
            overflowY: 'auto',
          }}
          ref={mainRef}
        >
          <PageHeader {...frontmatter} />
          <PageContent
            className="p-4 flex-fill"
            title={frontmatter.title}
            headings={headings}
            pages={pages}
            hash={hash}
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
    </div>
  );
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
        headings(depth: h2) {
          value
        }
        htmlAst
      }
      childMdx {
        frontmatter {
          title
          summary
        }
        headings(depth: h2) {
          value
        }
        body
      }
    }
  }
`;
