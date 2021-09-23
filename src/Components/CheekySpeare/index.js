import React from 'react';
import { useSpring, animated } from 'react-spring';

import fk from '../../fk.png';

const CheekySpeare = () => {
  const props = useSpring({
    to: { bottom: '0', right: '0' },
    from: { bottom: '-100%', right: '-100%' },
    reset: true,
    delay: 2000,
  });

  return (
    <main>
      <animated.img
        style={{
          position: 'absolute',
          transition: '2s',
          width: '70%',
          bottom: '-100%',
          right: 0,

          ...props,
        }}
        src={fk}
        alt='cheeky'
        onClick={(e) => {
          e.target.style.display = 'none';
        }}
      />
      <h1>cheeky cheeky</h1>
    </main>
  );
};

export default CheekySpeare;
