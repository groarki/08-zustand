import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import {Roboto} from "next/font/google"

const robotoFont = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--roboto-font'
});

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Easy managing of your notes",
  openGraph: {
    title: "NoteHub",
    description: "Easy managing of your notes", 
    url: "https://localhost:3000",
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoFont.variable}`}>
        <TanStackProvider>
          <Header />
          <main>{children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
