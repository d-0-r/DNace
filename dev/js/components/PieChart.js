import React from 'react';
import { Pie } from 'react-chartjs-2';

export default class PieChart extends React.Component {
  render() {
    return (
      <div>
        <h3 className="chartTitle"> GC vs AT Content </h3>
        <h6 className="chartTitle"> Purine + Pyrimidine Comparison </h6>
        <br/>
        <Pie data={this.props.data} />
      </div>
    );
  }
};
