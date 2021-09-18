import React from 'react';

const PlayerList = ({ playerList }) => {
  return (
    <section id='playerlist'>
      {playerList.map((player, i) => (
        <h1 className='display-light' key={i}>
          {player}
        </h1>
      ))}
    </section>
  );
};

export default PlayerList;
