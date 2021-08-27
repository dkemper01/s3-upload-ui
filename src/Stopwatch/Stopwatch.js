import React, { useEffect, useState } from 'react';
import Timer from '../Timer/Timer';

function Stopwatch(props) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;

    if (props.isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
      setTimeout(() => setTime(0), 5000); // Display the total upload time for 5s, then reset
    }

    return () => {
      clearInterval(interval);
    };
  }, [props]);

  return (
    <div>
      <Timer time={time} />
    </div>
  );
}

export default Stopwatch;
