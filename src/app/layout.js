import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "KeenKeeper",
  description: "Keep your friendships alive",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-900">
        <Navbar />
        {children}
      </body>
    </html>
  );
}