"use client";
import React from "react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

interface JokeRes {
  setup: string;
  punchline: string;
}
const RandomJoke = () => {
  const [joke, setJoke] = useState<string>("");

  useEffect(() => {
    fetchJoke();
  }, []);

  async function fetchJoke(): Promise<void> {
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      const data: JokeRes = await response.json();
      setJoke(`${data.setup} - ${data.punchline}`);
    } catch (error) {
      console.error("Error fetching joke:", error);
      setJoke("Failed to fetch joke. Please try again.");
    }
  }

  return (
    <div className="container flex text-center h-screen items-center justify-center bg-gradient-to-br from-orange-300 to-orange-600">
      <div className="jokeContainer py-4 px-8 bg-white w-[500px]  rounded-2xl">
        <h1 className="text-4xl text-left font-semibold mt-5">
          😂 Random Joke 👈
        </h1>
        <div className="textArea bg-slate-100 rounded-2xl px-7 my-7 w-[100%] m-auto p-3 py-4">
          <p className="text-xl text-neutral-500 text-left">
            {joke || "Loading..."}
          </p>
        </div>
        <div className="btn flex justify-start items-start">
          <Button
            className="bg-green-500 font-bold rounded-2xl hover:bg-green-600 duration-75 transition-all"
            onClick={fetchJoke}
          >
            😂 Get New Joke 😂
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RandomJoke;
