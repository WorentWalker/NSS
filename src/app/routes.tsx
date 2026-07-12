import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { Solutions } from "./pages/Solutions";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Admin } from "./pages/Admin";

export const router = createBrowserRouter([
  {
    path: "/admin",
    Component: Admin,
  },
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "products", Component: Products },
      { path: "solutions", Component: Solutions },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
    ],
  },
]);
