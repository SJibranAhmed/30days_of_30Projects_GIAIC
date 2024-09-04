"use client";
import React from "react";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Cake } from "lucide-react";
import { BsBalloonHeart as Balloon, BsHeart } from "react-icons/bs";
import { Button } from "./ui/button";
import { GoGift } from "react-icons/go";

type ConfettiProps = {
  width: number;
  height: number;
};

// Dynamically import the confetti component for client-side rendering
const DynamicConfetti = dynamic(() => import("react-confetti"), { ssr: false });

const Birthday_Wish = () => {
  // Define color arrays for candles, balloons, and confetti
  const candleColors: string[] = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFA07A",
    "#98D8C8",
  ];
  const balloonColors: string[] = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFA07A",
    "#98D8C8",
  ];
  const confettiColors: string[] = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFA07A",
    "#98D8C8",
    "#F7DC6F",
    "#BB8FCE",
  ];

  // State hooks for tracking candle and balloon interactions
  const [candlesList, setCandlesList] = useState<number>(0);
  const [balloonPoppedCount, setBalloonPoppedCount] = useState<number>(0);
  const [windowSize, setWindowSize] = useState<ConfettiProps>({
    width: 0,
    height: 0,
  });
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [celebrating, setCelebrating] = useState<boolean>(false);
  const [litCandles, setLitCandles] = useState<number[]>([]); // Track which candles are lit
  const [poppedMessage, setPoppedMessage] = useState<string | null>(null); // Track popped message

  // Constants for total number of balloons and candles
  const totalBalloons: number = 5;
  const totalCandles: number = 5;

  // Effect hook to handle window resize for confetti dimensions
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to light a candle and update state
  const lightCandle = (index: number) => {
    if (!litCandles.includes(index)) {
      setLitCandles((prev) => [...prev, index]);
      setCandlesList((prev) => prev + 1);
    }
  };

  // Function to pop a balloon and update state
  const poppedBalloon = (index: number) => {
    if (index === balloonPoppedCount) {
      setBalloonPoppedCount((prev) => prev + 1);
    }
  };

  // Function to handle the celebration button click
  const celebrate = () => {
    // Check if all candles are lit and all balloons are popped
    if (litCandles.length === totalCandles && balloonPoppedCount === totalBalloons) {
      setCelebrating(true);
      setShowConfetti(true);
      setPoppedMessage(null); // Clear any previous message
    } else {
      setPoppedMessage("Not all candles are lit or balloons are popped!");
      setShowConfetti(false); // Ensure no confetti is shown
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-screen">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader>
            <p>Dedicated from your <span className="font-bold">`${"uncle"}`</span></p>
            <motion.div>
              <CardTitle className="text-2xl sm:text-4xl">
                Happy 3th Birthday!
              </CardTitle>
              <CardDescription className="pt-2">
                <div className="birthdayIndividual flex items-center justify-center text-center">
                  Umm-e-Sulaim <BsHeart className="text-red-700" />
                </div>
                <span className="text-lg font-normal">September 4th</span>
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="text-center text-lg">
            <h3 className="font-semibold mb-2">Light the candles:</h3>
            <div className="candles flex justify-around items-center text-center px-8">
              {[...Array(totalCandles)].map((_, index) => (
                <AnimatePresence key={index}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.5,
                    }}
                  >
                    <Cake
                      className={`w-8 h-8 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110`}
                      style={{
                        color: litCandles.includes(index)
                          ? candleColors[index % candleColors.length]
                          : "#D1D5DB",
                      }}
                      onClick={() => lightCandle(index)}
                    />
                  </motion.div>
                </AnimatePresence>
              ))}
            </div>
            <h3 className="font-semibold mb-2 mt-8">Pop the balloons:</h3>
            <div className="flex justify-center space-x-2">
              {[...Array(totalBalloons)].map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 1 }}
                  animate={{ scale: index < balloonPoppedCount ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Balloon
                    className={`w-8 h-8 cursor-pointer hover:scale-110`}
                    style={{
                      color: index < balloonPoppedCount
                        ? "#D1D5DB"
                        : balloonColors[index % balloonColors.length],
                    }}
                    onClick={() => poppedBalloon(index)}
                  />
                </motion.div>
              ))}
            </div>
            {poppedMessage && (
              <p className="mt-4 text-red-500 font-semibold">{poppedMessage}</p>
            )}
          </CardContent>
          <CardFooter>
            <Button
              className="flex bg-black ml-[110px] text-center text-white hover:bg-gray-800 transition-all duration-300"
              onClick={celebrate}
              disabled={celebrating}
            >
              Celebrate! <GoGift className="ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
      {showConfetti && (
        <DynamicConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={true}
          numberOfPieces={1000}
          colors={confettiColors}
        />
      )}
    </div>
  );
};

export default Birthday_Wish;
