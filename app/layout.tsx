import { Providers } from './GlobalRedux/provider';
import ToastCSS from './component/ToastCSS';
import './globals.css';
import {Mitr} from "@next/font/google"
import Favicon from "@/app/favicon.ico"

export const metadata = {
  title: 'SouthEast Pharmacy',
  description: 'South East Pharmacy',
  // icons: [{ rel: 'icon', url: Favicon }],

};

const mitr = Mitr({ 
  subsets: ['thai'],
  weight: ['200', '300', '400'],
  variable: '--font-mitr'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

 

  return (
    <html lang="en">
      <body className={`${mitr.className} `}>
        <ToastCSS /> 
          <Providers>
            {children}
          </Providers>
        </body>
    </html>
  )
}
