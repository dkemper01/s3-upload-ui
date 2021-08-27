import React, { useState, useEffect } from 'react';
import './Clock.css';

function Clock() {
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');
  let intervalId = undefined; 

  useEffect(() => {    
    if (intervalId === undefined) {
      intervalId = setInterval(() => { 
        const currentDateTime = new Date();
        setTimeStr(`${currentDateTime.getHours()}:${currentDateTime.getMinutes()}:${currentDateTime.getUTCSeconds()} ${currentDateTime.getMilliseconds()}`);
        setDateStr(currentDateTime.toLocaleDateString());
      }, 100);
    } else {
      if (intervalId !== undefined) {
        clearInterval(intervalId);
      }
    }
    return () => clearInterval(intervalId);
  }, [setDateStr, setTimeStr]);

  return (
    <div className="Clock-container">
      <div className="Time">{timeStr}</div>
      <div className="Date">{dateStr}</div>
    </div>
  );
}

export default Clock;
