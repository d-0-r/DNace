import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper red lighten-2">
          <a href="/" className="left brand-logo">
            <span className="navDN">DN</span>
            <span className="navACE">ace</span>
          </a>
        </div>
      </nav>
    )
  }
}
