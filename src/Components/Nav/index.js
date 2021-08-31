import React from 'react';

import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/join'>Join</Link>
      <Link to='/create'>Create</Link>
    </nav>
  );
};

export default Nav;
