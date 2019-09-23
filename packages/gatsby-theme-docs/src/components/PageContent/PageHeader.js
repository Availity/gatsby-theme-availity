import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'reactstrap';
import { FaGithub } from 'react-icons/fa';
import PageHeader from '@availity/page-header';
import { withPrefix } from 'gatsby';

// Top Page header that is rendered on the current page
const CustomPageHeader = ({
  title,
  siteTitle,
  summary,
  currentPage,
  githubUrl,
}) => {
  const crumbs = useMemo(() => {
    const crumbArr = [
      {
        name: siteTitle,
        url: withPrefix(),
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

  return (
    <PageHeader
      homeUrl="/"
      appName={title}
      crumbs={crumbs}
      renderRightContent={({ className }) => (
        <div
          className={classNames(
            className,
            'd-xs-none d-sm-none d-md-none d-lg-block'
          )}
        >
          <Button
            href={githubUrl}
            color="light"
            className="d-flex align-items-center"
          >
            <FaGithub size={18} className="mr-2" />
            Edit On Github
          </Button>
        </div>
      )}
    >
      <div className="d-flex flex-column">
        <h1
          className={classNames({
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
  githubUrl: PropTypes.string,
};

export default CustomPageHeader;
