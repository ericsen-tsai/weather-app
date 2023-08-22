// eslint-disable-next-line camelcase
import { Roboto_Mono } from 'next/font/google'
import { ThemeRegistry, ResponsiveAppBar, NextAuthProvider } from '@/components'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

const roboto = Roboto_Mono({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <NextAuthProvider session={session}>
          <ThemeRegistry>
            <ResponsiveAppBar />
            {children}
          </ThemeRegistry>
        </NextAuthProvider>
      </body>
    </html>
  )
}
