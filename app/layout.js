import { Inter } from "next/font/google";
import '../styles/globals.css';
import { AuthProvider } from "@/services/context/authContext";
import NavBar from "@/components/navBar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "StoryScape",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-[100vh] flex flex-col justify-between bg-[#f3f3f3]">
            <div>
              <NavBar/>
              {children}
            </div>
            <Footer/>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
