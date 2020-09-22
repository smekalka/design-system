'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PropTypes = require('prop-types');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

// import React from 'react';

var ShareProvider = function ShareProvider(_ref) {
  var children = _ref.children;
  // const contextValue = {
  //   url,
  //   buttonClassName,
  //   onButtonClick,
  // };
  return children; // return (
  //   <ShareContext.Provider value={ contextValue }>
  //     { children }
  //   </ShareContext.Provider>
  // );
};

ShareProvider.propTypes = {
  buttonClassName: PropTypes__default['default'].string,
  url: PropTypes__default['default'].string,
  onButtonClick: PropTypes__default['default'].func,
  children: PropTypes__default['default'].node.isRequired
};
ShareProvider.defaultProps = {
  url: null,
  buttonClassName: null,
  onButtonClick: null
};

var copyToClipboard = function copyToClipboard(text) {
  return new Promise(function (resolve, reject) {
    if (typeof text !== 'string') reject(Error('Type Error: argument should be a string.'));

    if (!navigator.clipboard) {
      var textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.width = '0';
      textArea.style.height = '0';
      textArea.style.overflow = 'hidden';
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.position = 'fixed';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand('copy');
        resolve(text);
      } catch (err) {
        reject(err);
      } finally {
        document.body.removeChild(textArea);
      }
    }

    navigator.clipboard.writeText(text).then(function () {
      return resolve(text);
    }, function (err) {
      return reject(err);
    });
  });
};

var PRIORITY_MAP = [{
  locales: ['en'],
  order: ['facebook', 'twitter', 'whatsapp']
}, {
  locales: ['ru'],
  order: ['vk', 'facebook', 'whatsapp']
}, {
  locales: ['zh'],
  order: ['qzone', 'wechat']
}, {
  locales: ['ja', 'th'],
  order: ['facebook', 'line', 'whatsapp']
}];
var SHARE_DATA = {
  facebook: 'https://www.facebook.com/dialog/share?app_id=179569853382104&display=popup&href=',
  vk: '',
  whatsapp: '',
  twitter: '',
  viber: ''
};

var useServicesByLocale = function useServicesByLocale() {
  var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en';
  var servicesData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SHARE_DATA;

  var _priorityMap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PRIORITY_MAP;

  if (typeof locale !== 'string') throw new Error('Type Error: locale should be a string.');
  if (!(servicesData instanceof Object && !(servicesData instanceof Array)) && typeof servicesData !== 'undefined') throw new Error('Type Error: servicesData should be an object.');
  if (!(_priorityMap instanceof Array) && typeof _priorityMap !== 'undefined') throw new Error('Type Error: priorityMap should be an array.');
  var featured = [];
  var priorityMap = _priorityMap || PRIORITY_MAP;
  var allServices = Object.entries(servicesData || SHARE_DATA);
  var servicesByLocale = priorityMap.find(function (item) {
    return item.locales.indexOf(locale) >= 0;
  });
  var featuredServices = (servicesByLocale === null || servicesByLocale === void 0 ? void 0 : servicesByLocale.order) || [];

  var _loop = function _loop(i) {
    var featuredService = allServices.find(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 1),
          service = _ref4[0];

      return service === featuredServices[i];
    });

    if (featuredService) {
      var _featuredService = _slicedToArray(featuredService, 2),
          label = _featuredService[0],
          link = _featuredService[1];

      featured.push({
        label: label,
        link: link
      });
    }
  };

  for (var i = 0; i < featuredServices.length; i++) {
    _loop(i);
  }

  return {
    featured: featured,
    other: allServices.map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          label = _ref2[0],
          link = _ref2[1];

      return {
        label: label,
        link: link
      };
    }).filter(function (service) {
      return !featuredServices.includes(service.label);
    })
  };
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var bind = createCommonjsModule(function (module) {
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

/* global define */
(function () {

  var hasOwn = {}.hasOwnProperty;

  function classNames() {
    var classes = [];

    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];
      if (!arg) continue;
      var argType = typeof arg;

      if (argType === 'string' || argType === 'number') {
        classes.push(this && this[arg] || arg);
      } else if (Array.isArray(arg)) {
        classes.push(classNames.apply(this, arg));
      } else if (argType === 'object') {
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(this && this[key] || key);
          }
        }
      }
    }

    return classes.join(' ');
  }

  if ( module.exports) {
    classNames.default = classNames;
    module.exports = classNames;
  } else {
    window.classNames = classNames;
  }
})();
});

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') {
    return;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "";
var styles = {};
styleInject(css_248z);

var ShareContext = /*#__PURE__*/React.createContext({});
var useShareContext = function useShareContext() {
  return React.useContext(ShareContext) || {};
};

var cn = bind.bind(styles);

