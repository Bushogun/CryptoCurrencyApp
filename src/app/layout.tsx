import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import styles from '@/app/page.module.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CryptoCurrencyApp',
  description: 'Next App CryptoCurrency',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <head>
      <meta name="author" content="Jonathan Stiven Soto Pantoja" />
    </head>
    <body className={inter.className}>
      <div className={styles.container}>
        {/* <Providers> */}
          {children}
        {/* </Providers> */}
      </div>
    </body>
  </html>
  )
}
