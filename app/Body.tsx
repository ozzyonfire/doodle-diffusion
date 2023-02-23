import AppBar from "./AppBar"

export default function Body(
  { children }: { children: React.ReactNode }
) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-700 text-gray-200">
      <AppBar />
      <main className="flex-grow m-2">{children}</main>
    </div>
  )
}