import type { Metadata } from "next";
import { Inter, Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import NavBar from "./nav-bar";
import { Context } from "./context";
import clsx from "clsx";

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
  title: "Festival Season Schedule",
  description:
    "A schedule of events for LessOnline, Summer Camp, and Manifest.",
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
        <Context>
          {process.env.MULTIPLE_EVENTS === "true" && <NavBar />}
          <main
            className={clsx(
              "lg:px-24 sm:px-10 p-6",
              process.env.MULTIPLE_EVENTS === "true" ? "py-24" : "pt-12 pb-24"
            )}
          >
            {children}
          </main>
        </Context>
      </body>
    </html>
  );
}
