import './globals.css'
import Body from './Body';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Body>
          {children}
        </Body>
      </body>
    </html>
  )
}
