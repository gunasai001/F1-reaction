import { useState, useEffect, useCallback } from 'react';
import './App.css';
import BlackBox from './assets/components/BlackBox';

function App() {
  const [run, setRun] = useState(false);
  const [start, setStart] = useState(0);
  const [time, setTime] = useState(0);
  const [randomTime, setRandomTime] = useState(0);
  const [lightsOut, setLightsOut] = useState(false);
  const [jumpStart, setJumpStart] = useState(false);
  const [bestTime, setBestTime] = useState(() => {
    const savedBestTime = localStorage.getItem('bestTime');
    return savedBestTime ? parseInt(savedBestTime) : Infinity;
  });

  const randomNumberInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  const resetStates = useCallback(() => {
    setRun(false);
    setTime(0);
    setStart(0);
    setLightsOut(false);
    setRandomTime(0);
  }, []);

  const handleAction = useCallback(() => {
    if (jumpStart) {
      setJumpStart(false);
      resetStates();
    } else if (!run) {
      resetStates();
      setRun(true);
      setRandomTime(randomNumberInRange(2, 4) * 1000);
    } else if (!lightsOut) {
      setJumpStart(true);
      resetStates();
    } else {
      const endTime = new Date().getTime();
      const newTime = endTime - start;
      setTime(newTime);
      
      if (newTime < bestTime) {
        setBestTime(newTime);
        localStorage.setItem('bestTime', newTime.toString());
      }
      
      setRun(false);
      setLightsOut(false);
    }
  }, [jumpStart, run, lightsOut, start, bestTime, resetStates]);

  useEffect(() => {
    if (run) {
      const lightsOnTimer = setTimeout(() => {
        const lightsOutTimer = setTimeout(() => {
          setStart(new Date().getTime());
          setLightsOut(true);
        }, randomTime);

        return () => clearTimeout(lightsOutTimer);
      }, 4000);

      return () => clearTimeout(lightsOnTimer);
    }
  }, [run, randomTime]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        handleAction();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleAction]);

  return (
    <div className='full' onClick={handleAction}>
      <h1>Reaction time test</h1>
      <div className='box'>
        <BlackBox out={randomTime} run={run} delay={0} lightsOut={lightsOut} />
        <BlackBox out={randomTime} run={run} delay={1000} lightsOut={lightsOut} />
        <BlackBox out={randomTime} run={run} delay={2000} lightsOut={lightsOut} />
        <BlackBox out={randomTime} run={run} delay={3000} lightsOut={lightsOut} />
        <BlackBox out={randomTime} run={run} delay={4000} lightsOut={lightsOut} />
      </div>
      <h4>Tap/Click or press Spacebar when you're ready to race, then do the same when the lights go out.</h4>
      <h2>
        {jumpStart ? 'JUMP START' : time > 0 ? `Your reaction time: ${time} ms` : '0 ms'}
      </h2>
      <h3>Best time: {bestTime === Infinity ? 'Not set' : `${bestTime} ms`}</h3>
      <p style={{ position: 'fixed', bottom: '10px', right: '10px', margin: 0 }}>@GunaSai44</p>
    </div>
  );
}

export default App;