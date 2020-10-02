function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/* global gapi */
var initApi = function initApi() {
  return new Promise(function (resolve, reject) {
    if (document.querySelector('[data-gapi]')) {
      resolve();
    }

    var tag = document.createElement('script');
    tag.src = 'https://apis.google.com/js/api.js';
    tag.dataset.gapi = true;
    tag.onload = resolve;
    tag.onerror = reject;
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  });
};
var loadClient = function loadClient(apiKey) {
  return new Promise(function (resolve, reject) {
    gapi.load('client', {
      callback: function callback() {
        gapi.client.setApiKey(apiKey);
        gapi.client.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest').then(resolve)["catch"](function (err) {
          console.error('Error loading GAPI client for API: ', err);
          reject();
        });
      }
    });
  });
};
var loadPlaylist = function loadPlaylist(playlistId) {
  return gapi.client.youtube.playlistItems.list({
    'part': ['snippet'],
    'maxResults': 50,
    'playlistId': playlistId
  });
};
var loadVideo = function loadVideo() {
  for (var _len = arguments.length, videoIds = new Array(_len), _key = 0; _key < _len; _key++) {
    videoIds[_key] = arguments[_key];
  }

  return gapi.client.youtube.videos.list({
    'part': ['snippet', 'contentDetails'],
    'id': videoIds
  });
};

var Player = /*#__PURE__*/function () {
  function Player(root, apiKey) {
    _classCallCheck(this, Player);

    this.root = root;
    this.apiKey = apiKey;
    this.progress = 0;
    this.currentIndex = 0;
  }

  _createClass(Player, [{
    key: "_initPlayer",
    value: function _initPlayer(_ref) {
      var _this = this;

      var _ref$width = _ref.width,
          width = _ref$width === void 0 ? 640 : _ref$width,
          _ref$height = _ref.height,
          height = _ref$height === void 0 ? 320 : _ref$height,
          _ref$videoId = _ref.videoId,
          videoId = _ref$videoId === void 0 ? '' : _ref$videoId,
          _onReady = _ref.onReady,
          onStateChange = _ref.onStateChange,
          onError = _ref.onError;
      return new Promise(function (resolve, reject) {
        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        tag.onerror = reject;
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        _this.root.id = "yt-player-".concat(Date.now().toString().slice(-5));

        var onAPIReady = function onAPIReady() {
          _this.instance = new YT.Player(_this.root.id, {
            height: height,
            width: width,
            videoId: videoId,
            playerVars: {
              'playsinline': 1,
              'controls': 0,
              'fs': 0,
              'disablekb': 1
            },
            events: {
              onReady: function onReady() {
                resolve();
                typeof _onReady === 'function' && _onReady();
              },
              onStateChange: _this.handleStateChange(onStateChange),
              onError: onError
            }
          });
        };

        if (typeof YT !== 'undefined') {
          onAPIReady();
        } else {
          window.onYouTubeIframeAPIReady = onAPIReady;
        }
      });
    }
  }, {
    key: "_getVideo",
    value: function _getVideo(apiKey) {
      for (var _len = arguments.length, videoIds = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        videoIds[_key - 1] = arguments[_key];
      }

      return loadVideo.apply(void 0, videoIds).then(function (playlistData) {
        return playlistData.result.items.map(function (_ref2) {
          var id = _ref2.id,
              snippet = _ref2.snippet,
              contentDetails = _ref2.contentDetails;
          return {
            id: id,
            title: snippet.title,
            description: snippet.description,
            thumbnails: snippet.thumbnails,
            duration: contentDetails.duration
          };
        });
      });
    }
  }, {
    key: "_getPlaylist",
    value: function _getPlaylist(playlistId) {
      var _this2 = this;

      var onScriptLoad = function onScriptLoad() {
        return loadClient(_this2.apiKey).then(function () {
          return loadPlaylist(playlistId);
        }).then(function (playlistData) {
          return _this2._getVideo(_this2.apiKey, playlistData.result.items.map(function (_ref3) {
            var snippet = _ref3.snippet;
            return snippet.resourceId.videoId;
          }));
        }).then(function (videoData) {
          _this2.instance.cuePlaylist(videoData.map(function (item) {
            return item.id;
          }));

          return videoData;
        });
      };

      return initApi().then(onScriptLoad);
    }
  }, {
    key: "handleStateChange",
    value: function handleStateChange(callback) {
      var _this3 = this;

      return function (_ref4) {
        var target = _ref4.target,
            data = _ref4.data;

        if (data === 1) {
          clearInterval(_this3.progressInterval);
          _this3.progress = 0;
          _this3.progressInterval = setInterval(function () {
            var prevProgress = _this3.progress;

            var currentDuration = _this3.instance.getCurrentTime();

            var totalDuration = _this3.instance.getDuration();

            if (!totalDuration) return;
            _this3.progress = Math.round(currentDuration / totalDuration * 10000) / 10000;

            if (prevProgress !== _this3.progress) {
              typeof _this3.onProgressUpdate === 'function' && _this3.onProgressUpdate(_this3.progress);
            }
          }, 500);
        }

        if (data === 0) {
          clearInterval(_this3.progressInterval);
          _this3.progress = 1;
        }

        var newIndex = _this3.instance.getPlaylistIndex();

        if (_this3.currentIndex !== newIndex) {
          _this3.currentIndex = newIndex;
          typeof _this3.onCurrentChanged === 'function' && _this3.onCurrentChanged(newIndex);
        }

        return typeof callback === 'function' && callback({
          target: target,
          data: data
        });
      };
    }
  }, {
    key: "playVideo",
    value: function playVideo() {
      this.instance.playVideo();
    }
  }, {
    key: "pauseVideo",
    value: function pauseVideo() {
      this.instance.pauseVideo();
    }
  }, {
    key: "playVideoAt",
    value: function playVideoAt(index) {
      this.progress = 0;
      this.instance.playVideoAt(index);
      typeof this.onProgressUpdate === 'function' && this.onProgressUpdate(this.progress);
    }
  }, {
    key: "nextVideo",
    value: function nextVideo() {
      this.progress = 0;
      this.instance.nextVideo();
      typeof this.onProgressUpdate === 'function' && this.onProgressUpdate(this.progress);
    }
  }, {
    key: "previousVideo",
    value: function previousVideo() {
      this.progress = 0;
      this.instance.previousVideo();
      typeof this.onProgressUpdate === 'function' && this.onProgressUpdate(this.progress);
    }
  }, {
    key: "createPlayer",
    value: function createPlayer(playlistId) {
      var _this4 = this;

      var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref5$width = _ref5.width,
          width = _ref5$width === void 0 ? 640 : _ref5$width,
          _ref5$height = _ref5.height,
          height = _ref5$height === void 0 ? 320 : _ref5$height,
          _ref5$videoId = _ref5.videoId,
          videoId = _ref5$videoId === void 0 ? '' : _ref5$videoId,
          onReady = _ref5.onReady,
          onStateChange = _ref5.onStateChange,
          onError = _ref5.onError;

      return this._initPlayer({
        width: width,
        height: height,
        videoId: videoId,
        onReady: onReady,
        onStateChange: onStateChange,
        onError: onError
      }).then(function () {
        return _this4._getPlaylist(playlistId);
      }).then(function (playlist) {
        _this4.playlist = playlist;
        return playlist;
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this5 = this;

      return new Promise(function (resolve) {
        clearInterval(_this5.progressInterval);

        _this5.instance.destroy();

        resolve();
      });
    }
  }]);

  return Player;
}();

export default Player;
