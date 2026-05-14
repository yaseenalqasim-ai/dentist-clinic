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

    const timer =
      setInterval(()=>{

        start += 1;

        setCount(start);

        if(start >= end){

          clearInterval(timer);

        }

      },20);

    return ()=>clearInterval(timer);

  },[value]);

  return(

    <span>

      {count}

    </span>

  );

}