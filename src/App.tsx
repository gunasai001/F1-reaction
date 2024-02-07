import { useState } from 'react';
import './App.css';
import BlackBox from './assets/components/BlackBox';

// Reference website: 
// https://jan25.github.io/f1-lights/

function App() {
  
  const randomNumberInRange = (num:number) => {
    return (Math.random()*num)+2;
  };

  // first click... run is set to true...
  // after 4 seconds + random time...start is set to current time
  // seconde click...run is set to false...end is set to current time
  // time is the result and it is calculated by end-start... 

  const [run, setRun] = useState(false); // To start the test
  const [start, setStart] = useState(0); // To start the timer
  const [end, setEnd] = useState(0);  // To end the timer
  const [time, setTime] = useState(end-start); // to store the time
  const [randomTime, setRandomTime] = useState(randomNumberInRange(2)*1000) // to store the random time
  
  const handleClick = async () => {  
    if(!run){ 
      
      setRandomTime(()=>(randomNumberInRange(2)*1000))
      await setTimeout(() => {
        setStart(()=>(new Date().getTime()))
      }, 4000+randomTime);
    }
    else{
      console.log("2");
      setEnd(()=>(new Date().getTime()))
      setTime(()=>end-start)
    }
    setRun(((r)=>!r));

  }

  return (
    <>
    <div className='full' onClick={handleClick}>
      <h1>Reaction time test</h1>
    <div className='box'>
     <BlackBox out={randomTime} run={run} delay={0} />
     <BlackBox out={randomTime} run={run} delay={1000} />
     <BlackBox out={randomTime} run={run} delay={2000} />
     <BlackBox out={randomTime} run={run} delay={3000} />
     <BlackBox out={randomTime} run={run} delay={4000} />
    </div>
     <h4>Tap/Click when you're ready to race, then tap again when the lights go out.</h4>
     <h2>{start} {end} {time}</h2>
     <h3>Best</h3>
     </div>
     </>
  )
}
export default App
