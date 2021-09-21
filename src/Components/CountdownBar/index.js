import React, { useEffect, useState } from 'react';

const CountdownBar = () => {
  const [max, setMax] = useState(10);

  const [myStyle, setMyStyle] = useState({
    transition: `all ${max}s cubic-bezier(0.39, 0.4, 0.52, 0.6) 0s`,
    width: '0',
    background: '#eda92c',
    height: '100%',
  });

  useEffect(() => {
    setMyStyle((prevState) => {
      return {
        ...prevState,
        transition: `all ${max}s cubic-bezier(0.39, 0.4, 0.52, 0.6) 0s`,
        width: '100%',
      };
    });

    let runWhenDone = setTimeout(() => {
      alert('hi');
    }, max * 1000);
  }, []);

  return (
    <>
      <div id='outerBar'>
        <div id='innerBar' style={myStyle}></div>
      </div>
    </>
  );
};

export default CountdownBar;
