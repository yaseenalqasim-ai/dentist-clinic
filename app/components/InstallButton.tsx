"use client";

import {
  useEffect,
  useRef
} from "react";

export default function NotificationSound({
  trigger
}:{
  trigger:number
}){

  const audioRef =
    useRef<any>(null);

  useEffect(()=>{

    if(trigger > 0){

      audioRef.current?.play();

    }

  },[trigger]);

  return(

    <audio
      ref={audioRef}
      src="https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg"
    />

  );

}