import React, { useState } from 'react';
import { LinearProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Stopwatch from './Stopwatch/Stopwatch.js';
import ReactS3Uploader from 'react-s3-uploader';
import logo from './s3-64.svg';
import './App.css';

function App() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [clockToggle, setClockToggle] = useState(false);
  const linearProgressStyle = {
    width: '100%',
    visibility: loading ? 'visible' : 'hidden'
  };
  const uploaderStyle = {
    marginTop: '50px'
  };

  const StyledLinearProgress = withStyles({
    colorPrimary: {
      backgroundColor: 'rgb(170, 215, 250)'
    },
    barColorPrimary: {
      backgroundColor: '#2196f3'
    }
  })(LinearProgress);

  function onUploadFinish(evt) {
    setLoading(false);
    setProgress(0);
    setClockToggle(false);
  }

  function onUploadProgress(evt) {
    if (!clockToggle) {
      setClockToggle(true);
    }

    setLoading(true);
    setProgress(evt);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          S3 Signed URL upload PoC
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
      </header>
      <div className="Reverse-header">
        <Stopwatch isActive={clockToggle} />
      </div>
      <div className="Section-header">
        <StyledLinearProgress variant="determinate" value={progress} style={linearProgressStyle}/>
        <ReactS3Uploader
          signingUrl="https://<http-api-gateway-id>.execute-api.<region>.amazonaws.com/"
          signingUrlMethod="GET"
          accept="image/*"
          signingUrlQueryParams={{ key1: 'Key one', key2: 'Key two' }}
          uploadRequestHeaders={{}}
          onFinish={onUploadFinish}
          onProgress={onUploadProgress}
          style={uploaderStyle}
        />
      </div>
    </div>
  );
}

export default App;
