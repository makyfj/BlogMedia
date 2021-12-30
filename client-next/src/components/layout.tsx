import React from "react";
import Header from "./header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="h-screen bg-zinc-50 dark:bg-zinc-900">
        <Header />
        <div className="h-auto bg-zinc-50 dark:bg-zinc-900 relative">
          {children}
          <footer className="text-center font-bold text-3lx">
            Copyright &copy; 2021 - BlogMedia
          </footer>
        </div>
      </div>
    </>
  );
};

export default Layout;
