import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';

export const metadata: Metadata = {
  title: "MarketShare",
  description: "A simple app by Monopolistic Investor",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <UserProvider>
    <html lang="en">
    {/* <UserProvider> */}
      <body>
        {children}
        </body>
      {/* </UserProvider> */}
    </html>
    </UserProvider>
  );
}