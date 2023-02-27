import Link from "next/link";

export default function AppBar() {
  return (
    <nav className="bg-slate-800 shadow">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center h-12 gap-1">
          <h1 className="text-2xl font-bold text-white">
            Doodle Diffusion
          </h1>
          <div className="flex-grow" />
          {/* Add a button on the far right */}
          <Link href="/">
            <span className="bg-slate-900 text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
              Home
            </span>
          </Link>
          <Link href="/gallery">
            <span className="bg-slate-900 text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
              Gallery
            </span>
          </Link>
        </div>
      </div>
    </nav>
  )
}