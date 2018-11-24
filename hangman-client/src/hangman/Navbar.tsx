import React from 'react';
import posed from 'react-pose';

const Menu = posed.div({
  enter: { y: 0, opacity: 1, delay: 300, transition: { duration: 300 } },
  exit: { y: -20, opacity: 0 },
});

const Navbar = () => (
  <div className="navbar navbar-inverse navbar-fixed-top">
    <Menu key="menu">
      <div className="navbar-inner">
        <div className="container">
          <a className="brand" href="#">
            Hangman
          </a>
        </div>
      </div>
    </Menu>
  </div>
);

export default Navbar;
