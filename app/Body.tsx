import AppBar from "./AppBar"
import Footer from "./Footer"

export default function Body(
  { children }: { children: React.ReactNode }
) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-700 text-gray-200 h-[calc(env(safe-area-inset-top) + env(safe-area-inset-bottom) + 100vh)]">
      <AppBar />
      <main className="flex-grow m-2">{children}</main>
      <Footer />
    </div>
  )
}