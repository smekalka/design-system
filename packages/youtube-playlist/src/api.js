/* global gapi */
export const initApi = () => {
  return new Promise((resolve, reject) => {
    if (document.querySelector('[data-gapi]')) {
      resolve();
    }

    const tag = document.createElement('script');

    tag.src = 'https://apis.google.com/js/api.js';
    tag.dataset.gapi = true;
    tag.onload = resolve;
    tag.onerror = reject;

    const firstScriptTag = document.getElementsByTagName('script')[0];

    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  });
};

export const loadClient = (apiKey) => {
  return new Promise((resolve, reject) => {
    gapi.load('client', {
      callback: () => {
        gapi.client.setApiKey(apiKey);

        gapi.client.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
          .then(resolve)
          .catch((err) => {
            console.error('Error loading GAPI client for API: ', err);
            reject();
          });
      },
    });
  });
};

export const loadPlaylist = (playlistId) => {
  return gapi.client.youtube.playlistItems.list({
    'part': [ 'snippet' ],
    'maxResults': 50,
    'playlistId': playlistId,
  });
};

export const loadVideo = (...videoIds) => {
  return gapi.client.youtube.videos.list({
    'part': [ 'snippet', 'contentDetails' ],
    'id': videoIds,
  });
};
