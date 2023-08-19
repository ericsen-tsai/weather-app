// eslint-disable-next-line camelcase
import { Roboto_Mono } from 'next/font/google'
import { ThemeRegistry } from '@/components'
import ResponsiveAppBar from '@/components/ResponsiveAppBar'

const roboto = Roboto_Mono({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <ThemeRegistry>
          <ResponsiveAppBar />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  )
}
