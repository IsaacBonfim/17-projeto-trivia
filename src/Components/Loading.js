import React from 'react';
import '../Styles/Loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading-container">

        {/* <div className="loadig-effect-container">
          <div className="loading-effect" />
        </div> */}

        <span className="loading-text">L</span>
        <span className="loading-text">o</span>
        <span className="loading-text">a</span>
        <span className="loading-text">d</span>
        <span className="loading-text">i</span>
        <span className="loading-text">n</span>
        <span className="loading-text">g</span>
        <span className="loading-text">.</span>
        <span className="loading-text">.</span>
        <span className="loading-text">.</span>
      </div>
    );
  }
}

export default Loading;
