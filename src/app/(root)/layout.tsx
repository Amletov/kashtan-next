import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "@/components/layout/my-navigation";
import Footer from "@/components/layout/my-footer";
import ReactQueryProvider from "../../../providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kashtan",
  description: "Kashtan Data Base",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navigation />
      {children}
      <Footer />
    </div>
  );
}
