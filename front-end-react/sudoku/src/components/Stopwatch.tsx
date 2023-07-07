import React, { useEffect, useState } from "react";
import "../styling/stopwatch.css";



export const Stopwatch = ({running}) => {
  // state to store time
    const [time, setTime] = useState(0);
    console.log(running)
    // state to check stopwatch running or not
    const [isRunning, setIsRunning] = useState(running);

    // Method to reset timer back to 0
    const reset = () => {
        setTime(0);
    };

    useEffect(()=>{
        if(running%2 === 0){
            setIsRunning(running)
            reset();
        }else{
            // console.log(time)
            setIsRunning(0);
        }
        
    }, [running])

    useEffect(() => {
        let intervalId;
        if (isRunning) {
            // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
            intervalId = setInterval(() => setTime(time + 1), 10);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, time]);


    // Minutes calculation
    const minutes = Math.floor((time % 360000) / 6000);

    // Seconds calculation
    const seconds = Math.floor((time % 6000) / 100);

    // Milliseconds calculation

    // Method to start and stop timer
    const startAndStop = () => {
        setIsRunning(!isRunning);
    };

    
    return (
        <div className="stopwatch-container">
        <p className="stopwatch-time">
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
        </p>
        <div className="stopwatch-buttons">
        </div>
        </div>
    );
};

export default Stopwatch;