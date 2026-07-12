import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { PageSeo } from "./seo/PageSeo";

export function Root() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div style={{ backgroundColor: "#F6F9FC", minHeight: "100vh" }}>
      <PageSeo />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}