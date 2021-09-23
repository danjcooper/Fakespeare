import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';

const CountdownBar = ({ runWhenDone, duration }) => {
  const props = useSpring({
    to: { width: '100%', backgroundColor: '#2cd1a0' },
    from: { width: '0', backgroundColor: '#71999b' },
    reset: true,
    onRest: () =>
      setTimeout(() => {
        runWhenDone();
      }, duration * 1000),
  });

  return (
    <>
      <animated.div
        style={{
          height: '10px',
          transition: `all ${duration}s cubic-bezier(0.39, 0.4, 0.52, 0.6) 0s`,

          position: 'absolute',
          top: 0,
          left: 0,
          ...props,
        }}
      ></animated.div>
    </>
  );
};

export default CountdownBar;
