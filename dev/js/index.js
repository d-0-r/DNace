import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <main className="container">
        <div className="row">
          <div className="offset-s3 col s6 descrip">
            <p id="h1"><span id="DN">DN</span><span id="ace">ace</span></p>
            <p id="joke"> (Yes, the name is an intentional bad pun) </p>
            <p className="pitch"> Your basic DNA string sequencing made easy! </p>
            <div className="desc-container">
              <p> Simply upload or paste in a FASTA formatted DNA string and
              get a quick analysis of the sequence including: &nbsp;
              <span className="keywords"><b>gc content, amino acid composition, graphs, and more!</b></span></p>
            </div>
            <ul>
              <li className="upload-btn">
                <a className="waves-effect waves-light btn grey darken-3">
                <i className="material-icons right">file_upload</i>Upload</a>
              </li>
              <li className="paste-btn">
                <a className="waves-effect waves-light btn red modal-trigger" href="#pasteFASTA">
                <i className="material-icons right">content_paste</i>Paste</a>
              </li>
            </ul>
          </div>
        </div>

        <div id="pasteFASTA" className="modal">
        <div className="modal-content">
          <h4>Paste Your DNA String Below</h4>
          <h6>Include identifying FASTA header</h6>
          <textarea placeholder="Enter DNA string" className="dnaInput"></textarea>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-action modal-close waves-effect waves-green btn red"><i className="material-icons right">done</i>Submit</a>
        </div>
      </div>

      </main>
    )
  }
}

const div = document.querySelector('#app');

ReactDOM.render(<App/>, div);
