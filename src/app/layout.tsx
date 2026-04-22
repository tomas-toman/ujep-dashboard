import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "UJEP Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <main className="flex-1">
              {children}
            </main>
            <Footer />  
          </div>
        </div>
      </body>
    </html>
  );
}