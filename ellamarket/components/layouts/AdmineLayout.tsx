import Header from "../common/Header";
import Footer from "../common/Footer";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
