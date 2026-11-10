import { createBrowserRouter } from "react-router";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import SkillsPage from "./pages/SkillsPage";
import ContactPage from "./pages/ContactPage";
import SkillsContextPage from "./pages/SkillsContextPage";
import FormValidationPage from "./pages/FormValidationPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "skills",
        element: <SkillsPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "skills-context",
        element: <SkillsContextPage />,
      },
      {
        path: "form-validation",
        element: <FormValidationPage />,
      },
    ],
  },
]);
