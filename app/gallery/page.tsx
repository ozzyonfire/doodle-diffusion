'use client';
import { useTopDoodles } from "@/hooks/doodle"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Gallery() {
  const [date, setDate] = useState(new Date().toISOString());
  const {
    data: doodles,
  } = useTopDoodles(date);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-3">
      <h1 className="text-2xl font-bold">Today&apos;s top Doodles</h1>
      {/* display the doodles in a 3 x 4 grid */}
      <div className="grid grid-cols-3 gap-4">
        {doodles?.map(doodle => (
          <Link
            href={`/doodle/${doodle._id.toString()}`}
            key={doodle._id.toString()}
          >
            <div className="flex flex-col items-center justify-center gap-2 hover:shadow-lg">
              <Image src={doodle.output} alt={doodle.prompt} width={512} height={512} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}