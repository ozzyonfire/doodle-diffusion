'use client';
import { Doodle } from "@/model/doodle";
import { WithId } from "mongodb";
import { useState } from "react";
const HOST = process.env.NEXT_PUBLIC_HOST;

export default function Diffusion(props: {
  doodle: WithId<Doodle>
}) {
  const { doodle } = props;
  const [showInput, setShowInput] = useState(false);

  const handleUpvote = async () => {
    // upvote the doodle
  }

  const handleDownvote = async () => {
    // downvote the doodle
  }

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
        {/* add a share button */}
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: doodle.prompt,
                text: doodle.prompt,
                url: `${HOST}/${doodle._id}`
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
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
          onClick={() => {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(`${HOST}/${doodle._id}`)
            }
          }}
        >
          <span>Copy Link</span>
        </button>
      </div>
    </div>
  )
}