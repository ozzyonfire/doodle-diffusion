'use client';
import { Doodle } from "@/model/doodle";
import { WithId } from "mongodb";
import { useState } from "react";

export default function Diffusion(props: {
  doodle: WithId<Doodle>
  onReset?: () => void
}) {
  const { doodle, onReset } = props;
  const [showInput, setShowInput] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 relative">
      {showInput && (
        <div className="absolute top-0 left-0 flex justify-center w-full">
          <img src={doodle.input} alt={doodle.prompt} />
        </div>
      )}
      <img src={doodle.output} alt={doodle.prompt} />
      <div className="flex gap-1">
        <button
          onClick={() => setShowInput(!showInput)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
        >
          <span>Show {showInput ? 'Result' : 'Input'}</span>
        </button>
        <button
          onClick={onReset}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          <span>Try Again</span>
        </button>
        {/* add a share button */}
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: doodle.prompt,
                text: doodle.prompt,
                url: `https://doodle-diffusion.vercel.app/${doodle._id}`
              })
            }
          }}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <span>Share</span>
        </button>
      </div>
    </div>
  )
}