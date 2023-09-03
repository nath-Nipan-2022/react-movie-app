import Header from "./header";
import { Outlet } from "react-router-dom";
import Footer from "./footer";

const Layout = () => {
  return (
    <div className="dark:bg-dark-color dark:text-light-color font-poppins">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
export default Layout;
