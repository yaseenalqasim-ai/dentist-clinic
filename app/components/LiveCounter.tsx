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

    if(
      typeof value !== "number"
      ||
      isNaN(value)
    ){
      setCount(0);
      return;
    }

    let start = 0;

    const end = value;

    const duration = 800;

    const increment =
      end / (duration / 16);

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

      },16);

    return ()=>clearInterval(timer);

  },[value]);

  return(

    <span>

      {String(count)}

    </span>

  );

}