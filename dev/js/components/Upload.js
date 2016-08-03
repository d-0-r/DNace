import React from 'react';

export default class Upload extends React.Component {
  render() {
    return (
      <li className="upload-btn">
        <div className="waves-effect waves-light btn grey darken-3 file-field">
          <i className="material-icons right">file_upload</i>Upload
          <input type="file"></input>
        </div>
      </li>
    )
  }
}
