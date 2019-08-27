import React, { useRef } from 'react';
import { graphql } from 'gatsby';
import RehypeReact from 'rehype-react';
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
};

// Will take in a snippet of code in AST Form and render it as text
const renderAst = new RehypeReact({
  createElement: React.createElement,
  components,
}).Compiler;

// The Template to load on each page
const Template = ({
  children,
  location,
  pageContext: { sidebarContents },
  data,
  ...rest
}) => {
  // Keep a ref of the current content window for jumping to certain anchors in section nav
  const mainRef = useRef(null);

  const { file } = data;
  const { frontmatter, headings } = file.childMarkdownRemark || file.childMdx;

  const { hash, pathname } = location;

  const pages = sidebarContents
    .reduce((acc, { pages }) => acc.concat(pages), [])
    .filter(page => !page.anchor);

  return (
    <div className="h-100 d-flex flex-column">
      <SiteMetadata pathname={pathname} />
      <Navigation />
      <div className="d-flex h-100">
        <SideNavigation
          currentPath={rest.path}
          contents={sidebarContents}
          className="flex-shrink-0 ml-5 pt-5"
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
