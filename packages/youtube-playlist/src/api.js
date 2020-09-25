let onYouTubeIframeAPIReady = () => {
};

class Player {
  constructor({ apiKey, root, width, height, playlistId }) {
    this.apiKey = apiKey;
    this.root = root;
    this.playlistId = playlistId;
    this.size = {
      width,
      height,
    };

    const tag = document.createElement('script');

    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];

    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // eslint-disable-next-line no-unused-vars
    onYouTubeIframeAPIReady = this.initPlayer;
  }

  initPlayer = () => {
    // eslint-disable-next-line no-undef
    this.player = new YT.Player(this.root, {
      height: this.size.height,
      width: this.size.width,
      videoId: '',
    });

    this.player.loadPlaylist({

    })
  };
}

export default Player;
