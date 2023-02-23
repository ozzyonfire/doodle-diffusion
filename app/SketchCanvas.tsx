'use client';

import ColourPicker from "@/components/ColourPicker";
import { useRef, useState } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";

export default function SketchCanvas(props: {
  prompt: string;
}) {
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [colour, setColour] = useState<string>("black");
  const [canvasColour, setCanvasColour] = useState("white");
  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  const handleExportImage = async () => {
    if (canvasRef.current) {
      const data = await canvasRef.current.exportImage("png");
      console.log(data);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-full max-w-[512px] aspect-square shadow-lg relative">
        <ReactSketchCanvas
          ref={canvasRef}
          className="cursor-crosshair"
          strokeWidth={strokeWidth}
          strokeColor={colour.toString()}
          canvasColor={canvasColour}
        />
        <div className="left-full top-0 h-full absolute ml-4">
          <div className="flex flex-col items-start h-full w-44 gap-1">
            {/* show a preview of the size of the stroke */}
            <div
              style={{
                height: `${strokeWidth}px`,
                width: `${strokeWidth}px`,
                backgroundColor: colour.toString(),
              }}
              className="rounded-full"
            />
            <div className="flex flex-col gap-0 w-full">
              <label htmlFor="slider" className="mr-2">Stroke Width</label>
              <input
                id="slider"
                type="range"
                min="1"
                max="24"
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            {/* show a colour picker */}
            <ColourPicker
              label="Stroke Colour"
              colour={colour.toString()}
              onChange={(colour) => setColour(colour)}
            />
            <ColourPicker
              label="Canvas Colour"
              colour={canvasColour.toString()}
              onChange={(colour) => setCanvasColour(colour)}
            />
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => canvasRef.current?.undo()}
                className="bg-gray-800 text-gray-200 rounded-md px-2 py-1"
              >
                Undo
              </button>
              <button
                type="button"
                onClick={() => canvasRef.current?.redo()}
                className="bg-gray-800 text-gray-200 rounded-md px-2 py-1"
              >
                Redo
              </button>
              <button
                type="button"
                onClick={() => canvasRef.current?.clearCanvas()}
                className="bg-gray-800 text-gray-200 rounded-md px-2 py-1"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}