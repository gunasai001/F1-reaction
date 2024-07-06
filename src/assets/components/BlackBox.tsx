import { useEffect, useState } from 'react';
import '../styles/BlackBox.css';

function BlackBox(props: { run: boolean; out: number; delay: number; lightsOut: boolean }) {
  const [lit, setLit] = useState(false);

  useEffect(() => {
    if (props.run) {
      const lightOnTimer = setTimeout(() => {
        setLit(true);
      }, props.delay);

      return () => clearTimeout(lightOnTimer);
    } else {
      setLit(false);
    }
  }, [props.run, props.delay]);

  useEffect(() => {
    if (props.lightsOut) {
      setLit(false);
    }
  }, [props.lightsOut]);

  return (
    <div className='main'>
      <div className="circles"></div>
      <div className="circles"></div>
      <div className="down" style={{ backgroundColor: lit ? 'rgb(219, 13, 13)' : 'rgb(43, 41, 41)' }}></div>
      <div className="down" style={{ backgroundColor: lit ? 'rgb(219, 13, 13)' : 'rgb(43, 41, 41)' }}></div>
    </div>
  );
}

export default BlackBox;