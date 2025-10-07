import "@repo/ui/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Indie_Flower } from "next/font/google";

const indieFlower = Indie_Flower({
   subsets: ["latin"],
   weight: "400",
});

export const metadata: Metadata = {
   title: "SketchSpace",
   description: "Your infinite canvas for ideas, collaboration, and creativity.",
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <body className={indieFlower.className}>{children}</body>
      </html>
   );
}
