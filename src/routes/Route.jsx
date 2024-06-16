import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Schools from "../pages/Schools/Schools";
import SchoolDetails from "../pages/Schools/SchoolDetails";
import CategoryMapViewer from "../pages/CategoryMapViewer";
import Kindergartens from "../pages/Kindergartens/Kindergartens";
import KindergartenDetails from "../pages/Kindergartens/KindergartenDetails";
import SocialChildProjects from "../pages/SocialChildProjects/SocialChildProjects";
import SocialChildProjectDetails from "../pages/SocialChildProjects/SocialChildProjectDetails";
import PageError from "../pages/PageError";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import PrivateRoute from "./PrivateRoute";
import DashbaordLayout from "../layouts/DashbaordLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import ManageAllRecipe from "../pages/dashboard/ManageAllRecipe";
import StatsDashboard from "../pages/dashboard/StatsDashboard";
import AddRecipe from "../pages/dashboard/AddRecipe";
import EditRecipe from "../pages/dashboard/EditRecipe";
import RecipeDetails from "../pages/dashboard/RecipeDetails";
import MyRecipe from "../pages/dashboard/MyRecipe";
import EditProfile from "../pages/dashboard/EditProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <PageError />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/schools", element: <Schools /> },
      { path: "/school/:id", element: <SchoolDetails /> },
      { path: "/kindergartens", element: <Kindergartens /> },
      { path: "/kindergarten/:id", element: <KindergartenDetails /> },
      { path: "/social-child-projects", element: <SocialChildProjects /> },
      {
        path: "/social-child-project/:id",
        element: <SocialChildProjectDetails />,
      },
      {
        path: "/map-viewer",
        element: <CategoryMapViewer />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Registration />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashbaordLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "profile",
        element: <DashboardHome />,
      },
      {
        path: "manage-recipes",
        element: <ManageAllRecipe />,
      },
      {
        path: "stats",
        element: <StatsDashboard />,
      },
      {
        path: "add-recipe",
        element: <AddRecipe />,
      },
      {
        path: "edit-recipe/:id",
        element: <EditRecipe />,
      },
      {
        path: "recipe-details/:id",
        element: <RecipeDetails />,
      },
      {
        path: "profile/edit/:id",
        element: <EditProfile />,
      },
      {
        path: "my-recipe/:email",
        element: <MyRecipe />,
      },
    ],
  },
]);
