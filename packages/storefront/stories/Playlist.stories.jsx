import React, { useState, useEffect, useRef } from 'react';

import Player from '@simpozio/youtube-playlist';

const PLAYLIST_ID = 'PLUX8NTzrCIMUyGTuKlIVPtZz9faidClNz';
const API_KEY = 'AIzaSyAKHPaGnOs2eaQcjOnqR-hRcXX6i9NwBrg';

export default {
  title: 'Components/Playlist',
};

export const Primary = () => {
  const playerRoot = useRef();
  const playerRef = useRef();
  const [ current, setCurrent ] = useState(0);
  const [ loaded, setLoaded ] = useState(false);
  const [ progress, setProgress ] = useState(0);

  useEffect(() => {
    const player = new Player(playerRoot.current, API_KEY);

    playerRef.current = player;

    playerRef.current.createPlayer(PLAYLIST_ID)
      .then(() => {
        setLoaded(true);
      });

    playerRef.current.onProgressUpdate = setProgress;
    playerRef.current.onCurrentChanged = setCurrent;

    return () => {
      player.destroy();
    };
  }, []);

  const handleVideoClick = (index) => () => {
    playerRef.current.playVideoAt(index);
  };

  const renderPlaylist = playerRef.current?.playlist.map((item, index) => (
    <li
      style={ { color: current === index ? 'red' : 'black' } }
      key={ item.id }
      onClick={ handleVideoClick(index) }
    >
      { item.title }
      {' '}
      –
      {' '}
      { item.duration }
    </li>
  ));

  return (
    <div>
      Playlist

      <button
        type="button"
        onClick={ () => playerRef.current.playVideo() }
      >
        Play
      </button>
      <button
        type="button"
        onClick={ () => playerRef.current.pauseVideo() }
      >
        Pause
      </button>

      <button
        type="button"
        onClick={ () => playerRef.current.previousVideo() }
      >
        Previous
      </button>
      <button
        type="button"
        onClick={ () => playerRef.current.nextVideo() }
      >
        Next
      </button>

      <div
        style={
          {
            position: 'relative',
            height: '4px',
          }
        }
      >
        <div
          style={
            {
              position: 'absolute',
              width: '100%',
              transform: `scaleX(${ progress })`,
              transformOrigin: 'left',
              height: '4px',
              background: 'red',
              transition: 'transform linear 0.2s',
            }
          }
        />
      </div>

      <ol>
        { renderPlaylist }
      </ol>

      <div
        style={ { visibility: 'hidden' } }
        ref={ playerRoot }
      />
    </div>
  );
};
