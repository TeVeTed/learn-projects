import React from 'react';

export default function EpisodesList(props) {
  const { episodes, toggleFavAction, favourites } = props;

  return episodes
    .filter(episode => episode.image)
    .map(episode => {
      return (
        <section
          className="episode-box"
          key={episode.id}
        >
          <img
            src={episode.image.medium}
            alt={`Rick and Morty ${episode.name}`}
          />
          <div>{episode.name}</div>
          <section style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
              Season: {episode.season} Number: {episode.number}
            </div>
            <button type="button" onClick={() => toggleFavAction(episode)}>
              {favourites.find(fav => fav.id === episode.id) ? 'Unfav' : 'Fav'}
            </button>
          </section>
        </section>
      )
  })
}