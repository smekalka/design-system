import React, { useContext, createContext, useState, useRef } from 'react';
import PropTypes from 'prop-types';

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

var ShareContext = /*#__PURE__*/createContext({});
var useShareContext = function useShareContext() {
  return useContext(ShareContext) || {};
};

var ShareProvider = function ShareProvider(_ref) {
  var url = _ref.url,
      buttonClassName = _ref.buttonClassName,
      onButtonClick = _ref.onButtonClick,
      children = _ref.children;
  var contextValue = {
    url: url,
    buttonClassName: buttonClassName,
    onButtonClick: onButtonClick
  };
  return /*#__PURE__*/React.createElement(ShareContext.Provider, {
    value: contextValue
  }, children);
};

ShareProvider.propTypes = {
  buttonClassName: PropTypes.string,
  url: PropTypes.string,
  onButtonClick: PropTypes.func,
  children: PropTypes.node.isRequired
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
  order: ['qzone', 'facebook', 'line']
}, {
  locales: ['ja', 'th'],
  order: ['facebook', 'line', 'whatsapp']
}];
var SHARE_DATA = {
  facebook: 'https://www.facebook.com/dialog/share?app_id=179569853382104&display=popup&href=',
  vk: 'https://vk.com/share.php?url=',
  whatsapp: 'https://wa.me/?text=',
  twitter: 'https://twitter.com/intent/tweet?url=',
  viber: 'viber://forward?text=',
  reddit: 'https://www.reddit.com/submit?url=',
  qzone: 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=',
  telegram: 'https://telegram.me/share/url?url=',
  linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=',
  tumblr: 'http://www.tumblr.com/share?v=3&u=',
  line: 'https://social-plugins.line.me/lineit/share?url='
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

var css_248z = ".styles_wrapper__214dt {\n  display: flex;\n  flex-direction: column;\n  align-items: center; }\n\n.styles_services__263Nl {\n  margin-bottom: 1em; }\n\n.styles_featured__hfLyP { }\n\n.styles_button__1v679 {\n  border: 0;\n  background: none;\n  color: inherit;\n  font-size: 1em;\n  font-family: inherit;\n  text-decoration: none;\n  text-transform: lowercase;\n  cursor: pointer;\n  outline: none; }\n\n.styles_show-more-button__1woSk {\n  text-decoration: underline; }\n\n.styles_share-button__3uGCK {\n  display: inline-flex;\n  flex-direction: column;\n  align-items: center; }\n  .styles_share-button__3uGCK + .styles_share-button__3uGCK {\n    margin-left: 1em; }\n  .styles_share-button__3uGCK:hover, .styles_share-button__3uGCK:focus {\n    text-decoration: underline; }\n\n.styles_icon__3K4sp {\n  font-size: 3em;\n  color: inherit;\n  fill: currentColor; }\n";
var styles = {"wrapper":"styles_wrapper__214dt","services":"styles_services__263Nl","featured":"styles_featured__hfLyP styles_services__263Nl","button":"styles_button__1v679","show-more-button":"styles_show-more-button__1woSk styles_button__1v679","share-button":"styles_share-button__3uGCK styles_button__1v679","icon":"styles_icon__3K4sp"};
styleInject(css_248z);

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

  var classes = cn('share-button', className, buttonClassName);

  if (!url && !urlFromContext) {
    throw new Error('Please provide URL for sharing!');
  }

  if (!SHARE_DATA[type] && !shareLink) {
    throw new Error('Please provide correct service name from supported services list or use custom share link!');
  }

  var shareUrl;

  if (url) {
    shareUrl = SHARE_DATA[type] + url;
  } else if (urlFromContext) {
    shareUrl = SHARE_DATA[type] + urlFromContext;
  } else {
    shareUrl = shareLink;
  }

  var handleClick = function handleClick() {
    onButtonClick && onButtonClick();
    typeof onClick === 'function' && onClick();
  };

  return /*#__PURE__*/React.createElement("a", {
    href: shareUrl,
    target: "_blank",
    rel: "noreferrer",
    className: classes,
    onClick: handleClick
  }, children);
};

