export function durationHeight(
  duration:number
){

  return duration * 2;

}

export function calculateEndTime(
  startTime:string,
  duration:number
){

  const [
    hours,
    minutes
  ] = startTime
      .split(":")
      .map(Number);

  const totalMinutes =

    hours * 60
    +
    minutes
    +
    duration;

  const endHours =
    Math.floor(
      totalMinutes / 60
    );

  const endMinutes =
    totalMinutes % 60;

  return `${

    String(endHours)
      .padStart(2,"0")

  }:${
    String(endMinutes)
      .padStart(2,"0")
  }`;

}