'use client';
import { PredictionResponse } from "@/hooks/predictions";

export default function Diffusion(props: {
  prediction: PredictionResponse
  onReset: () => void
}) {
  const { prediction, onReset } = props;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2">
      <img src={prediction.output[1]} alt={prediction.input.prompt} />
      <div className="flex gap-1">
        <button
          onClick={onReset}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          <span>Try Again</span>
        </button>
      </div>
    </div>
  )
}