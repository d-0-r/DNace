import React from 'react';

import BarGraph from './BarGraph';
import Navbar from './Navbar';
import PieChart from './PieChart';
import Report from './Report';


import { nucleotideData, gcContentData, options, getAaData,
         makeAaData, getCodonData, makeCodonData} from '../chartData';

const aaAmount = [];
const aaLabel = [];
getAaData(aaLabel, aaAmount);

const codonAmount = [];
const codonLabel = [];
getCodonData(codonLabel, codonAmount);

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <br/>
        <Report />
        <br/><br/>
        <BarGraph title='Nucleotide Usage' data={nucleotideData} options={options} />
        <br/><br/>
        <PieChart data={gcContentData} />
        <br/><br/>
        <BarGraph title='Amino Acid Composition' data={makeAaData(aaLabel, aaAmount)} options={options} />
        <br/><br/>
        <BarGraph title='Codon Usage' data={makeCodonData(codonLabel, codonAmount)} options={options} />
      </div>
    )
  }
}
