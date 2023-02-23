
export default function AppBar() {
  return (
    <nav className="bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-center h-16">
          {/* Center the Logo and Title of the app */}
          <h1 className="text-2xl font-bold text-white">
            Doodle App
          </h1>
        </div>
      </div>
    </nav>
  )
}