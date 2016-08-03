import React from 'react';

export default class Button extends React.Component {
  render() {
    return (
      <li className="paste-btn">
        <a className="waves-effect waves-light btn {this.props.color} modal-trigger" href={this.props.url}>
        <i className="material-icons right">{this.props.icon}</i>{this.props.name}</a>
      </li>
    )
  }
}
