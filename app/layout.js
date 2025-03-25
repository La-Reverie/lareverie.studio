import './globals.css'

export const metadata = {
  title: 'La Reverie Studio',
  description: 'Digital experiences that are authentic, playful, and deeply resonant',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}