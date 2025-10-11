
import { Inter } from "next/font/google";
import "../styles/globals.module.scss";
import "../styles/globals.css";
import { ReactNode } from "react";

import Navbar from "../components/Navbar"
import Footer from "../components/footer";
import ScrollIndicator from '@/components/ScrollIndicator';

const inter = Inter({
  subsets: ["latin"],
  preload: true,
  display: "swap"
});

export const metadata = {
  title: 'STEM Muslims',
  description: 'STEM Muslims at Imperial College London, a community for Muslims at Imperial to achieve Ihsaan in their studies, careers and lives',
}

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={inter.className} style={{margin: 0}}>
        <Navbar />
        {children}
        <Footer />
        <ScrollIndicator />
      </body>
    </html>
  );
}
