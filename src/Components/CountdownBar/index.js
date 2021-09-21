import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';

const CountdownBar = ({ runWhenDone, duration }) => {
  //   const [max, setMax] = useState(duration);
  //   const [time, setTime] = useState(duration);
  //   const [percentage, setPercentage] = useState('0');

  //   const [myStyle, setMyStyle] = useState({
  //     transition: `all ${duration}s cubic-bezier(0.39, 0.4, 0.52, 0.6) 0s`,
  //     width: percentage,
  //     height: '100%',
  //     background: '#eda92c',
  //   });

  //   useEffect(() => {
  //     setMyStyle((prevState) => {
  //       return {
  //         ...prevState,
  //         transition: `all ${duration}s cubic-bezier(0.39, 0.4, 0.52, 0.6) 0s`,
  //         background: 'pink',
  //         width: '100%',
  //       };
  //     });
  //   }, [percentage]);

  //   useEffect(() => {
  //     setPercentage('100%');

  //     let whenDone = setTimeout(() => {
  //       runWhenDone();
  //     }, duration * 1000);
  //   }, [duration]);

  //   useEffect(() => {
  //     console.log(myStyle);
  //   }, [myStyle]);

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
