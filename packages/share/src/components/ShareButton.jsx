import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from '../styles.scss';
import { useShareContext } from './shareContext';
import { SHARE_DATA } from '../utils';

const cn = classnames.bind(styles);

const ShareButton = ({
  className,
  type,
  url,
  shareLink,
  onClick,
  children,
}) => {
  const {
    url: urlFromContext,
    onButtonClick,
    buttonClassName,
  } = useShareContext();

  const classes = cn(
    'share-button',
    className,
    buttonClassName,
  );

  if (!url && !urlFromContext) {
    throw new Error('Please provide URL for sharing!');
  }

  if (!SHARE_DATA[type] && !shareLink) {
    throw new Error('Please provide correct service name from supported services list or use custom share link!');
  }

  let shareUrl;

  if (url) {
    shareUrl =  SHARE_DATA[type] + url;
  } else if (urlFromContext) {
    shareUrl =  SHARE_DATA[type] + urlFromContext;
  } else {
    shareUrl = shareLink;
  }

  const handleClick = () => {
    onButtonClick && onButtonClick();
    typeof onClick === 'function' && onClick();
  };

  return (
    <a
      href={ shareUrl }
      target="_blank"
      rel="noreferrer"
      className={ classes }
      onClick={ handleClick }
    >
      { children }
    </a>
  );
};

ShareButton.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(Object.keys(SHARE_DATA)),
  url: PropTypes.string,
  shareLink: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

ShareButton.defaultProps = {
  className: null,
  type: null,
  url: null,
  shareLink: null,
  onClick: null,
};

export default ShareButton;
