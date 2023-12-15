import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import GlobalState from "@/providers/page";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer";

const inter = Poppins({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: {
    default: "Qwik Medic | Home ",
    template: `Qwik Medic | %s`,
  },
  description: "Created By Qwik IT Web Team",
};

const RootLayout = ({ children }) => {
  return (
    <html data-theme="light">
      <body className={inter.className}>
        <GlobalState>
          <Navbar />
          <main> {children} </main>
          <Footer />
        </GlobalState>
      </body>
    </html>
  );
};
export default RootLayout;
