import Footer from "../components/common/Footer.jsx";
import Navbar from "../components/common/Navbar.jsx";

export default function UserLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

