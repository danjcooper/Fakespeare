import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import fk from '../../fk.png';

function Loader() {
  const props = useSpring({
    to: { height: '100px', backgroundColor: '#2cd1a0' },
    from: { height: '0px', backgroundColor: '#71999b' },
    reset: true,
  });

  return (
    <main>
      <h1>Loading</h1>
    </main>
  );
}

export default Loader;
