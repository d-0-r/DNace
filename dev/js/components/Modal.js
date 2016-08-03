import React from 'react';

export default class Modal extends React.Component {
  render() {
    return (
      <div id="pasteFASTA" className="modal">
        <div className="modal-content">
          <h4>Paste Your DNA String Below</h4>
          <h6>Include identifying FASTA header</h6>
          <textarea placeholder="Enter DNA string" className="dnaInput"></textarea>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-action modal-close waves-effect waves-green btn red">
          <i className="material-icons right">send</i>Submit</a>
        </div>
      </div>
    )
  }
}
