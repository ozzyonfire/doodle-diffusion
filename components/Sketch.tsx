'use client';
import { uploadImage } from "@/hooks/images";
import { useEffect, useRef, useState } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import ColourPicker from "./ColourPicker";
import { SquareLoader } from "react-spinners";

export default function Sketch(props: {
  onSubmit: (url: string, additionalPrompt: string) => void;
  isProcessing: boolean;
}) {
  const {
    isProcessing,
    onSubmit
  } = props;
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [colour, setColour] = useState<string>("black");
  const [canvasColour, setCanvasColour] = useState("white");
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const [additionalPrompt, setAdditionalPrompt] = useState("");

  useEffect(() => {
    // check if there are paths in local storage
    const pathsString = localStorage.getItem("paths");
    if (pathsString) {
      const paths = JSON.parse(pathsString);
      canvasRef.current?.loadPaths(paths);
    }

    // check if there is a canvas colour in local storage
    const canvasColour = localStorage.getItem("canvasColour");
    if (canvasColour) {
      setCanvasColour(canvasColour);
    }
  }, []);

  const handleSubmitImage = async () => {
    if (canvasRef.current) {
      const data = await canvasRef.current.exportImage("png");
      const response = await uploadImage({
        image: data,
      });
      const url = response.Location;
      onSubmit(url, additionalPrompt);

      const paths = await canvasRef.current.exportPaths();
      localStorage.setItem("paths", JSON.stringify(paths, null, 2));

      // save the canvas colour to local storage
      localStorage.setItem("canvasColour", canvasColour);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2">
      <div className="w-full max-w-[512px] aspect-square shadow-lg relative">
        <ReactSketchCanvas
          ref={canvasRef}
          className="cursor-crosshair"
          strokeWidth={strokeWidth}
          strokeColor={colour.toString()}
          canvasColor={canvasColour}
        />
        <div className="hidden md:block left-full top-0 h-full absolute ml-4">
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
      <div className="max-w-[512px] flex flex-col gap-1 items-center">
        <div className="text-gray-400 text-sm flex items-center gap-2">
          <div className="">
            <label htmlFor="slider" className="inline mr-2 whitespace-nowrap">Stroke width</label>
          </div>
          <input
            id="slider"
            type="range"
            min="1"
            max="24"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
            className="flex-grow"
          />
          <div>
            <div
              style={{
                height: `${strokeWidth}px`,
                width: `${strokeWidth}px`,
                backgroundColor: colour.toString(),
              }}
              className="rounded-full"
            />
          </div>
        </div>
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
        <label htmlFor="prompt" className="mr-2 sr-only">Additional prompt</label>
        <input
          id="prompt"
          type="text"
          value={additionalPrompt}
          onChange={(e) => setAdditionalPrompt(e.target.value)}
          className="bg-gray-800 text-gray-200 rounded-md px-2 py-1 w-full"
          placeholder="cartoon, abstract, high-quality, etc..."
        />
        {/* show some helpful text */}
        <div className="text-gray-400 text-sm">
          <p>This text will be appended to the prompt, so you can customize the output.</p>
        </div>
      </div>
      <div className="flex gap-1 items-center">
        <button
          type="button"
          onClick={handleSubmitImage}
          className={`bg-gray-800 text-gray-200 rounded-md px-2 py-1 ${isProcessing ? "opacity-50" : ""}`}
          disabled={isProcessing}
        >
          Submit
        </button>
        {isProcessing && <SquareLoader size={20} color="white" />}
      </div>
      {isProcessing && <p className="text-gray-400 text-sm">This usually takes no more than 30 seconds...</p>}
    </div>
  );
}