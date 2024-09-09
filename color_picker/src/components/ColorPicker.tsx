"use client";
import { useState, ChangeEvent, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const ColorPicker = () => {
  const [color, setColor] = useState<string>("#000000");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const colorRef = useRef<HTMLDivElement>(null); // Ref to select the color text

  // Handle color change event when user selects a new color
  const handleColorChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setColor(e.target.value);
    setIsCopied(false); // Reset copied state when color changes
  };

  // Function to copy the color to clipboard
  const copyToClipboard = (): void => {
    // Check if navigator.clipboard is supported (modern browsers)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(color)
        .then(() => {
          setIsCopied(true); // Set copied state to true
        })
        .catch((err) => {
          console.error("Failed to copy color to clipboard:", err);
        });
    } else {
      // Fallback for browsers that don't support navigator.clipboard
      if (colorRef.current) {
        const range = document.createRange();
        range.selectNodeContents(colorRef.current);
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
          try {
            document.execCommand("copy"); // Fallback copy method
            setIsCopied(true); // Set copied state to true
          } catch (err) {
            console.error("Failed to copy color with fallback:", err);
          }
          selection.removeAllRanges(); // Clean up selection after copying
        }
      }
    }
  };

  return (
    <Card className="w-[450px] py-5 px-4 text-center rounded-xl shadow-xl bg-white">
      <CardHeader>
        <CardTitle className="text-lg -mb-2">Color Picker</CardTitle>
        <CardDescription className="text-slate-500 text-[16px]">
          Select a color and copy the Hex and RGB values
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Color preview box */}
        <div
          className="w-full h-[180px] rounded-2xl border-4"
          style={{ backgroundColor: color }}
        ></div>
        
        {/* Display selected Hex color */}
        <div ref={colorRef} className="text-2xl mt-4 font-semibold">
          {color}
        </div>
        
        {/* Display RGB values */}
        <div className="text-[18px] mt-2 text-neutral-500">
          RGB: {parseInt(color.slice(1, 3), 16)},{" "}
          {parseInt(color.slice(3, 5), 16)}, {parseInt(color.slice(5, 7), 16)}
        </div>
        
        {/* Copy to clipboard button */}
        <Button
          variant={"outline"}
          onClick={copyToClipboard}
          className="mb-4 mt-1 w-full rounded-xl bg-black text-white hover:bg-slate-800 hover:text-white"
        >
          {isCopied ? "Copied Successfully!" : "Copy to Clipboard"}
        </Button>
        
        {/* Color input picker */}
        <Input
          type="color"
          value={color}
          onChange={handleColorChange}
          className="h-16"
        />
      </CardContent>
    </Card>
  );
};

export default ColorPicker;
