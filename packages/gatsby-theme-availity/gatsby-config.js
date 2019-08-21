module.exports = ({
  contentPath = 'source/',
  description = 'Documentation for Availity Javascript SDK, Rest API and GraphQL',
}) => {
  const config = {
    siteMetadata: {
      title: 'Avality Docs',
      description,
    },
    plugins: [
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: contentPath,
          path: contentPath,
        },
      },
      'gatsby-transformer-remark',
      'gatsby-plugin-sass',
    ],
  };

  return config;
};
