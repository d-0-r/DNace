import React from 'react';

export default class Modal extends React.Component {
  render() {
    return (
      <div id="pasteFASTA" className="modal">
        <form ref="fastaForm" method="POST" encType="multipart/form-data">
          <div className="modal-content">
            <h4>Paste Your DNA String Below</h4>
            <h6>Include identifying FASTA header</h6>
            <textarea placeholder="Enter DNA string" className="dnaInput" name="pastedFASTA"></textarea>
          </div>
          <div className="modal-footer">
            <button className="btn red waves-effect waves-light" type="submit" name="action">Submit
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    )
  }
}
