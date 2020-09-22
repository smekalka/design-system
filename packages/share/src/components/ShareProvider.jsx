import React from 'react';
import PropTypes from 'prop-types';

import ShareContext from './shareContext';

const ShareProvider = ({
  url,
  buttonClassName,
  onButtonClick,
  children,
}) => {
  const contextValue = {
    url,
    buttonClassName,
    onButtonClick,
  };

  return (
    <ShareContext.Provider value={ contextValue }>
      { children }
    </ShareContext.Provider>
  );
};

ShareProvider.propTypes = {
  buttonClassName: PropTypes.string,
  url: PropTypes.string,
  onButtonClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

ShareProvider.defaultProps = {
  url: null,
  buttonClassName: null,
  onButtonClick: null,
};

export default ShareProvider;
