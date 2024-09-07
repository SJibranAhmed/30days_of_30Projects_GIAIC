"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Button } from "./ui/button"; // Importing Button component
import { Input } from "@/components/ui/input"; // Importing Input component

// Main functional component for the guessing game
const GuessingGame = () => {
  // State variables
  const [gameStarted, setGameStarted] = useState<boolean>(false); // Tracks if the game has started
  const [gameOver, setGameOver] = useState<boolean>(false); // Tracks if the game is over
  const [pause, setPause] = useState<boolean>(false); // Tracks if the game is paused
  const [attempt, setAttempt] = useState<number>(0); // Tracks the number of attempts
  const [targetNumber, setTargetNumber] = useState<number>(1); // The target number the user is trying to guess
  const [userGuess, setUserGuess] = useState<number | string>(""); // User's input (their guess)
  const [errorMessage, setErrorMessage] = useState<string>(""); // State to hold the error message

  // useEffect to generate a random number when the game starts
  useEffect(() => {
    if (gameStarted) {
      let randomNum = Math.floor(Math.random() * 10) + 1; // Generate a random number between 1 and 10
      setTargetNumber(randomNum); // Set the target number
    }
  }, [gameStarted]); // Dependency array ensures this effect runs when the game starts

  // Function to handle starting the game
  const handleStartGame = () => {
    setGameStarted(true); // Set the game as started
    setGameOver(false); // Reset the game over state
    setAttempt(0); // Reset the attempt counter
    setPause(false); // Ensure the game is not paused when starting
    setErrorMessage(""); // Clear any previous error message
  };

  // Function to handle the guessing logic
  const handleGuess = (): void => {
    if (typeof userGuess === "number") {
      if (userGuess < 1 || userGuess > 10) {
        setErrorMessage("Please enter a number between 1 and 10!"); // Set error message if the guess is out of range
      } else if (userGuess === targetNumber) {
        setGameOver(true); // End the game if the guess is correct
        setErrorMessage(""); // Clear the error message on correct guess
      } else {
        setAttempt(attempt + 1); // Increment the attempt count if the guess is incorrect
        setErrorMessage(""); // Clear the error message on valid guess
      }
    }
  };

  // Function to handle the "Try Again" button, resetting the game
  const handleTryAgain = () => {
    setGameOver(false); // Reset the game over state
    setGameStarted(false); // Reset the game started state
    setUserGuess(''); // Clear the user guess input
    setAttempt(0); // Reset the attempt counter
    setErrorMessage(""); // Clear any error message
  };

  // Function to handle changes in the user's guess input
  const handleChangeUserGuess = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserGuess(parseInt(e.target.value)); // Convert the input to a number and set it as the user's guess
    setErrorMessage(""); // Clear error message on input change
  };

  return (
    <div className="container bg-black min-h-screen flex justify-center items-center text-center">
      <div className="cardBox w-[470px] bg-white p-7 rounded-xl">
        {/* Game title */}
        <h1 className="text-3xl font-bold tracking-tighter">
          Number Guessing Game
        </h1>
        {/* Game instructions */}
        <p className="my-4 tracking-tight">
          Try to guess the number between 1 and 10!
        </p>

        {/* Start Game Button (only shown if the game hasn't started) */}
        {!gameStarted && (
          <Button
            className="rounded-sm mb-7 font-semibold"
            onClick={handleStartGame}
          >
            Start Game
          </Button>
        )}

        {/* Game UI when it's started but not over */}
        {gameStarted && !gameOver && (
          <div>
            {/* Pause/Resume button */}
            <div className="flex justify-center mb-4">
              {pause ? (
                <Button
                  onClick={() => setPause(false)} // Resume the game
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Resume
                </Button>
              ) : (
                <Button
                  onClick={() => setPause(true)} // Pause the game
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Pause
                </Button>
              )}
            </div>

            {/* User input and guess button */}
            <div>
              <div className="inputfield flex items-center justify-between">
                <Input
                  className="w-[290px]"
                  placeholder="Enter your guess"
                  type="number"
                  value={userGuess}
                  onChange={handleChangeUserGuess}
                  disabled={pause} // Disable input when the game is paused
                />
                <Button onClick={handleGuess} disabled={pause}> {/* Disable button when paused */}
                  Let's Guess
                </Button>
              </div>

              {/* Display the error message if present */}
              {errorMessage && (
                <p className="text-red-500 mt-2">{errorMessage}</p>
              )}

              {/* Display the number of attempts */}
              <div className="attempt text-center font-bold pt-4 items-center">
                <p>Attempt : {attempt}</p>
              </div>
            </div>
          </div>
        )}

        {/* Game Over UI */}
        {gameOver && (
          <div>
            {/* Game over message */}
            <div className="text-center mb-4 text-black">
              <h2 className="text-2xl font-bold">Game Over!</h2>
              <p>You guessed the number in {attempt} attempts.</p>
            </div>

            {/* Try Again button */}
            <div className="flex justify-center">
              <Button
                onClick={handleTryAgain}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuessingGame;
