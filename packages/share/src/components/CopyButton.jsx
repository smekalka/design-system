import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from '../styles.scss';
import { useShareContext } from './shareContext';
import copyToClipboard from '../utils/copyToClipboard';

const cn = classnames.bind(styles);

const CopyButton = ({ className, text, onClick, children }) => {
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

  if (!text && !urlFromContext) {
    throw new Error('Please provide text for copying!');
  }

  const handleClick = () => {
    copyToClipboard(text || urlFromContext)
      .then(() => {
        onButtonClick && onButtonClick();
        typeof onClick === 'function' && onClick();
      });
  };

  return (
    <button
      className={ classes }
      type="button"
      onClick={ handleClick }
    >
      { children }
    </button>
  );
};

CopyButton.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

CopyButton.defaultProps = {
  className: null,
  text: null,
  onClick: null,
};

export default CopyButton;
