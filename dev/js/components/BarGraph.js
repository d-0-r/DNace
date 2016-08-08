import React from 'react';
import { Bar } from 'react-chartjs-2';

export default class BarGraph extends React.Component {
  render() {
    return (
      <div>
        <h3 className="chartTitle">{this.props.title}</h3>
        <Bar data={this.props.data} height={100} width={400} options={this.props.options}/>
      </div>
    );
  }
};
