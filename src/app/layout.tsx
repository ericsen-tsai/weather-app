import { Inter } from 'next/font/google'
import { ThemeRegistry } from '@/components'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white `}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  )
}
