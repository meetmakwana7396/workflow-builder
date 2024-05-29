import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import { IBM_Plex_Mono } from "next/font/google";
import "./styles/globals.css";

const ibmMono = IBM_Plex_Mono({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en" className={ibmMono.className}>
        <body className="min-h-screen bg-black">
          <main className="block">{children}</main>
        </body>
      </html>
    </StoreProvider>
  );
}
