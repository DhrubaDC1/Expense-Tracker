import React from "react";
import Header from "./Header";
// import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="content">{children}</div>
      {/* <Footer className="footer" /> */}
    </>
  );
};

export default Layout;
