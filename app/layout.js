import './global.css'
import './index.css';
import './App.css';

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

// In your existing layout imports
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet" />