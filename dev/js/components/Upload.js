import React from 'react';

export default class Upload extends React.Component {
  submitForm() {
    this.refs.fastaForm.submit();
  }

  formToRender() {
    return (
      <li className="upload-btn">
        <form className="waves-effect waves-light btn grey darken-3 file-field" ref="fastaForm"
              method="POST" encType="multipart/form-data">
          <i className="material-icons right">file_upload</i>Upload
          <input type="file" name="uploadedFASTA" onChange={this.submitForm.bind(this)}></input>
        </form>
      </li>
    )
  }

  render() {
    return this.formToRender()
  }
}
