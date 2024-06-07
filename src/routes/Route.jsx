import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Schools from "../pages/Schools/Schools";
import SchoolDetails from "../pages/Schools/SchoolDetails";
import CategoryMapViewer from "../components/CategoryMapViewer";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/schools",
        element: <Schools />,
      },
      {
        path: "/school/:id",
        element: <SchoolDetails />,
      },
      {
        path: "/map-viewer",
        element: <CategoryMapViewer />,
      },
    ],
  },
  {
    path: "/school/:id",
    element: <SchoolDetails />,
  },
]);
