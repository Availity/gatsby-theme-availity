import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button } from 'reactstrap';
import Layout from '../components/layout';
import TopNavigation from '../components/TopNav';

const navConfig = {
  '/availity-workflow': {
    text: 'Getting Started',
    matchRegex: '^/availity-workflow',
  },
  '/availity-react': {
    text: 'Components',
    matchRegex: '^/availity-react',
  },
  '/sdk-js': {
    text: 'Resources',
    matchRegex: '^/sdk-js',
  },
};

function generateNavItems(baseUrl, config) {
  return Object.entries(config).map(([value, { text, matchRegex }]) => ({
    text,
    value: value.startsWith('/') ? baseUrl + value : value,
    matchRegex,
  }));
}

const NotFoundPage = ({ location }) => {
  const { pathname } = location;

  return (
    <Layout>
      <TopNavigation
        pathname={pathname}
        className="pl-0"
        brandAttrs={{
          className: 'pl-4',
          href: 'https://https://availity/github.io',
        }}
        navItems={generateNavItems('https://availity.github.io', navConfig)}
      />
      <Container className="flex-fill pt-5">
        <Row>
          <Col xs={12} className="mb-3 pb-3">
            <h1 className="mb-3">Page Not Found</h1>
            <h2 className="h4 text-secondary">
              Oops! The page you are looking for has been removed or relocated.
            </h2>
            <Button
              className="pl-0 ml-0"
              href="https://availity.github.io"
              color="link"
              size="lg"
            >
              Go Back
            </Button>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

NotFoundPage.propTypes = {
  location: PropTypes.object,
};

export default NotFoundPage;
