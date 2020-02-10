import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'reactstrap';
import { FaGithub, FaBitbucket, FaGitlab } from 'react-icons/fa';
import PageHeader from '@availity/page-header';
import { Link } from 'gatsby';

// eslint-disable-next-line react/prop-types
const EditText = ({ gitType }) => {
  switch (gitType) {
    case 'bitbucket':
      return (
        <>
          <FaBitbucket size={18} className="mr-2" /> Edit on Bitbucket
        </>
      );
    case 'gitlab':
      return (
        <>
          <FaGitlab size={18} className="mr-2" /> Edit on GitLab
        </>
      );
    default:
      return (
        <>
          <FaGithub size={18} className="mr-2" /> Edit on Github
        </>
      );
  }
};

// Top Page header that is rendered on the current page
const CustomPageHeader = ({
  title,
  siteTitle,
  summary,
  currentPage,
  baseUrl,
  gitType,
  gitUrl,
}) => {
  const crumbs = useMemo(() => {
    const crumbArr = [
      {
        name: siteTitle,
        url: '/',
      },
    ];

    if (currentPage.parent) {
      crumbArr.push({
        name: currentPage.parent.title,
        url: currentPage.parent.path,
      });
    }

    return crumbArr;
  }, [currentPage, siteTitle]);

  const isIndexPage = currentPage.path === '/';

  return (
    <PageHeader
      className="flex-shrink-0"
      homeUrl="/"
      appName={isIndexPage ? siteTitle : title}
      crumbs={isIndexPage ? [] : crumbs}
      linkTag={({ href, children, ...props }) => {
        if (children === 'Home') {
          return (
            <a href={baseUrl} {...props}>
              {children}
            </a>
          );
        }

        return (
          <Link {...props} to={href}>
            {children}
          </Link>
        );
      }}
      renderRightContent={({ className }) => (
        <div
          className={classNames(
            className,
            'd-xs-none d-sm-none d-md-none d-lg-block'
          )}
        >
          <Button
            href={gitUrl}
            color="light"
            className="d-flex align-items-center mr-4"
          >
            <EditText gitType={gitType} />
          </Button>
        </div>
      )}
    >
      <div className="d-flex flex-column">
        <h1
          className={classNames('h2', {
            'mb-0': !summary,
          })}
        >
          {title}
        </h1>
        {summary && <h3 className="h4 text-secondary mb-0">{summary}</h3>}
      </div>
    </PageHeader>
  );
};

CustomPageHeader.propTypes = {
  title: PropTypes.string,
  siteTitle: PropTypes.string,
  summary: PropTypes.string,
  currentPage: PropTypes.object,
  gitUrl: PropTypes.string,
  gitType: PropTypes.string,
  baseUrl: PropTypes.string,
};

export default CustomPageHeader;
