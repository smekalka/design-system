import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import ShareProvider from './ShareProvider';

import { PRIORITY_MAP, useServicesByLocale, SHARE_DATA } from '../utils';
import ShareButton from './ShareButton';

import styles from '../styles.scss';
import CopyButton from './CopyButton';
import ShareIcon from './ShareIcon';

const cn = classnames.bind(styles);

const Share = ({
  classNameMap,
  url,
  prioritize,
  services,
  priorityMap,
  onButtonClick,
}) => {
  const wrapperClasses = cn(
    'wrapper',
    classNameMap.wrapper,
  );
  const moreClasses = cn(
    'show-more-button',
    classNameMap.showMoreButton,
  );
  const featuredClasses = cn(
    'featured',
    classNameMap.featured,
  );
  const servicesClasses = cn(
    'services',
    classNameMap.services,
  );
  const iconClasses = cn(
    'icon',
    classNameMap.shareButtonIcon,
  );
  const labelClasses = cn(
    'label',
    classNameMap.shareButtonLabel,
  );

  const [ collapsed, setCollapsed ] = useState(true);
  const locale = useRef(navigator.language.split('-')[0]);
  const { featured, other } = useServicesByLocale(locale.current, services, prioritize ? priorityMap : []);

  const renderServices = (items) => items.map((service) => (
    <ShareButton
      key={ service.label }
      type={ service.label }
    >
      <ShareIcon
        className={ iconClasses }
        icon={ service.label }
      />
      <span className={ labelClasses }>
        { service.label }
      </span>
    </ShareButton>
  ));

  const copyButton = (
    <CopyButton>
      <ShareIcon
        className={ iconClasses }
        icon="copy"
      />
      <span className={ labelClasses }>
        Copy Link
      </span>
    </CopyButton>
  );

  const handleMoreClick = () => setCollapsed(!collapsed);

  return (
    <ShareProvider
      url={ url }
      buttonClassName={ classNameMap.shareButton }
      onButtonClick={ onButtonClick }
    >
      <div className={ wrapperClasses }>
        {
          prioritize && (
            <div className={ featuredClasses }>
              { copyButton }
              { renderServices(featured) }
            </div>
          )
        }

        {
          !collapsed && (
            <div className={ servicesClasses }>
              { !prioritize && copyButton }
              { renderServices(other) }
            </div>
          )
        }

        {
          prioritize && (
            <button
              type="button"
              className={ moreClasses }
              onClick={ handleMoreClick }
            >
              { collapsed ? 'show more' : 'hide' }
            </button>
          )
        }
      </div>
    </ShareProvider>
  );
};

Share.propTypes = {
  url: PropTypes.string.isRequired,
  services: PropTypes.objectOf(PropTypes.string),
  prioritize: PropTypes.bool,
  priorityMap: PropTypes.arrayOf(PropTypes.shape({
    locales: PropTypes.arrayOf(PropTypes.string).isRequired,
    order: PropTypes.arrayOf(PropTypes.string).isRequired,
  })),
  onButtonClick: PropTypes.func,
  classNameMap: PropTypes.shape({
    wrapper: PropTypes.string,
    featured: PropTypes.string,
    services: PropTypes.string,
    showMoreButton: PropTypes.string,
    shareButton: PropTypes.string,
    shareButtonIcon: PropTypes.string,
    shareButtonLabel: PropTypes.string,
  }),
};

Share.defaultProps = {
  services: SHARE_DATA,
  prioritize: true,
  priorityMap: PRIORITY_MAP,
  onButtonClick: null,
  classNameMap: {},
};

export default Share;
