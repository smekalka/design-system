/* eslint-disable class-methods-use-this,no-underscore-dangle */
/* global YT */
import { loadClient, loadVideo, initApi, loadPlaylist } from './api';

class Player {
  constructor(root, apiKey) {
    this.root = root;
    this.apiKey = apiKey;
    this.progress = 0;
    this.currentIndex = 0;
  }

  _initPlayer({ width = 640, height = 320, videoId = '', onReady, onStateChange, onError }) {
    return new Promise((resolve, reject) => {
      const tag = document.createElement('script');

      tag.src = 'https://www.youtube.com/iframe_api';
      tag.onerror = reject;
      const firstScriptTag = document.getElementsByTagName('script')[0];

      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      this.root.id = `yt-player-${ Date.now().toString().slice(-5) }`;

      const onAPIReady = () => {
        this.instance = new YT.Player(this.root.id, {
          height,
          width,
          videoId,
          playerVars: {
            'playsinline': 1,
            'controls': 0,
            'fs': 0,
            'disablekb': 1
          },
          events: {
            onReady: () => {
              resolve();
              typeof onReady === 'function' && onReady();
            },
            onStateChange: this.handleStateChange(onStateChange),
            onError,
          },
        });
      };

      if (typeof YT !== 'undefined') {
        onAPIReady();
      } else {
        window.onYouTubeIframeAPIReady = onAPIReady;
      }
    });
  }

  _getVideo(apiKey, ...videoIds) {
    return loadVideo(...videoIds)
      .then((playlistData) =>
        playlistData.result.items.map(({ id, snippet, contentDetails }) => ({
          id,
          title: snippet.title,
          description: snippet.description,
          thumbnails: snippet.thumbnails,
          duration: contentDetails.duration
        })));
  };

  _getPlaylist(playlistId) {
    const onScriptLoad = () =>
      loadClient(this.apiKey)
        .then(() =>
          loadPlaylist(playlistId))
        .then((playlistData) =>
          this._getVideo(this.apiKey, playlistData.result.items.map(({ snippet }) => snippet.resourceId.videoId)))
        .then((videoData) => {
          this.instance.cuePlaylist(videoData.map((item) => item.id));

          return videoData;
        });

    return initApi().then(onScriptLoad);
  };

  handleStateChange(callback) {
    return ({ target, data }) => {
      if (data === 1) {
        clearInterval(this.progressInterval);
        this.progress = 0;

        this.progressInterval = setInterval(() => {
          const prevProgress = this.progress;

          const currentDuration = this.instance.getCurrentTime();
          const totalDuration = this.instance.getDuration();

          if (!totalDuration) return;

          this.progress = Math.round((currentDuration / totalDuration) * 10000) / 10000;

          if (prevProgress !== this.progress) {
            typeof this.onProgressUpdate === 'function' && this.onProgressUpdate(this.progress);
          }
        }, 500);
      }

      if (data === 0) {
        clearInterval(this.progressInterval);
        this.progress = 1;
      }

      const newIndex = this.instance.getPlaylistIndex();

      if (this.currentIndex !== newIndex) {
        this.currentIndex = newIndex;
        typeof this.onCurrentChanged === 'function' && this.onCurrentChanged(newIndex);
      }

      return typeof callback === 'function' && callback({
        target,
        data,
      });
    };
  }

  playVideo() {
    this.instance.playVideo();
  }

  pauseVideo() {
    this.instance.pauseVideo();
  }

  playVideoAt(index) {
    this.progress = 0;
    this.instance.playVideoAt(index);

    typeof this.onProgressUpdate === 'function' && this.onProgressUpdate(this.progress);
  }

  nextVideo() {
    this.progress = 0;
    this.instance.nextVideo();

    typeof this.onProgressUpdate === 'function' && this.onProgressUpdate(this.progress);
  }

  previousVideo() {
    this.progress = 0;
    this.instance.previousVideo();

    typeof this.onProgressUpdate === 'function' && this.onProgressUpdate(this.progress);
  }

  createPlayer(playlistId, { width = 640, height = 320, videoId = '', onReady, onStateChange, onError } = {}) {
    return this._initPlayer({
      width,
      height,
      videoId,
      onReady,
      onStateChange,
      onError,
    })
      .then(() =>
        this._getPlaylist(playlistId))
      .then((playlist) => {
        this.playlist = playlist;

        return playlist;
      });
  }

  destroy() {
    return new Promise((resolve) => {
      clearInterval(this.progressInterval);
      this.instance.destroy();
      resolve();
    });
  }
}

export default Player;
