import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/src/theme/theme-provider";
import clsx from "clsx";
import { Header } from "@/src/feature/layout/header";
import { Footer } from "@/src/feature/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Githread",
  description: "The social network for developers",
};

type LayoutProps = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function RootLayout({ children, modal }: Readonly<LayoutProps>) {
  return (
    <html lang="en" className="h-full">
      <body className={clsx(inter.className, "bg-background h-full")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col h-full">
            <Header />
            <div className="flex-1 max-w-lg m-auto py-20 w-full">
              {children}
            </div>
            <Footer />
          </div>
          {modal}
        </ThemeProvider>
      </body>
    </html>
  );
}
