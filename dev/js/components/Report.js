import React from 'react';

export default class Report extends React.Component {
  constructor() {
    super();
    this.baseTags = [];
    this.aaTags =  [];
    this.codonTags = [];
  }

  totalBases() {
    for (let base in results.nucleotides) {
        this.baseTags.push(`${base} : ${(results.nucleotides[base] / results.totalBases * 100).toFixed(2)}% || total: ${results.nucleotides[base]}`);
    }
  }

  aminoAcids() {
    for (let aa in results.aa) {
      this.aaTags.push(`${aa} : ${(results.aa[aa] / results.totalAa * 100).toFixed(2)}% || total: ${results.aa[aa]}`);
    }
  }

  codonUsage() {
    for (let codon in results.codon) {
      this.codonTags.push(`${codon} : ${results.codonTable[codon]}  ${(results.codon[codon] / results.totalAa * 100).toFixed(2)}%  || total: ${results.codon[codon]}`);
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col s8 offset-s2 blue-grey lighten-4">
          <div id="textReport">
            <h2 id="reportTitle"> Results </h2>
            <hr/><br/><br/>
            <h6>Header: &nbsp; {results.header}</h6>
            <h6>Total bases: &nbsp; {results.totalBases}</h6>
            <h6>Megabases: &nbsp; {results.MB}</h6>
            <h6>GC content: &nbsp; {results.gcContent}%</h6>
            <h6>Total amino acids: &nbsp; {results.totalAa}</h6>
            <br/>
            <h5><u>Base Usage:</u></h5>
            {this.totalBases() /* need to call this first, can't map objects...*/}
            {this.baseTags.map(function(base){
              return <h6>{base}</h6>;
            })}
            <br/>
            <h5><u>Amino Acid Composition:</u></h5>
            {this.aminoAcids()}
            {this.aaTags.map(function(aminoAcid){
              return <h6>{aminoAcid}</h6>;
            })}
            <br/>
            <h5><u>Codon Usage</u></h5>
            {this.codonUsage()}
            {this.codonTags.map(function(codon){
              return <h6>{codon}</h6>;
            })}
            <br/>
            <h5><u>RNA Transcript</u></h5>
            <h6 id="rnaTranscript">{results.transcript}</h6>
          </div>
        </div>
      </div>
    )
  }
}
