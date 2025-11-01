import Header from "./Header";
import Footer from "./Footer";
import { LayoutProps } from "@/interface";
import { Toaster } from "react-hot-toast";
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Toaster position="top-right" />
      <Footer />
    </div>
  );
};

export default Layout;
