import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { StaticQuery, graphql, withPrefix } from 'gatsby';
import 'availity-uikit';
import '../style.scss';

export default function Layout({ pathname, children }) {
  return (
    <StaticQuery
      query={graphql`
        {
          site {
            siteMetadata {
              title
              description
            }
          }
        }
      `}
      render={data => {
        const { title, description, siteUrl } = data.site.siteMetadata;
        return (
          <>
            <Helmet defaultTitle={title} titleTemplate={`%s - ${title}`}>
              <meta name="description" content={description} />
              <link rel="icon" href={withPrefix('/favicon.ico')} />
              <html lang="en" />
              <link rel="canonical" href={`${siteUrl}${pathname}`} />
              <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css"
              />
              <meta name="docsearch:version" content="2.0" />
              <meta
                name="viewport"
                content="width=device-width,initial-scale=1,shrink-to-fit=no,viewport-fit=cover"
              />

              <meta property="og:url" content={siteUrl} />
              <meta property="og:type" content="website" />
              <meta property="og:locale" content="en" />
              <meta property="og:site_name" content={title} />
              <meta property="og:image:width" content="512" />
              <meta property="og:image:height" content="512" />

              <meta name="twitter:card" content="summary" />
              <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css"
              />
            </Helmet>
            <div className="h-100 d-flex flex-column">{children}</div>
          </>
        );
      }}
    />
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
