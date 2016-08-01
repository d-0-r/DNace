import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <main>
        <h1> DNace </h1>
        <h6> (Yes, the name is an intentional bad pun) </h6><br/>
        <h4> Your basic DNA string sequencing made easy! </h4><br/>
        <h5> Simply upload or paste in a FASTA formatted DNA string and </h5><br/>
        <h5> get a quick analysis of the sequence including graphs and more! </h5><br/><br/>
        <a className="waves-effect waves-light btn red upload-btn"><i className="material-icons right">file_upload</i>Upload</a>
        <a className="waves-effect waves-light btn red paste-btn"><i className="material-icons right">content_paste</i>Paste</a>
      </main>
    )
  }
}

const div = document.querySelector('#app');

ReactDOM.render(<App/>, div);
