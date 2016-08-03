import React from 'react';

export default class About extends React.Component {
  render() {
    return (
        <div className="row">
          <div className="offset-s3 col s6 descrip">
            <p id="h1"><span id="DN">DN</span><span id="ace">ace</span></p>
            <p id="joke"> (Yes, the name is an intentional bad pun) </p>
            <p className="pitch"> Your basic DNA string sequencing made easy! </p>
            <div className="desc-container">
              <p> Simply upload or paste in a FASTA formatted DNA string and
              get a quick analysis of the sequence including: &nbsp;
              <span className="keywords"><b>gc content, amino acid composition, charts, and more!</b></span></p>
            </div>
          </div>
        </div>
    )
  }
}
