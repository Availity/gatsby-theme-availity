import React, { useRef } from 'react';
import { graphql } from 'gatsby';
import RehypeReact from 'rehype-react';
import { MDXProvider } from '@mdx-js/react';
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer';
import { preToCodeBlock } from 'mdx-utils';
import {
  SiteMetadata,
  Navigation,
  SideNavigation,
  PageContent,
  PageHeader,
  CodeBlock,
} from './components';
import './style.scss';

import 'availity-uikit';

const components = {
  pre: preProps => {
    const props = preToCodeBlock(preProps);
    // if there's a codeString and some props, we passed the test
    if (props) {
      console.log('Code block');
      return <CodeBlock {...props} />;
    }
    // it's possible to have a pre without a code in it
    return <pre {...preProps} />;
  },
  // pre: props => props.children
};

const renderAst = new RehypeReact({
  createElement: React.createElement,
  components,
}).Compiler;

const Template = ({
  children,
  location,
  pageContext: { sidebarContents },
  data,
  ...rest
}) => {
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
      {/* <SkipNavLink/> */}
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
      {/* <SkipNavContent/> */}
      {children}
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
