import React from 'react';

export default class Paste extends React.Component {
  render() {
    return (
      <li className="paste-btn">
        <a className="waves-effect waves-light btn red modal-trigger" href="#pasteFASTA">
        <i className="material-icons right">content_paste</i>Paste</a>
      </li>
    )
  }
}
