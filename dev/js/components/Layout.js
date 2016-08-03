import React from 'react';

import About from './About';
import Upload from './Upload';
import Paste from './Paste';
import Modal from './Modal';

export default  class Layout extends React.Component {
  render() {
    return (
      <main className="container">
        <About />
        <ul className="landing-btn ">
          <Upload />
          <Paste />
          <Modal />  {/* Paste's Modal, default display: none; */}
        </ul>
      </main>
    )
  }
}
