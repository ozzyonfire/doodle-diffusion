import Link from "next/link";

export default function Footer() {
  return (
<<<<<<< HEAD
    <footer className="w-full my-4">
      <div className="text-center lil-text mt-8 flex items-center gap-2 justify-center w-full">
=======
    <footer className="w-full my-4 px-2">
      <div className="text-center lil-text mt-8 flex items-center gap-2 justify-center">
>>>>>>> f7082c5dba46402ee9bc68046e7204e104848481
        <div className="inline-block py-3 px-4 bg-gray-800 rounded-lg">
          <Link
            href="https://github.com/ozzyonfire/doodle-diffusion"
            target="_blank">Built by ozzyonfire🔥</Link>
        </div>
        <div className="inline-block py-3 px-4 bg-gray-800 rounded-lg">
          <Link
            href="https://github.com/replicate/scribble-diffusion"
            target="_blank">Based on Scribble Diffusion</Link>
        </div>
      </div>

      <div className="text-center lil-text mt-4">
        Powered by{" "}
        <Link
          href="https://github.com/lllyasviel/ControlNet"
          target="_blank"
        >
          ControlNet
        </Link> by <Link href="https://lllyasviel.github.io/Style2PaintsResearch/lvmin" target="_blank">Lyumin Zhang</Link>
        ,{" "}
        <Link
          href="https://replicate.com/jagilley/controlnet-scribble?utm_source=project&utm_campaign=scribblediffusion"
          target="_blank"
        >
          Replicate
        </Link>
        ,{" and "}
        <Link href="https://vercel.com/templates/ai" target="_blank">
          Vercel
        </Link>
        .
      </div>
    </footer>
  );
}