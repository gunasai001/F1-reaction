import { useEffect, useState } from 'react';
import '../styles/BlackBox.css';

function BlackBox(props: {run:boolean; out:number; delay:number}) {
    const [a, setA] = useState(false);
    
    useEffect(() => {
      if(props.run){
        setTimeout(() => {
          setA(true);
          setTimeout(() => {
            setA(false);
          }, 4000-props.delay+props.out);
        }, props.delay);
      }
      else{
        setA(false)
      }
      
    },[props.run])
    
    
  return (
    <div className='main'>
       <div className="circles"></div>
       <div className="circles"></div>
       <div className="down" style={{backgroundColor: a?'rgb(219, 13, 13)':'rgb(43, 41, 41)'}}></div>
       <div className="down" style={{backgroundColor: a?'rgb(219, 13, 13)':'rgb(43, 41, 41)'}}></div>
    </div>
    
  )
}

export default BlackBox;