import Footer from "./Footer";
import "../../styles/Layout/styles.css";
import Header from "./Header";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout-container">
      <Header />
      <div className="children-container">{children}</div>
      <Footer />
    </div>
  );
};
