'use client';
import { downvote, upvote, useScore } from "@/hooks/doodle";
import { useUserId } from "@/hooks/user";
import { Doodle } from "@/model/doodle";
import { WithId } from "mongodb";
import { useState } from "react";
import Image from "next/image";
const HOST = process.env.NEXT_PUBLIC_HOST;

export default function Diffusion(props: {
  doodle: WithId<Doodle>
}) {
  const { doodle } = props;
  const [showInput, setShowInput] = useState(false);
  const userId = useUserId();
  const {
    data: score,
    mutate: mutateScore
  } = useScore(doodle._id.toString());

  const handleUpvote = async () => {
    // upvote the doodle
    if (userId) {
      await upvote(doodle._id.toString(), userId);
      mutateScore();
    }
  }

  const handleDownvote = async () => {
    // downvote the doodle
    if (userId) {
      await downvote(doodle._id.toString(), userId);
      mutateScore();
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 relative">
      <div className="flex gap-2 items-center">
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
          onClick={handleDownvote}
        >
          👎
        </button>
        <div className="py-2 px-4 rounded bg-gray-800">
          <span className="text-gray-200 text-xl font-semibold">
            {score}
          </span>
        </div>
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
          onClick={handleUpvote}
        >
          👍
        </button>
      </div>
      <div className="relative">
        {
          showInput && (
            <div className="absolute top-0 left-0 flex justify-center w-full">
              <Image
                src={doodle.input}
                alt={doodle.prompt}
                width={512}
                height={512}
              />
            </div>
          )
        }
        <Image
          src={doodle.output}
          alt={doodle.prompt}
          width={512}
          height={512}
        />
      </div>
      <div className="flex gap-1">
        <button
          onClick={() => setShowInput(!showInput)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
        >
          <span>{showInput ? '🧙‍♂️' : '👀'}</span>
        </button>
        {/* add a share button */}
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: doodle.prompt,
                text: doodle.prompt,
                url: `${HOST}/doodle/${doodle._id}`
              })
            }
          }}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
        >
          <span>💌</span>
        </button>
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
          onClick={() => {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(`${HOST}/doodle/${doodle._id}`)
            }
          }}
        >
          <span>🔗</span>
        </button>
      </div>
    </div >
  )
}