var ShareButton = function ShareButton(_ref) {
  var className = _ref.className,
      type = _ref.type,
      url = _ref.url,
      shareLink = _ref.shareLink,
      onClick = _ref.onClick,
      children = _ref.children;

  var _useShareContext = useShareContext(),
      urlFromContext = _useShareContext.url,
      onButtonClick = _useShareContext.onButtonClick,
      buttonClassName = _useShareContext.buttonClassName;

  var classes = cn('button', className, buttonClassName);

  if (!url && !urlFromContext) {
    throw new Error('Please provide URL for sharing!');
  }

  if (!SHARE_DATA[type] && !shareLink) {
    throw new Error('Please provide correct service name from supported services list or use custom share link!');
  }

  var shareUrl = SHARE_DATA[type] || shareLink;

  var handleClick = function handleClick() {
    onButtonClick && onButtonClick();
    typeof onClick === 'function' && onClick();
  };

  return /*#__PURE__*/React__default['default'].createElement("a", {
    href: shareUrl,
    target: "_blank",
    rel: "noreferrer",
    className: classes,
    onClick: handleClick
  }, children);
};

ShareButton.propTypes = {
  className: PropTypes__default['default'].string,
  type: PropTypes__default['default'].oneOf(Object.keys(SHARE_DATA)),
  url: PropTypes__default['default'].string,
  shareLink: PropTypes__default['default'].string,
  onClick: PropTypes__default['default'].func,
  children: PropTypes__default['default'].node.isRequired
};
ShareButton.defaultProps = {
  className: null,
  type: null,
  url: null,
  shareLink: null,
  onClick: null
};

var Share = function Share(_ref) {
  var url = _ref.url,
      prioritize = _ref.prioritize,
      services = _ref.services,
      priorityMap = _ref.priorityMap,
      onButtonClick = _ref.onButtonClick;

  var _useState = React.useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      collapsed = _useState2[0],
      setCollapsed = _useState2[1];

  var locale = React.useRef(navigator.language.split('-')[0]);

  var _useServicesByLocale = useServicesByLocale(locale, services, prioritize ? priorityMap : []),
      featured = _useServicesByLocale.featured,
      others = _useServicesByLocale.others;

  var renderServices = function renderServices(items) {
    return items.map(function (service) {
      return /*#__PURE__*/React__default['default'].createElement(ShareButton, {
        key: service.label,
        type: service.label,
        url: service.link
      }, service.label);
    });
  };

  var handleMoreClick = function handleMoreClick() {
    return setCollapsed(!collapsed);
  };

  return /*#__PURE__*/React__default['default'].createElement(ShareProvider, {
    url: url,
    onButtonClick: onButtonClick
  }, /*#__PURE__*/React__default['default'].createElement("div", {
    className: styles.wrapper
  }, prioritize && /*#__PURE__*/React__default['default'].createElement("div", {
    className: styles.featured
  }, renderServices(featured)), /*#__PURE__*/React__default['default'].createElement("div", {
    className: styles.others
  }, renderServices(others)), prioritize && /*#__PURE__*/React__default['default'].createElement("button", {
    type: "button",
    className: styles.buttonMore,
    onClick: handleMoreClick
  }, collapsed ? 'show more' : 'hide')));
};

Share.propTypes = {
  url: PropTypes__default['default'].string,
  services: PropTypes__default['default'].objectOf(PropTypes__default['default'].string),
  prioritize: PropTypes__default['default'].bool,
  priorityMap: PropTypes__default['default'].objectOf(PropTypes__default['default'].shape({
    locales: PropTypes__default['default'].arrayOf(PropTypes__default['default'].string).isRequired,
    order: PropTypes__default['default'].arrayOf(PropTypes__default['default'].string).isRequired
  })),
  onButtonClick: PropTypes__default['default'].func
};
Share.defaultProps = {
  url: null,
  services: SHARE_DATA,
  prioritize: true,
  priorityMap: PRIORITY_MAP,
  onButtonClick: null
};

var cn$1 = bind.bind(styles);

var CopyButton = function CopyButton(_ref) {
  var className = _ref.className,
      text = _ref.text,
      onClick = _ref.onClick,
      children = _ref.children;

  var _useShareContext = useShareContext(),
      urlFromContext = _useShareContext.url,
      onButtonClick = _useShareContext.onButtonClick,
      buttonClassName = _useShareContext.buttonClassName;

  var classes = cn$1('button', className, buttonClassName);

  if (!text && !urlFromContext) {
    throw new Error('Please provide text for copying!');
  }

  var handleClick = function handleClick() {
    copyToClipboard(text || urlFromContext).then(function () {
      onButtonClick && onButtonClick();
      typeof onClick === 'function' && onClick();
    });
  };

  return /*#__PURE__*/React__default['default'].createElement("button", {
    className: classes,
    type: "button",
    onClick: handleClick
  }, children);
};

CopyButton.propTypes = {
  className: PropTypes__default['default'].string,
  text: PropTypes__default['default'].string,
  onClick: PropTypes__default['default'].func,
  children: PropTypes__default['default'].node.isRequired
};
CopyButton.defaultProps = {
  className: null,
  text: null,
  onClick: null
};

exports.CopyButton = CopyButton;
exports.PRIORITY_MAP = PRIORITY_MAP;
exports.SHARE_DATA = SHARE_DATA;
exports.ShareButton = ShareButton;
exports.ShareProvider = ShareProvider;
exports.copyToClipboard = copyToClipboard;
exports.default = Share;
exports.useServicesByLocale = useServicesByLocale;
