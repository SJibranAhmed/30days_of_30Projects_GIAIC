"use client";
import React, { useState} from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const Calculator = () => {
  // State to store the values of the two numbers
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  // State to store the result of the calculation
  const [result, setResult] = useState("");

  // Handler to update the state of num1 when input changes
  const handleNum1 = (e) => {
    setNum1(e.target.value);
  };

  // Handler to update the state of num2 when input changes
  const handleNum2 = (e) => {
    setNum2(e.target.value);
  };

  // Function to perform the calculation based on the selected operation
  const handleOperation = (operation) => {
    // Convert input values to numbers
    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    // Ensure both numbers are provided before performing operations
    if (isNaN(number1) || isNaN(number2)) {
      setResult("Please enter valid numbers");
      return;
    }

    let res;

    // Perform the operation based on the selected operator
    switch (operation) {
      case "+":
        res = number1 + number2;
        break;
      case "-":
        res = number1 - number2;
        break;
      case "*":
        res = number1 * number2;
        break;
      case "/":
        // Handle division by zero
        res = number2 !== 0 ? number1 / number2 : NaN;
        break;
      default:
        return;
    }

    // Set the result, converting it to a string for display
    setResult(isNaN(res) ? "Cannot divide by zero" : res.toString());
  };

  // Function to clear the input fields and result
  const handleClear = () => {
    setNum1("");
    setNum2("");
    setResult("");
  };

  return (
    <main className="container h-screen flex justify-center items-center bg-slate-300">
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="font-bold">Simple Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="getNum flex gap-5 font-bold">
            {/* Input field for the first number */}
            <div className="num1 leading-8">
              Number 1
              <Input
                type="number"
                placeholder="Enter a number"
                className="font-normal"
                value={num1}
                onChange={handleNum1}
              />
            </div>
            {/* Input field for the second number */}
            <div className="num2 leading-8">
              Number 2
              <Input
                type="number"
                placeholder="Enter a number"
                className="font-normal"
                value={num2}
                onChange={handleNum2}
              />
            </div>
          </div>
          <div className="operationBtns flex gap-4 text-center items-center justify-center">
            {/* Buttons for different operations */}
            <Button onClick={() => handleOperation("+")}>+</Button>
            <Button onClick={() => handleOperation("-")}>-</Button>
            <Button onClick={() => handleOperation("*")}>*</Button>
            <Button onClick={() => handleOperation("/")}>/</Button>
          </div>
        </CardContent>
        <CardFooter>
          <div className="result w-full">
            <h1 className="mb-2 font-bold text-xl">Result</h1>
            {/* Input field to display the result */}
            <Input
              value={result}
              placeholder="Result"
              className="w-[100%] placeholder:text-slate-800"
              disabled
            />
            {/* Button to clear all inputs and result */}
            <Button className="text-lg w-full" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
};

export default Calculator;