ShareButton.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(Object.keys(SHARE_DATA)),
  url: PropTypes.string,
  shareLink: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
};
ShareButton.defaultProps = {
  className: null,
  type: null,
  url: null,
  shareLink: null,
  onClick: null
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

  var classes = cn$1('share-button', className, buttonClassName);

  if (!text && !urlFromContext) {
    throw new Error('Please provide text for copying!');
  }

  var handleClick = function handleClick() {
    copyToClipboard(text || urlFromContext).then(function () {
      onButtonClick && onButtonClick();
      typeof onClick === 'function' && onClick();
    });
  };

  return /*#__PURE__*/React.createElement("button", {
    className: classes,
    type: "button",
    onClick: handleClick
  }, children);
};

CopyButton.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
};
CopyButton.defaultProps = {
  className: null,
  text: null,
  onClick: null
};

var ShareIcon = function ShareIcon(_ref) {
  var className = _ref.className,
      icon = _ref.icon;
  var path;

  switch (icon) {
    case 'facebook':
      path = /*#__PURE__*/React.createElement("path", {
        d: "M17.4864 31V20.7129H14V16.625H17.4864V13.4041C17.4864 9.90469 19.65 8 22.8091 8C24.3227 8 25.6227 8.1123 26 8.16172V11.8184H23.8091C22.0909 11.8184 21.7591 12.627 21.7591 13.8084V16.625H25.6364L25.1045 20.7129H21.7591V31"
      });
      break;

    case 'twitter':
      path = /*#__PURE__*/React.createElement("path", {
        d: "M28.7386 16.2367C28.7526 16.4226 28.7526 16.6086 28.7526 16.7945C28.7526 22.4656 24.2158 29 15.9239 29C13.3693 29 10.9962 28.2961 9 27.0742C9.36296 27.1141 9.71191 27.1273 10.0888 27.1273C12.1967 27.1273 14.1371 26.45 15.6866 25.2945C13.7043 25.2547 12.0431 24.0195 11.4708 22.3195C11.75 22.3593 12.0292 22.3859 12.3224 22.3859C12.7272 22.3859 13.132 22.3328 13.5089 22.2399C11.4429 21.8414 9.89337 20.1148 9.89337 18.0297V17.9766C10.4936 18.2953 11.1916 18.4945 11.9314 18.5211C10.717 17.7507 9.9213 16.4359 9.9213 14.9484C9.9213 14.1515 10.1446 13.4211 10.5355 12.7836C12.7551 15.3867 16.0914 17.0867 19.8325 17.2726C19.7627 16.9539 19.7208 16.6219 19.7208 16.2898C19.7208 13.9258 21.731 12 24.2297 12C25.5279 12 26.7005 12.518 27.5241 13.3547C28.5431 13.1688 29.5203 12.8101 30.3858 12.3188C30.0507 13.3149 29.3388 14.1516 28.4036 14.6828C29.3109 14.5899 30.1904 14.3508 31 14.0188C30.3859 14.8687 29.6181 15.6257 28.7386 16.2367Z"
      });
      break;

    case 'whatsapp':
      path = /*#__PURE__*/React.createElement("path", {
        d: "M27.0045 12.9062C25.1339 11.0312 22.6429 10 19.9955 10C14.5312 10 10.0848 14.4464 10.0848 19.9107C10.0848 21.6562 10.5402 23.3616 11.4062 24.8661L10 30L15.2545 28.6205C16.7009 29.4107 18.3304 29.8259 19.9911 29.8259H19.9955C25.4554 29.8259 30 25.3795 30 19.9152C30 17.2679 28.875 14.7812 27.0045 12.9062ZM19.9955 28.1563C18.5134 28.1563 17.0625 27.7589 15.7991 27.0089L15.5 26.8304L12.3839 27.6473L13.2143 24.6071L13.0179 24.2946C12.192 22.9821 11.7589 21.4688 11.7589 19.9107C11.7589 15.3705 15.4554 11.6741 20 11.6741C22.2009 11.6741 24.2679 12.5312 25.8214 14.0893C27.375 15.6473 28.3304 17.7143 28.3259 19.9152C28.3259 24.4598 24.5357 28.1563 19.9955 28.1563ZM24.5134 21.9866C24.2679 21.8616 23.0491 21.2634 22.8214 21.183C22.5938 21.0982 22.4286 21.058 22.2634 21.308C22.0982 21.558 21.625 22.1116 21.4777 22.2813C21.3348 22.4464 21.1875 22.4688 20.942 22.3438C19.4866 21.6161 18.5312 21.0446 17.5714 19.3973C17.317 18.9598 17.8259 18.9911 18.2991 18.0446C18.3795 17.8795 18.3393 17.7366 18.2768 17.6116C18.2143 17.4866 17.7188 16.2679 17.5134 15.7723C17.3125 15.2902 17.1071 15.3571 16.9554 15.3482C16.8125 15.3393 16.6473 15.3393 16.4821 15.3393C16.317 15.3393 16.0491 15.4018 15.8214 15.6473C15.5938 15.8973 14.9554 16.4955 14.9554 17.7143C14.9554 18.933 15.8438 20.1116 15.9643 20.2768C16.0893 20.442 17.7098 22.942 20.1964 24.0179C21.7679 24.6964 22.3839 24.7545 23.1696 24.6384C23.6473 24.567 24.6339 24.0402 24.8393 23.4598C25.0446 22.8795 25.0446 22.3839 24.9821 22.2813C24.9241 22.1696 24.7589 22.1071 24.5134 21.9866Z"
      });
      break;

    case 'reddit':
      path = /*#__PURE__*/React.createElement("path", {
        d: "M27.7698 17.659C27.1375 17.659 26.5811 17.9357 26.1722 18.3687C24.6673 17.2662 22.6397 16.5566 20.3929 16.4807L21.5605 10.9105L25.2785 11.7942C25.2785 12.7583 26.0204 13.5439 26.9309 13.5439C27.8583 13.5439 28.6044 12.736 28.6044 11.7719C28.6044 10.8079 27.8625 10 26.9309 10C26.2818 10 25.7211 10.4151 25.4429 10.9819L21.3371 10.0179C21.1306 9.95983 20.9282 10.116 20.8734 10.3347L19.592 16.4762C17.362 16.5744 15.3555 17.2841 13.8464 18.3865C13.4375 17.9357 12.86 17.659 12.2277 17.659C9.88396 17.659 9.11676 20.9886 11.2624 22.1268C11.1865 22.4794 11.1528 22.8543 11.1528 23.2292C11.1528 26.9694 15.1321 30 20.0177 30C24.9244 30 28.9037 26.9694 28.9037 23.2292C28.9037 22.8543 28.8658 22.4615 28.773 22.1089C30.8765 20.9663 30.1009 17.659 27.7698 17.659ZM14.6642 22.3633C14.6642 21.3814 15.4061 20.5914 16.3377 20.5914C17.2482 20.5914 17.9901 21.3769 17.9901 22.3633C17.9901 23.3274 17.2482 24.1129 16.3377 24.1129C15.4103 24.1174 14.6642 23.3274 14.6642 22.3633ZM23.6977 26.5365C22.1633 28.1611 17.8342 28.1611 16.2998 26.5365C16.1311 26.3803 16.1311 26.1035 16.2998 25.925C16.4473 25.7688 16.7086 25.7688 16.8562 25.925C18.0281 27.1971 21.9146 27.2194 23.1371 25.925C23.2846 25.7688 23.546 25.7688 23.6935 25.925C23.8664 26.1035 23.8664 26.3803 23.6977 26.5365ZM23.664 24.1174C22.7535 24.1174 22.0116 23.3318 22.0116 22.3678C22.0116 21.3859 22.7535 20.5958 23.664 20.5958C24.5914 20.5958 25.3375 21.3814 25.3375 22.3678C25.3333 23.3274 24.5914 24.1174 23.664 24.1174Z"
      });
      break;

    case 'vk':
      path = /*#__PURE__*/React.createElement("path", {
        d: "M32.4302 13.9494C32.602 13.4025 32.4302 13 31.6041 13H28.8706C28.1744 13 27.8542 13.3456 27.6825 13.7306C27.6825 13.7306 26.2902 16.9287 24.3224 19.0025C23.6866 19.6019 23.3942 19.7944 23.0461 19.7944C22.8744 19.7944 22.6099 19.6019 22.6099 19.055V13.9494C22.6099 13.2931 22.415 13 21.8395 13H17.5419C17.1056 13 16.8457 13.3063 16.8457 13.5906C16.8457 14.2119 17.8296 14.3562 17.9317 16.1063V19.9037C17.9317 20.735 17.7739 20.8881 17.4259 20.8881C16.4977 20.8881 14.2421 17.6769 12.9055 14.0019C12.6364 13.2888 12.3718 13 11.671 13H8.93748C8.15779 13 8 13.3456 8 13.7306C8 14.4131 8.9282 17.8038 12.3208 22.2838C14.5809 25.3419 17.7647 27 20.6607 27C22.401 27 22.6145 26.6325 22.6145 25.9981C22.6145 23.0756 22.4567 22.8 23.3292 22.8C23.733 22.8 24.4291 22.9925 26.0535 24.4669C27.9099 26.2169 28.2162 27 29.2558 27H31.9893C32.769 27 33.1635 26.6325 32.9361 25.9062C32.4163 24.3794 28.9031 21.2381 28.7453 21.0281C28.3415 20.5381 28.4575 20.3194 28.7453 19.8819C28.7499 19.8775 32.0868 15.45 32.4302 13.9494Z"
      });
      break;

    case 'qzone':
      path = /*#__PURE__*/React.createElement("path", {
        d: "M30.9884 17.5616C30.9595 17.4733 30.8736 17.3673 30.6838 17.3366C30.494 17.3026 23.9443 16.1104 23.9443 16.1104C23.9443 16.1104 23.8473 16.0902 23.7614 16.049C23.6789 16.0078 23.6466 15.9025 23.6466 15.9025C23.6466 15.9025 20.4095 10.3714 20.3194 10.208C20.23 10.0445 20.0973 10 20.0004 10C19.9034 10 19.7714 10.0445 19.6814 10.208C19.592 10.3714 16.3542 15.9025 16.3542 15.9025C16.3542 15.9025 16.3219 16.0078 16.2394 16.049C16.1535 16.0902 16.0565 16.1104 16.0565 16.1104C16.0565 16.1104 9.50675 17.3026 9.31698 17.3333C9.12721 17.3673 9.04127 17.4733 9.01239 17.5583C8.97664 17.7015 9.01927 17.848 9.12721 17.95L14.044 22.7388C14.044 22.7388 14.1086 22.8068 14.1513 22.8886C14.1657 22.9769 14.1547 23.0723 14.1547 23.0723C14.1547 23.0723 13.0663 29.3868 13.0374 29.5673C13.0085 29.7478 13.1055 29.8877 13.1845 29.942C13.2595 29.9963 13.3956 30.0342 13.5675 29.9525C13.7428 29.8707 19.8127 27.1085 19.8127 27.1085C19.8127 27.1085 19.9021 27.0712 19.999 27.0575C20.0918 27.0405 20.1819 27.1085 20.1819 27.1085C20.1819 27.1085 26.2552 29.8707 26.4271 29.9525C26.599 30.0342 26.7385 29.9969 26.8142 29.942C26.929 29.8498 26.9826 29.7072 26.9613 29.5673C26.94 29.4444 26.1053 24.6183 26.1053 24.6183C26.9111 24.1448 27.4123 23.7125 27.8029 23.0926C25.4253 23.9375 22.2955 24.5914 19.1726 24.7209C18.331 24.7549 16.9627 24.8059 15.9857 24.7072C15.3662 24.6457 14.9151 24.581 14.8471 24.3259C14.8003 24.1389 14.8973 23.9238 15.3483 23.6007C16.2222 22.9742 17.0961 22.3471 17.97 21.7239C19.1485 20.879 21.2325 19.5679 21.2325 19.3396C21.2325 19.0944 19.2668 18.6621 17.5334 18.6621C15.7499 18.6621 15.4459 18.7746 14.955 18.8086C14.5074 18.8361 14.2496 18.8119 14.2173 18.6857C14.1636 18.4712 14.3857 18.3482 14.7577 18.192C15.4061 17.916 16.4622 17.674 16.577 17.6472C16.7558 17.5995 19.4022 16.9423 21.7269 17.1803C22.9335 17.2993 24.7027 17.763 24.7027 18.2907C24.7027 18.5902 23.1233 19.5953 21.7447 20.556C20.6921 21.2916 19.7109 21.9181 19.7109 22.0273C19.7109 22.3268 22.9521 23.1103 25.8454 22.9095L25.8488 22.8892C25.8921 22.8108 25.9561 22.7395 25.9561 22.7395L30.8729 17.9539C30.9801 17.8519 31.0234 17.7021 30.9877 17.5622L30.9884 17.5616Z"
      });
      break;

    case 'telegram':
      path = /*#__PURE__*/React.createElement("path", {
        d: "M30.9402 12.6387L27.7711 27.9134C27.532 28.9915 26.9086 29.2598 26.0225 28.7519L21.194 25.1153L18.8641 27.4056C18.6063 27.6691 18.3906 27.8895 17.8937 27.8895L18.2406 22.8634L27.1898 14.5983C27.5789 14.2438 27.1054 14.0473 26.5851 14.4019L15.5216 21.5218L10.7587 19.9982C9.72265 19.6676 9.7039 18.9393 10.9743 18.4314L29.6041 11.0959C30.4667 10.7653 31.2214 11.2923 30.9402 12.6387Z"
      });
      break;

    case 'viber':
      path = /*#__PURE__*/React.createElement("path", {
        d: "M27.6318 10.2396C27.0826 9.71411 24.8596 8.03873 19.9033 8.01627C19.9033 8.01627 14.0605 7.65245 11.2148 10.3654C9.63187 12.0093 9.07397 14.4213 9.01342 17.4083C8.95288 20.3952 8.87935 25.9917 14.0735 27.5099H14.0778L14.0735 29.8276C14.0735 29.8276 14.0389 30.7663 14.6357 30.955C15.3536 31.1886 15.7775 30.4744 16.4651 29.7063C16.8414 29.2841 17.3603 28.6643 17.7539 28.1926C21.3089 28.5026 24.0379 27.7929 24.3493 27.6896C25.0672 27.447 29.1282 26.908 29.7856 21.3115C30.4689 15.5352 29.4569 11.8881 27.6318 10.2396ZM28.233 20.8893C27.6751 25.5606 24.3839 25.857 23.7784 26.0591C23.5189 26.1445 21.1186 26.7643 18.1042 26.5622C18.1042 26.5622 15.8553 29.3784 15.1547 30.1106C14.9255 30.3486 14.6746 30.3262 14.6789 29.8545C14.6789 29.5446 14.6962 26.0052 14.6962 26.0052C14.6919 26.0052 14.6919 26.0052 14.6962 26.0052C10.2936 24.7386 10.5531 19.973 10.6006 17.4801C10.6482 14.9873 11.1023 12.9436 12.443 11.5691C14.8519 9.30088 19.8125 9.63775 19.8125 9.63775C24.0033 9.65572 26.01 10.9673 26.4771 11.4074C28.021 12.7819 28.8082 16.0698 28.233 20.8893ZM22.2215 17.26C22.2388 17.6463 21.6808 17.6733 21.6635 17.287C21.616 16.2988 21.1705 15.8182 20.2537 15.7643C19.8817 15.7419 19.9163 15.1624 20.2839 15.1849C21.4906 15.2523 22.1609 15.9709 22.2215 17.26ZM23.0994 17.7676C23.1426 15.8631 21.9966 14.3719 19.8212 14.2057C19.4536 14.1788 19.4925 13.5994 19.8601 13.6263C22.3685 13.815 23.7049 15.6071 23.6573 17.7811C23.653 18.1673 23.0907 18.1494 23.0994 17.7676ZM25.1321 18.3695C25.1364 18.7557 24.5742 18.7602 24.5742 18.374C24.5482 14.7133 22.1998 12.719 19.3498 12.6965C18.9822 12.6921 18.9822 12.1171 19.3498 12.1171C22.5372 12.1396 25.1018 14.4258 25.1321 18.3695ZM24.6434 22.7757V22.7847C24.1763 23.6381 23.3027 24.5814 22.4031 24.2804L22.3944 24.267C21.4819 24.002 19.3325 22.8521 17.9745 21.7292C17.2738 21.1543 16.6338 20.476 16.1407 19.8247C15.6953 19.2453 15.2455 18.5581 14.8087 17.7317C13.8875 16.0024 13.6842 15.2298 13.6842 15.2298C13.3945 14.2956 14.2984 13.3883 15.1244 12.9032H15.1331C15.5309 12.6876 15.9115 12.7594 16.1667 13.0783C16.1667 13.0783 16.703 13.7431 16.9322 14.071C17.1484 14.3764 17.4382 14.866 17.5896 15.14C17.8534 15.6296 17.689 16.1281 17.4295 16.3348L16.9106 16.766C16.6467 16.986 16.6813 17.3948 16.6813 17.3948C16.6813 17.3948 17.4512 20.4176 20.3272 21.1812C20.3272 21.1812 20.7207 21.2172 20.9327 20.9432L21.3478 20.4042C21.5468 20.1347 22.0268 19.964 22.4982 20.238C23.134 20.6108 23.9427 21.1902 24.479 21.7157C24.7818 21.9717 24.8509 22.3625 24.6434 22.7757Z"
      });
      break;

    case 'linkedin':
      path = /*#__PURE__*/React.createElement("path", {
        d: "M15.029 29H11.2973V16.9826H15.029V29ZM13.1611 15.3433C11.9681 15.3433 11 14.3549 11 13.1616C11 11.9683 11.9681 11 13.1611 11C14.3542 11 15.3222 11.9683 15.3222 13.1616C15.3222 14.3549 14.3542 15.3433 13.1611 15.3433ZM28.996 29H25.2723V23.15C25.2723 21.7558 25.2441 19.9679 23.3321 19.9679C21.3919 19.9679 21.0946 21.4826 21.0946 23.0496V29H17.3669V16.9826H20.946V18.6219H20.9982C21.4963 17.6777 22.7135 16.6812 24.5291 16.6812C28.3051 16.6812 29 19.1683 29 22.3987V29H28.996Z"
      });
      break;

    case 'tumblr':
      path = /*#__PURE__*/React.createElement("path", {
        d: "M25.91 28.7617C25.3734 29.3281 23.9375 30 22.0675 30C17.302 30 16.2684 26.5312 16.2684 24.5078V18.8828H14.3945C14.1775 18.8828 14 18.707 14 18.4922V15.8359C14 15.5547 14.1775 15.3047 14.4458 15.2109C16.8917 14.3594 17.661 12.2422 17.7714 10.6367C17.803 10.207 18.0278 10 18.4066 10H21.2036C21.4205 10 21.5981 10.1758 21.5981 10.3906V14.8906H24.8724C25.0894 14.8906 25.2669 15.0625 25.2669 15.2773V18.4688C25.2669 18.6836 25.0894 18.8594 24.8724 18.8594H21.5823V24.0625C21.5823 25.3984 22.5173 26.1562 24.2649 25.4609C24.4542 25.3867 24.6199 25.3359 24.7659 25.375C24.904 25.4102 24.9947 25.5078 25.0578 25.6836L25.9257 28.1953C25.9967 28.3906 26.0559 28.6094 25.91 28.7617Z"
      });
      break;

    case 'line':
      path = /*#__PURE__*/React.createElement("path", {
        d: "M22.1473 17.0719V20.4047C22.1473 20.4891 22.0848 20.5547 22.0045 20.5547H21.4955C21.4464 20.5547 21.4018 20.5266 21.3795 20.4937L19.9241 18.4313V20.4094C19.9241 20.4937 19.8616 20.5594 19.7812 20.5594H19.2723C19.192 20.5594 19.1295 20.4937 19.1295 20.4094V17.0766C19.1295 16.9922 19.192 16.9266 19.2723 16.9266H19.7768C19.8214 16.9266 19.8705 16.95 19.8929 16.9922L21.3482 19.0547V17.0766C21.3482 16.9922 21.4107 16.9266 21.4911 16.9266H22C22.0804 16.9219 22.1473 16.9922 22.1473 17.0719ZM18.4866 16.9219H17.9777C17.8973 16.9219 17.8348 16.9875 17.8348 17.0719V20.4047C17.8348 20.4891 17.8973 20.5547 17.9777 20.5547H18.4866C18.567 20.5547 18.6295 20.4891 18.6295 20.4047V17.0719C18.6295 16.9922 18.567 16.9219 18.4866 16.9219ZM17.2589 19.7156H15.8705V17.0719C15.8705 16.9875 15.808 16.9219 15.7277 16.9219H15.2188C15.1384 16.9219 15.0759 16.9875 15.0759 17.0719V20.4047C15.0759 20.4469 15.0893 20.4797 15.1161 20.5078C15.1429 20.5312 15.1741 20.55 15.2143 20.55H17.2545C17.3348 20.55 17.3973 20.4844 17.3973 20.4V19.8656C17.3973 19.7859 17.3348 19.7156 17.2589 19.7156ZM24.8259 16.9219H22.7857C22.7098 16.9219 22.6429 16.9875 22.6429 17.0719V20.4047C22.6429 20.4844 22.7054 20.5547 22.7857 20.5547H24.8259C24.9062 20.5547 24.9687 20.4891 24.9687 20.4047V19.8703C24.9687 19.7859 24.9062 19.7203 24.8259 19.7203H23.4375V19.1578H24.8259C24.9062 19.1578 24.9687 19.0922 24.9687 19.0078V18.4688C24.9687 18.3844 24.9062 18.3188 24.8259 18.3188H23.4375V17.7563H24.8259C24.9062 17.7563 24.9687 17.6906 24.9687 17.6063V17.0719C24.9643 16.9922 24.9018 16.9219 24.8259 16.9219ZM30 12.8297V26.2031C29.9955 28.3031 28.3571 30.0047 26.3527 30H13.6161C11.6161 29.9953 9.99554 28.2703 10 26.1703V12.7969C10.0045 10.6969 11.6473 8.99532 13.6473 9.00001H26.3839C28.3839 9.0047 30.0045 10.725 30 12.8297ZM27.25 18.5766C27.25 15.1547 23.9821 12.3703 19.9688 12.3703C15.9554 12.3703 12.6875 15.1547 12.6875 18.5766C12.6875 21.6422 15.2768 24.2109 18.7768 24.6984C19.6295 24.8906 19.5312 25.2187 19.3393 26.4234C19.308 26.6156 19.192 27.1781 19.9688 26.8359C20.7455 26.4937 24.1607 24.2437 25.692 22.3969C26.7455 21.1781 27.25 19.9453 27.25 18.5766Z"
      });
      break;

    default:
      path = /*#__PURE__*/React.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M24.125 9.91663H13.125C12.1166 9.91663 11.2916 10.7416 11.2916 11.75V24.5833H13.125V11.75H24.125V9.91663ZM26.8749 13.5833H16.7916C15.7833 13.5833 14.9583 14.4083 14.9583 15.4166V28.25C14.9583 29.2583 15.7833 30.0833 16.7916 30.0833H26.8749C27.8833 30.0833 28.7083 29.2583 28.7083 28.25V15.4166C28.7083 14.4083 27.8833 13.5833 26.8749 13.5833ZM16.7916 28.25H26.875V15.4166H16.7916V28.25Z"
      });
  }

  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    width: "40",
    height: "40",
    viewBox: "0 0 40 40",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, path);
};

