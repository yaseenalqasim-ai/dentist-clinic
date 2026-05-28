type Booking = {
  day:string;
  startTime:string;
  duration:number;
};

function toMinutes(
  time:string
){

  const [
    h,
    m
  ] = time
      .split(":")
      .map(Number);

  return h * 60 + m;

}

export function hasConflict(
  bookings:Booking[],
  newBooking:Booking
){

  const newStart =

    toMinutes(
      newBooking.startTime
    );

  const newEnd =

    newStart
    +
    newBooking.duration;

  for(
    const booking
    of bookings
  ){

    if(
      booking.day
      !==
      newBooking.day
    ){
      continue;
    }

    const existingStart =

      toMinutes(
        booking.startTime
      );

    const existingEnd =

      existingStart
      +
      booking.duration;

    const overlap =

      newStart
      <
      existingEnd

      &&

      newEnd
      >
      existingStart;

    if(overlap){

      return true;

    }

  }

  return false;

}