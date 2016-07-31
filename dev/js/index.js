import React from 'react';
import ReactDOM from "react-dom";

class App extends React.Component {
  render() {
    return (
      <div>
        <h1><u> DNayyy </u></h1>
      </div>
    )
  }
}

const div = document.querySelector('#app');

ReactDOM.render(<App/>, div);
