import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import styles from '@/app/page.module.scss'
import { Navbar } from '@/app/components/navbar/Navbar'
import { Providers } from '@/redux/providers'
import { setupStore } from "@/redux/store";
// import { Provider } from "react-redux";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CryptoCurrencyApp',
  description: 'Next App CryptoCurrency',
}
const store = setupStore();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bodyStyle = {
    margin: 0,
  };

  return (
    <html lang="en">
      <head>
        <meta name="author" content="Jonathan Stiven Soto Pantoja" />
      </head>
      <body className={inter.className} style={bodyStyle}>
        <Navbar />
        <div className={styles.container}>
          <Providers>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  )
}
