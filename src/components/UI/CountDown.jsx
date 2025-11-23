import React, { useEffect, useState, useRef } from 'react'

const CountDown = ({ expires }) => {

  const requestRef = useRef();
  const [startTime, setStartTime] = useState(Date.now());
  const [hasExpired, setHasExpired] = useState(false);
  
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerHours, setTimerHours] = useState(0);

  
  function updateTimer() {
    let millisElapsed =  Date.now() - startTime
    let millisLeft = expires - millisElapsed - startTime
  
      if (millisLeft < 0) {
        millisLeft = 0
        cancelAnimationFrame(requestRef.current)
        requestRef.current = null
        setHasExpired(true)
      }
      let secondsLeft = millisLeft / 1000
      let minutesLeft = secondsLeft / 60
      let hoursLeft = minutesLeft / 60
    
      setTimerSeconds(Math.floor(secondsLeft % 60).toString())
      setTimerMinutes(Math.floor(minutesLeft % 60).toString())
      setTimerHours(Math.floor(hoursLeft % 60).toString())
  
      if (requestRef.current) {
        requestRef.current = requestAnimationFrame(updateTimer)
      }
  }

  useEffect (() => {
    requestRef.current = requestAnimationFrame(updateTimer)
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div className="de_countdown">
      {hasExpired 
      ? 
        <>
        <span>EXPIRED</span>
        </>
      : 
      <>
        <span >{timerHours}h </span>
        <span >{timerMinutes}m </span>
        <span >{timerSeconds}s</span>
      </>
      }
    </div>
  )
}

export default CountDown
