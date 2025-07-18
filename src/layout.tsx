import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./components/Navigation_com/sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;

  // Routes where Sidebar should be shown
  const sidebarRoutes = ["/", "/products", "/addProduct", "/Income", "/addIncome", "/customer" , "/addCustomer"];
  const noSidebarRoutes = ["/"];

  const showSidebar = sidebarRoutes.includes(path) && !noSidebarRoutes.includes(path);

  return (
    <div className="w-full flex">
      {showSidebar && <Sidebar />}
      {children}
    </div>
  );
};

export default Layout;
