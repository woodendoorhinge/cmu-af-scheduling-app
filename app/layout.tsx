import type { Metadata } from "next";
import { Inter, Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import NavBar from "./nav-bar";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
});
const monteserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-monteserrat",
});

const fontVars = [roboto.variable, monteserrat.variable].join(" ");

export const metadata: Metadata = {
  title: "Manifest Schedule",
  description:
    "A schedule of events for Manifest 2024, Summer Camp, and LessOnline.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVars}>
      <body className="font-monteserrat">
        <NavBar />
        <main className="lg:px-24 sm:px-10 py-24 p-6">{children}</main>
      </body>
    </html>
  );
}
