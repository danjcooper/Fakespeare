import React from 'react';

const PlayerList = ({ playerList }) => {
  return (
    <section id='playerlist'>
      {playerList.map((player) => (
        <h1>{player}</h1>
      ))}
    </section>
  );
};

export default PlayerList;