ShareIcon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired
};
ShareIcon.defaultProps = {
  className: ''
};

var cn$2 = bind.bind(styles);

var Share = function Share(_ref) {
  var classNameMap = _ref.classNameMap,
      url = _ref.url,
      prioritize = _ref.prioritize,
      services = _ref.services,
      priorityMap = _ref.priorityMap,
      onButtonClick = _ref.onButtonClick;
  var wrapperClasses = cn$2('wrapper', classNameMap.wrapper);
  var moreClasses = cn$2('show-more-button', classNameMap.showMoreButton);
  var featuredClasses = cn$2('featured', classNameMap.featured);
  var servicesClasses = cn$2('services', classNameMap.services);
  var iconClasses = cn$2('icon', classNameMap.shareButtonIcon);
  var labelClasses = cn$2('label', classNameMap.shareButtonLabel);

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      collapsed = _useState2[0],
      setCollapsed = _useState2[1];

  var locale = useRef(navigator.language.split('-')[0]);

  var _useServicesByLocale = useServicesByLocale(locale.current, services, prioritize ? priorityMap : []),
      featured = _useServicesByLocale.featured,
      other = _useServicesByLocale.other;

  var renderServices = function renderServices(items) {
    return items.map(function (service) {
      return /*#__PURE__*/React.createElement(ShareButton, {
        key: service.label,
        type: service.label
      }, /*#__PURE__*/React.createElement(ShareIcon, {
        className: iconClasses,
        icon: service.label
      }), /*#__PURE__*/React.createElement("span", {
        className: labelClasses
      }, service.label));
    });
  };

  var copyButton = /*#__PURE__*/React.createElement(CopyButton, null, /*#__PURE__*/React.createElement(ShareIcon, {
    className: iconClasses,
    icon: "copy"
  }), /*#__PURE__*/React.createElement("span", {
    className: labelClasses
  }, "Copy Link"));

  var handleMoreClick = function handleMoreClick() {
    return setCollapsed(!collapsed);
  };

  return /*#__PURE__*/React.createElement(ShareProvider, {
    url: url,
    buttonClassName: classNameMap.shareButton,
    onButtonClick: onButtonClick
  }, /*#__PURE__*/React.createElement("div", {
    className: wrapperClasses
  }, prioritize && /*#__PURE__*/React.createElement("div", {
    className: featuredClasses
  }, copyButton, renderServices(featured)), !collapsed && /*#__PURE__*/React.createElement("div", {
    className: servicesClasses
  }, !prioritize && copyButton, renderServices(other)), prioritize && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: moreClasses,
    onClick: handleMoreClick
  }, collapsed ? 'show more' : 'hide')));
};

Share.propTypes = {
  url: PropTypes.string.isRequired,
  services: PropTypes.objectOf(PropTypes.string),
  prioritize: PropTypes.bool,
  priorityMap: PropTypes.arrayOf(PropTypes.shape({
    locales: PropTypes.arrayOf(PropTypes.string).isRequired,
    order: PropTypes.arrayOf(PropTypes.string).isRequired
  })),
  onButtonClick: PropTypes.func,
  classNameMap: PropTypes.shape({
    wrapper: PropTypes.string,
    featured: PropTypes.string,
    services: PropTypes.string,
    showMoreButton: PropTypes.string,
    shareButton: PropTypes.string,
    shareButtonIcon: PropTypes.string,
    shareButtonLabel: PropTypes.string
  })
};
Share.defaultProps = {
  services: SHARE_DATA,
  prioritize: true,
  priorityMap: PRIORITY_MAP,
  onButtonClick: null,
  classNameMap: {}
};

export default Share;
export { CopyButton, PRIORITY_MAP, SHARE_DATA, ShareButton, ShareProvider, copyToClipboard, useServicesByLocale };
