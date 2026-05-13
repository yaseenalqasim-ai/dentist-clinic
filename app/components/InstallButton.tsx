"use client";

import {
  useEffect,
  useState
} from "react";

export default function LiveCounter({

  value

}:{

  value:number

}){

  const [
    count,
    setCount
  ] = useState(0);

  useEffect(()=>{

    let start = 0;

    const end = value;

    if(start === end)
      return;

    const duration = 800;

    const increment =
      end / (duration / 10);

    const timer =
      setInterval(()=>{

        start += increment;

        if(start >= end){

          setCount(end);

          clearInterval(timer);

        }else{

          setCount(
            Math.floor(start)
          );

        }

      },10);

    return ()=>clearInterval(timer);

  },[value]);

  return(

    <span>

      {count}

    </span>

  );

}