"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";

const DigitalClock = () => {
  // States to store hours, minutes, seconds, and the 24-hour format toggle
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [is24Hour, setIs24Hour] = useState<boolean>(false); // Tracks whether 24-hour format is active

  // useEffect hook to update the time every second
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const currentHours = date.getHours();
      const currentMinutes = date.getMinutes();
      const currentSeconds = date.getSeconds();

      // Update state with current time values
      setHours(currentHours);
      setMinutes(currentMinutes);
      setSeconds(currentSeconds);
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Function to switch to 12-hour format
  const toggleTo12Hour = () => {
    setIs24Hour(false); // Set is24Hour to false for 12-hour format
  };

  // Function to switch to 24-hour format
  const toggleTo24Hour = () => {
    setIs24Hour(true); // Set is24Hour to true for 24-hour format
  };

  // Helper function to format hours for 12-hour clock
  const formatHour = (hour: number) => {
    if (!is24Hour) {
      // If in 12-hour format, convert 24-hour time to 12-hour time
      const adjustedHour = hour % 12 || 12; // Handle 0 as 12
      return adjustedHour.toString().padStart(2, "0");
    }
    return hour.toString().padStart(2, "0"); // Return 24-hour format hour as-is
  };

  // Helper function to determine AM/PM for 12-hour format
  const getPeriod = (hour: number) => {
    return hour >= 12 ? "PM" : "AM"; // PM for hours >= 12, AM otherwise
  };

  return (
    <div className="main flex items-center justify-center h-screen bg-black">
      <Card className="bg-white px-0 py-4 md:px-5 md:w-[300px] w-[98%]">
        {/* Card header displaying the title and description */}
        <CardHeader className="text-center">
          <CardTitle className="font-bold">Digital Clock</CardTitle>
          <CardDescription className="text-[15px] font-semibold text-slate-500 leading-2">
            Display current time in hours, minutes, and seconds.
          </CardDescription>
        </CardHeader>
        
        {/* Card content displaying the formatted time */}
        <CardContent>
          <div className="time flex items-center">
            <span className="m-auto text-6xl md:text-4xl font-bold">
              {/* Display the formatted hours, minutes, and seconds */}
              {formatHour(hours)}:
              {minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}
              {/* Show AM/PM only in 12-hour format */}
              {!is24Hour && (
                <span className="ml-2 text-2xl">{getPeriod(hours)}</span>
              )}
            </span>
          </div>
        </CardContent>
        
        {/* Card footer containing buttons to switch between 12-hour and 24-hour formats */}
        <CardFooter>
          <div className="btns flex flex-1 gap-2 items-center justify-center">
            {/* 12-Hour Format Button */}
            <Button
              className="border-2 rounded-2xl font-bold text-center"
              variant={!is24Hour ? "outline" : "default"} // Highlight the active format
              onClick={toggleTo12Hour} // Toggle to 12-hour format on click
            >
              12-Hour Format
            </Button>
            {/* 24-Hour Format Button */}
            <Button
              className="border-2 rounded-2xl font-bold text-center"
              variant={is24Hour ? "outline" : "default"} // Highlight the active format
              onClick={toggleTo24Hour} // Toggle to 24-hour format on click
            >
              24-Hour Format
            </Button>
          </div>
        </CardFooter>

        <hr className="w-[30%] m-auto"/>
        <p className="text-center font-bold">
          <span className="underline font-semibold text-[12px]">
            Created by
          </span> :<br />
          Sheikh Jibran Ahmed
        </p>
      </Card>
    </div>
  );
};

export default DigitalClock;
